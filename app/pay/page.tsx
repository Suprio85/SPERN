"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function InitiatePayment() {
  const router = useRouter()
  const [amount, setAmount] = useState(100)
  const [merchant, setMerchant] = useState("Raju's Chai Stall")

  const handlePayment = () => {
    // Generate unique payment ID
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Store payment details (in real app, save to database/API)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(paymentId, JSON.stringify({
        amount,
        merchant,
        timestamp: new Date().toISOString()
      }))
    }

    // Navigate to payment page
    router.push(`/pay/${paymentId}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Create Payment</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Merchant Name
            </label>
            <input
              type="text"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Generate Payment Link
          </button>

          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Click to create a payment link with AI-powered route optimization
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
