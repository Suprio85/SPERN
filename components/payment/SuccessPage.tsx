"use client"

import { PaymentData, Route } from '@/lib/payment/types'

interface SuccessPageProps {
  paymentData: PaymentData
  paymentId: string
  selectedRoute: string | null
  allRoutes: Route[]
  recurringEnabled: boolean
}

export default function SuccessPage({ 
  paymentData, 
  paymentId, 
  selectedRoute, 
  allRoutes,
  recurringEnabled 
}: SuccessPageProps) {
  const cashbackEarned = selectedRoute 
    ? ((allRoutes.find(r => r.name === selectedRoute)?.cashback || 0) / 100 * paymentData.amount).toFixed(2)
    : '0.00'

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold text-green-800">Payment Successful!</h2>
          <p className="text-green-600 mt-2">₹{paymentData.amount} sent instantly</p>
          <p className="text-gray-600 text-sm mt-1">Payment ID: {paymentId}</p>
          {selectedRoute && (
            <div className="mt-3 inline-block bg-green-100 px-4 py-2 rounded-full">
              <span className="text-green-700 font-semibold">
                💰 Cashback Earned: ₹{cashbackEarned}
              </span>
            </div>
          )}
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
  )
}
