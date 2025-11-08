"use client"

import { FraudAlert } from '@/lib/payment/types'

interface FraudDetectionCardProps {
  fraudAlert: FraudAlert | null
}

export default function FraudDetectionCard({ fraudAlert }: FraudDetectionCardProps) {
  if (!fraudAlert) return null

  return (
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
  )
}
