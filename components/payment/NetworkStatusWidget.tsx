'use client'

import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Activity, AlertCircle, Clock, DollarSign, TrendingUp, Wifi } from 'lucide-react'

interface NetworkStatusWidgetProps {
  upiUptime?: number // percentage (e.g., 99.2)
  avgLatency?: number // milliseconds (e.g., 847)
  avgFee?: number // rupees (e.g., 0.42)
  showDetailedStats?: boolean
}

export default function NetworkStatusWidget({
  upiUptime = 99.2,
  avgLatency = 847,
  avgFee = 0.42,
  showDetailedStats = true
}: NetworkStatusWidgetProps) {
  // Determine status colors based on values
  const getUptimeStatus = (uptime: number) => {
    if (uptime >= 99) return { color: 'green', status: 'Excellent' }
    if (uptime >= 95) return { color: 'yellow', status: 'Good' }
    return { color: 'red', status: 'Degraded' }
  }

  const getLatencyStatus = (latency: number) => {
    if (latency <= 500) return { color: 'green', status: 'Fast' }
    if (latency <= 1000) return { color: 'yellow', status: 'Normal' }
    return { color: 'red', status: 'Slow' }
  }

  const uptimeStatus = getUptimeStatus(upiUptime)
  const latencyStatus = getLatencyStatus(avgLatency)

  return (
    <Card className="bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border-2 border-green-200 dark:border-slate-700 p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-cyan-600 rounded-lg flex items-center justify-center">
          <Activity className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Network Status</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Real-time metrics</p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="space-y-3">
        {/* UPI Uptime */}
        <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-3 border border-green-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wifi className={`w-4 h-4 ${
                uptimeStatus.color === 'green' ? 'text-green-600' :
                uptimeStatus.color === 'yellow' ? 'text-yellow-600' :
                'text-red-600'
              }`} />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">UPI Uptime</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              uptimeStatus.color === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
              uptimeStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {uptimeStatus.status}
            </span>
          </div>
          <div className="flex items-end justify-between mb-1">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{upiUptime}%</span>
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <Progress 
            value={upiUptime} 
            className="h-2 bg-slate-200 dark:bg-slate-700"
          />
          {showDetailedStats && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Last 30 days average
            </p>
          )}
        </div>

        {/* Average Latency */}
        <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-3 border border-blue-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${
                latencyStatus.color === 'green' ? 'text-green-600' :
                latencyStatus.color === 'yellow' ? 'text-yellow-600' :
                'text-red-600'
              }`} />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Avg Latency</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              latencyStatus.color === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
              latencyStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {latencyStatus.status}
            </span>
          </div>
          <div className="flex items-end justify-between mb-1">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{avgLatency}<span className="text-sm text-slate-500">ms</span></span>
            {latencyStatus.color === 'green' ? (
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            )}
          </div>
          <Progress 
            value={Math.min(100, Math.max(0, 100 - (avgLatency / 20)))} 
            className="h-2 bg-slate-200 dark:bg-slate-700"
          />
          {showDetailedStats && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Transaction response time
            </p>
          )}
        </div>

        {/* Average Fee */}
        <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-3 border border-cyan-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-cyan-600" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Avg Fee</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
              Competitive
            </span>
          </div>
          <div className="flex items-end justify-between mb-1">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">₹{avgFee.toFixed(2)}</span>
            <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <Progress 
            value={Math.max(0, 100 - (avgFee * 100))} 
            className="h-2 bg-slate-200 dark:bg-slate-700"
          />
          {showDetailedStats && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Per transaction cost
            </p>
          )}
        </div>
      </div>

      {/* Footer Notice */}
      <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-2">
        <Activity className="w-3 h-3 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-700 dark:text-blue-300">
          Live metrics updated every 30 seconds
        </p>
      </div>
    </Card>
  )
}
