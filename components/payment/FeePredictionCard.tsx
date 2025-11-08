"use client"

import { FeePrediction } from '@/lib/payment/types'

interface FeePredictionCardProps {
  feePrediction: FeePrediction | null
}

export default function FeePredictionCard({ feePrediction }: FeePredictionCardProps) {
  if (!feePrediction) return null

  return (
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
  )
}
