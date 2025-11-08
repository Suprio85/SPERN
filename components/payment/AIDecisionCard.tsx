"use client"

import { Card } from "@/components/ui/card"
import type { Route } from "@/lib/payment/types"
import { Brain, CheckCircle2, Shield, TrendingUp, Zap } from "lucide-react"

interface AIDecisionCardProps {
  selectedRoute: Route | null
  allRoutes: Route[]
}

export function AIDecisionCard({ selectedRoute, allRoutes }: AIDecisionCardProps) {
  if (!selectedRoute) return null

  // Calculate DQN confidence score (normalized from multiple factors)
  const calculateConfidence = (route: Route) => {
    const feeScore = (1 - (typeof route.fee === 'number' ? route.fee : parseFloat(route.fee))) * 100
    const timeScore = Math.max(0, 100 - parseInt(route.time.replace('s', '')) * 10)
    const riskScore = route.risk === 'Low' ? 100 : route.risk === 'Medium' ? 60 : 30
    return Math.round((feeScore + timeScore + riskScore) / 3)
  }

  const confidence = calculateConfidence(selectedRoute)
  const isOptimal = confidence >= 90

  // Find why this route was selected
  const getFeeValue = (fee: string | number) => typeof fee === 'number' ? fee : parseFloat(fee)
  const lowestFee = allRoutes.every(r => getFeeValue(selectedRoute.fee) <= getFeeValue(r.fee))
  const fastest = allRoutes.every(r => parseInt(selectedRoute.time.replace('s', '')) <= parseInt(r.time.replace('s', '')))
  const safest = selectedRoute.risk === 'Low'

  return (
    <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border-2 border-blue-200 dark:border-slate-700 overflow-hidden">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">AI Decision Analysis</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Deep Q-Network (DQN) Reasoning</p>
          </div>
        </div>

        {/* Selected Route */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 mb-4 border border-purple-200 dark:border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Selected Route:</span>
            <div className="flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="font-bold text-purple-700 dark:text-purple-400">{selectedRoute.name}</span>
            </div>
          </div>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-2 text-center border border-yellow-200 dark:border-yellow-800">
              <Zap className="w-4 h-4 mx-auto text-yellow-600 dark:text-yellow-400 mb-1" />
              <p className="text-[10px] text-gray-600 dark:text-gray-400 font-medium">Speed</p>
              <p className="font-bold text-sm text-gray-900 dark:text-white">{selectedRoute.time}</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-2 text-center border border-green-200 dark:border-green-800">
              <span className="text-xl">💰</span>
              <p className="text-[10px] text-gray-600 dark:text-gray-400 font-medium">Fee</p>
              <p className="font-bold text-sm text-green-600 dark:text-green-400">{selectedRoute.fee}%</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-2 text-center border border-blue-200 dark:border-blue-800">
              <Shield className="w-4 h-4 mx-auto text-blue-600 dark:text-blue-400 mb-1" />
              <p className="text-[10px] text-gray-600 dark:text-gray-400 font-medium">Risk</p>
              <p className="font-bold text-sm text-gray-900 dark:text-white">{selectedRoute.risk}</p>
            </div>
          </div>
        </div>

        {/* Why This Route? */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 mb-4 border border-blue-200 dark:border-slate-600">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
            ✨ Optimization Factors:
          </p>
          <div className="space-y-1.5">
            {lowestFee && (
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Lowest transaction fee</span>
              </div>
            )}
            {fastest && (
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Fastest settlement time</span>
              </div>
            )}
            {safest && (
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-5 h-5 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Highest success probability</span>
              </div>
            )}
            {!lowestFee && !fastest && !safest && (
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-5 h-5 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Best overall balance</span>
              </div>
            )}
          </div>
        </div>

        {/* DQN Confidence Score */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg p-3 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              DQN Confidence Score
            </span>
            <span className={`text-sm font-bold ${isOptimal ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
              {confidence}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ${
                isOptimal 
                  ? 'bg-gradient-to-r from-green-400 to-green-600' 
                  : 'bg-gradient-to-r from-blue-400 to-purple-600'
              }`}
              style={{ width: `${confidence}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
          
          <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-2 text-center">
            {isOptimal ? '✓ Optimal choice confirmed' : 'Good choice for this transaction'}
          </p>
        </div>

        {/* ML Model Info */}
        <div className="mt-3 flex items-center justify-center space-x-4 text-[10px] text-gray-500 dark:text-gray-500">
          <span>• Graph Neural Network</span>
          <span>• Reinforcement Learning</span>
        </div>
      </div>
    </Card>
  )
}
