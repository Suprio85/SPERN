"use client"

import { Button } from "@/components/ui/button"
import type { FraudAlert } from "@/lib/payment/types"
import { AlertTriangle, RefreshCw, X } from "lucide-react"

interface FraudAlertModalProps {
  fraudAlert: FraudAlert | null
  onClose: () => void
  onReroute: () => void
  onCancel: () => void
}

export function FraudAlertModal({ fraudAlert, onClose, onReroute, onCancel }: FraudAlertModalProps) {
  if (!fraudAlert || fraudAlert.risk !== 'high') return null
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">High Risk Detected</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fraud Score: {fraudAlert.score}/100</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Alert Message */}
        <div className="mb-6">
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Our AI detected suspicious patterns in this transaction
            </p>
          </div>

          {/* Reasons */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Risk Factors:
            </p>
            <ul className="space-y-2">
              {fraudAlert.reasons.map((reason, i) => (
                <li 
                  key={i} 
                  className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 border-2"
          >
            Cancel Payment
          </Button>
          <Button
            onClick={onReroute}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Different Route
          </Button>
        </div>

        {/* Info Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            🛡️ Protected by AI-powered fraud detection (DNN/LSTM)
          </p>
        </div>
      </div>
    </div>
  )
}
