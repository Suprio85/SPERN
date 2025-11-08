"use client"

import {
  AIDecisionCard,
  BlockchainNetworkSelector,
  FeedbackLoopIndicator,
  FraudAlertModal,
  NetworkStatusWidget,
  RouteGraphVisualization,
  type BlockchainNetwork
} from '@/components/payment'
import type {
  Currency,
  FeePrediction,
  FraudAlert,
  PaymentData,
  Route
} from '@/lib/payment/types'
import {
  calculateSplit,
  convertCurrency,
  generateQRCode,
  getBestCashbackRoute,
  PAYMENT_ROUTES,
  predictOptimalFee,
  runFraudDetection
} from '@/lib/payment/utils'
import Script from "next/script"
import { use, useEffect, useState } from "react"

// TypeScript declaration for lottie-player web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        id?: string
        src?: string
        background?: string
        speed?: string | number
        loop?: boolean
        autoplay?: boolean
        style?: React.CSSProperties
      }
    }
  }
}

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: paymentId } = use(params)
  
  const [showPayment, setShowPayment] = useState(true)
  const [routes, setRoutes] = useState<Route[]>([])
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [aiStatus, setAiStatus] = useState("AI scanning 50+ routes...")
  const [payBtnEnabled, setPayBtnEnabled] = useState(false)
  const [scriptsLoaded, setScriptsLoaded] = useState(false)
  const [paymentData, setPaymentData] = useState<PaymentData>({
    merchant: "Raju's Chai Stall",
    amount: 100,
    timestamp: new Date().toISOString()
  })

  // New AI Features State
  const [showQRCode, setShowQRCode] = useState(false)
  const [fraudAlert, setFraudAlert] = useState<FraudAlert | null>(null)
  const [feePrediction, setFeePrediction] = useState<FeePrediction | null>(null)
  const [showSplitBill, setShowSplitBill] = useState(false)
  const [splitCount, setSplitCount] = useState(2)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('INR')
  const [recurringEnabled, setRecurringEnabled] = useState(false)
  const [blockchainNetwork, setBlockchainNetwork] = useState<BlockchainNetwork>('hyperledger')
  const [showFraudModal, setShowFraudModal] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [learningComplete, setLearningComplete] = useState(false)

  // Load payment data from sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(paymentId)
      if (stored) {
        try {
          const data = JSON.parse(stored)
          setPaymentData(data)
        } catch (e) {
          console.error('Error parsing payment data:', e)
        }
      }
    }
  }, [paymentId])

  useEffect(() => {
    if (scriptsLoaded) {
      setTimeout(() => {
        runAI()
        const alert = runFraudDetection(paymentData.amount)
        setFraudAlert(alert)
        // Show modal if high risk detected
        if (alert && alert.risk === 'high') {
          setShowFraudModal(true)
        }
        setFeePrediction(predictOptimalFee(paymentData.amount))
      }, 800)
    }
  }, [scriptsLoaded, paymentData.amount])

  const runAI = () => {
    setAiStatus("AI scanning 50+ routes...")
    setRoutes([])
    setPayBtnEnabled(false)

    PAYMENT_ROUTES.forEach((route, i) => {
      setTimeout(() => {
        setRoutes(prev => [...prev, route])

        if (route.name === "UPI Direct") {
          setTimeout(() => {
            setSelectedRoute(route.name)
            setAiStatus("Best Route: UPI Direct (0.0% + 2% Cashback)")
            setPayBtnEnabled(true)
          }, 300)
        }
      }, i * 200)
    })
  }

  const handlePayment = () => {
    setShowPayment(false)
    setPaymentComplete(true)
    // Simulate AI learning process
    setTimeout(() => {
      setLearningComplete(true)
    }, 3000)
  }

  if (!showPayment) {
    return (
      <>
        <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-green-800">Payment Successful!</h2>
              <p className="text-green-600 mt-2">₹{paymentData.amount} sent instantly</p>
              <p className="text-gray-600 text-sm mt-1">Payment ID: {paymentId}</p>
              {selectedRoute && (
                <div className="mt-3 inline-block bg-green-100 px-4 py-2 rounded-full">
                  <span className="text-green-700 font-semibold">
                    💰 Cashback Earned: ₹{((PAYMENT_ROUTES.find(r => r.name === selectedRoute)?.cashback || 0) / 100 * paymentData.amount).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Feedback Loop Indicator */}
            <div className="max-w-2xl mx-auto mb-6">
              <FeedbackLoopIndicator 
                isActive={!learningComplete} 
                modelUpdated={learningComplete}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Merchant Dashboard */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Merchant Dashboard</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Merchant:</span> <strong>{paymentData.merchant}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span> <strong>₹{paymentData.amount}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Fees Paid:</span> <strong className="text-green-600">₹0 (0.0%)</strong>
                  </div>
                  <div className="flex justify-between text-green-700">
                    <span>Saved vs 3%:</span> <strong>₹{(paymentData.amount * 0.03).toFixed(2)}</strong>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-emerald-50 rounded-lg text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span><strong>₹{paymentData.amount} → UPI Direct → 0.0% → INSTANT</strong></span>
                  </div>
                </div>
              </div>

              {/* Blockchain Proof */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Blockchain Proof</h3>
                <div className="flex justify-center">
                  {/* @ts-expect-error - lottie-player is a web component */}
                  <lottie-player
                    src="https://assets10.lottiefiles.com/packages/lf20_jcsfwbvi.json"
                    background="transparent"
                    speed="0.8"
                    style={{ width: '80px', height: '80px' }}
                    loop
                    autoplay
                  >
                    {/* @ts-expect-error - lottie-player closing tag */}
                  </lottie-player>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Txn Hash: <code className="bg-gray-100 px-2 py-1 rounded">0x{paymentId.slice(-12)}</code>
                </p>
                <button className="mt-4 w-full text-purple-600 border border-purple-600 py-2 rounded-lg hover:bg-purple-50 transition">
                  View on Explorer
                </button>
              </div>

              {/* AI Spending Insights */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">💡 AI Insights</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-500">📊</span>
                    <div>
                      <p className="font-semibold">Smart Spending</p>
                      <p className="text-gray-600">You saved ₹{(paymentData.amount * 0.029).toFixed(2)} vs cards</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500">🎯</span>
                    <div>
                      <p className="font-semibold">Best Choice</p>
                      <p className="text-gray-600">UPI Direct was optimal for this amount</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-500">⏰</span>
                    <div>
                      <p className="font-semibold">Timing Perfect</p>
                      <p className="text-gray-600">Peak hours = lower network fees</p>
                    </div>
                  </div>
                  {recurringEnabled && (
                    <div className="mt-4 p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700">
                        🔄 <strong>Auto-pay scheduled</strong> for next month
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const bestCashbackRoute = getBestCashbackRoute(PAYMENT_ROUTES)

  return (
    <>
      <Script 
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
        onLoad={() => setScriptsLoaded(true)}
      />
      <style jsx global>{`
        .ai-brain { width: 120px; height: 120px; }
        .route { transition: all 0.3s; }
        .selected { background: #d1fae5 !important; border-left: 4px solid #10b981 !important; }
      `}</style>

      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        {/* Fraud Alert Modal */}
        {showFraudModal && fraudAlert && (
          <FraudAlertModal 
            fraudAlert={fraudAlert}
            onClose={() => setShowFraudModal(false)}
            onCancel={() => setShowFraudModal(false)}
            onReroute={() => {
              setShowFraudModal(false)
              // Could trigger route recalculation here
            }}
          />
        )}

        <div className="max-w-5xl w-full grid md:grid-cols-3 gap-6">
          
          {/* Main Payment Card */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Pay {paymentData.merchant}</h1>
              <button
                onClick={() => setShowQRCode(!showQRCode)}
                className="text-purple-600 hover:text-purple-700 text-sm font-semibold"
              >
                {showQRCode ? '✕ Close QR' : '📱 Show QR'}
              </button>
            </div>

            {showQRCode ? (
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold mb-4">Scan to Pay</h3>
                <img 
                  src={generateQRCode(paymentData.merchant, paymentData.amount)} 
                  alt="Payment QR Code" 
                  className="mx-auto border-4 border-purple-100 rounded-xl"
                />
                <p className="text-sm text-gray-600 mt-4">
                  Scan with any UPI app to pay ₹{paymentData.amount}
                </p>
              </div>
            ) : (
              <>
                {/* Currency Selector */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl font-bold">
                    {selectedCurrency === 'INR' ? '₹' : selectedCurrency} 
                    {selectedCurrency === 'INR' 
                      ? paymentData.amount 
                      : convertCurrency(paymentData.amount, selectedCurrency)}
                  </div>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
                    className="px-3 py-1 border rounded-lg text-sm"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="BDT">BDT (৳)</option>
                  </select>
                </div>

                {/* Split Bill Option */}
                <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={showSplitBill}
                        onChange={(e) => setShowSplitBill(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label className="text-sm font-semibold">Split Bill</label>
                    </div>
                    {showSplitBill && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="2"
                          max="10"
                          value={splitCount}
                          onChange={(e) => setSplitCount(Number(e.target.value))}
                          className="w-16 px-2 py-1 border rounded text-sm"
                        />
                        <span className="text-sm">people</span>
                      </div>
                    )}
                  </div>
                  {showSplitBill && (
                    <p className="text-xs text-gray-600 mt-2">
                      Each person pays: ₹{calculateSplit(paymentData.amount, splitCount)}
                    </p>
                  )}
                </div>

                {/* Recurring Payment */}
                <div className="mb-6 p-3 bg-purple-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={recurringEnabled}
                      onChange={(e) => setRecurringEnabled(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-sm font-semibold">🔄 Setup Auto-pay (Monthly)</label>
                  </div>
                </div>

                <div className="text-center mb-6">
            <div className="flex justify-center">
              {/* @ts-expect-error - lottie-player is a web component */}
              <lottie-player
                id="ai-brain"
                className="ai-brain"
                src="https://assets5.lottiefiles.com/packages/lf20_kkflmtur.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              >
                {/* @ts-expect-error - lottie-player closing tag */}
              </lottie-player>
            </div>
            <p className="mt-2 text-gray-600">
              {aiStatus.includes("Best Route") ? (
                <span dangerouslySetInnerHTML={{ __html: aiStatus }} />
              ) : (
                aiStatus
              )}
            </p>
          </div>

          {/* Route Graph Visualization */}
          {routes.length > 0 && selectedRoute && (
            <div className="mb-6">
              <RouteGraphVisualization 
                routes={routes}
                selectedRoute={selectedRoute}
              />
            </div>
          )}

          <div className="space-y-2 mb-6">
            {routes.map((route) => (
              <div
                key={route.name}
                className={`route p-3 border rounded-lg flex justify-between text-sm ${
                  selectedRoute === route.name ? 'selected' : ''
                }`}
              >
                <div>
                  <span className="font-medium">{route.name}</span>
                  {route.cashback && route.cashback > 0 && (
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                      {route.cashback}% cashback
                    </span>
                  )}
                </div>
                <span className={route.fee === 0 ? 'text-green-600 font-bold' : ''}>
                  {route.fee}% • {route.time}
                </span>
              </div>
            ))}
          </div>

          {/* AI Decision Explanation Card */}
          {selectedRoute && (
            <div className="mb-4">
              <AIDecisionCard 
                selectedRoute={routes.find(r => r.name === selectedRoute)!}
                allRoutes={routes}
              />
            </div>
          )}

          {/* Cashback Predictor Alert */}
          {bestCashbackRoute && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm">
                <strong>💰 Best Cashback:</strong> {bestCashbackRoute.name} gives you{' '}
                <strong className="text-green-600">
                  ₹{((bestCashbackRoute.cashback || 0) / 100 * paymentData.amount).toFixed(2)}
                </strong>{' '}
                back! (Net: {((bestCashbackRoute.cashback || 0) - bestCashbackRoute.fee).toFixed(1)}%)
              </p>
            </div>
          )}

          {/* Blockchain Network Selector */}
          {selectedRoute && (
            <div className="mb-6">
              <BlockchainNetworkSelector 
                selectedNetwork={blockchainNetwork}
                onNetworkChange={setBlockchainNetwork}
                showRecommendation={true}
              />
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={!payBtnEnabled}
            className={`w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition ${
              !payBtnEnabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {payBtnEnabled ? `Pay ₹${paymentData.amount} via UPI` : `Pay ₹${paymentData.amount} Now`}
          </button>
              </>
            )}
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-4">
            {/* Network Status Widget */}
            <NetworkStatusWidget 
              upiUptime={99.2}
              avgLatency={847}
              avgFee={0.42}
              showDetailedStats={true}
            />

            {/* Fraud Detection */}
            {fraudAlert && (
              <div className={`bg-white rounded-xl shadow-lg p-4 border-l-4 ${
                fraudAlert.risk === 'low' ? 'border-green-500' :
                fraudAlert.risk === 'medium' ? 'border-yellow-500' : 'border-red-500'
              }`}>
                <h3 className="font-bold text-sm mb-2 flex items-center space-x-2">
                  <span>🛡️</span>
                  <span>Risk Score: {fraudAlert.score}/100</span>
                </h3>
                <div className={`text-xs px-2 py-1 rounded inline-block ${
                  fraudAlert.risk === 'low' ? 'bg-green-100 text-green-700' :
                  fraudAlert.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {fraudAlert.risk.toUpperCase()} RISK
                </div>
                {fraudAlert.reasons.length > 0 && (
                  <ul className="mt-2 space-y-1 text-xs text-gray-600">
                    {fraudAlert.reasons.map((reason, i) => (
                      <li key={i}>• {reason}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Fee Prediction */}
            {feePrediction && (
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-sm mb-3 flex items-center space-x-2">
                  <span>⏰</span>
                  <span>Fee Optimization</span>
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Fee:</span>
                    <strong>{feePrediction.currentFee}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Time:</span>
                    <strong className="text-green-600">{feePrediction.bestTime}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Potential Savings:</span>
                    <strong className="text-green-600">₹{feePrediction.savings.toFixed(2)}</strong>
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
                    💡 Schedule payment for {feePrediction.bestTime} to save more
                  </div>
                </div>
              </div>
            )}

            {/* Payment Reminder */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-sm mb-2 flex items-center space-x-2">
                <span>🔔</span>
                <span>Smart Reminders</span>
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                AI will remind you before due dates and suggest optimal payment times.
              </p>
              <button className="w-full text-xs py-2 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50">
                Enable Reminders
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
