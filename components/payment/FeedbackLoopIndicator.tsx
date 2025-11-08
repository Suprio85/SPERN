'use client'

import { Card } from '@/components/ui/card'
import { Brain, CheckCircle2, RefreshCw } from 'lucide-react'

interface FeedbackLoopIndicatorProps {
  isActive?: boolean
  modelUpdated?: boolean
}

export default function FeedbackLoopIndicator({ 
  isActive = true,
  modelUpdated = false
}: FeedbackLoopIndicatorProps) {
  return (
    <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-purple-900/20 border-2 border-purple-200 dark:border-purple-700 p-4">
      <div className="flex items-start gap-4">
        {/* Animated Icon */}
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          bg-gradient-to-br from-purple-600 to-pink-600
          ${isActive ? 'animate-pulse' : ''}
        `}>
          {modelUpdated ? (
            <CheckCircle2 className="w-6 h-6 text-white" />
          ) : (
            <RefreshCw className={`w-6 h-6 text-white ${isActive ? 'animate-spin' : ''}`} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
              {modelUpdated ? 'Model Updated!' : 'AI Learning in Progress'}
            </h3>
          </div>
          
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
            {modelUpdated 
              ? 'Our AI models have been updated based on this transaction data.'
              : 'Analyzing transaction outcome to improve future routing decisions...'
            }
          </p>

          {/* Learning Stats */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-2 border border-purple-200 dark:border-purple-800">
              <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">DQN</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {isActive ? '...' : '✓'}
              </div>
            </div>
            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-2 border border-pink-200 dark:border-pink-800">
              <div className="text-xs text-pink-600 dark:text-pink-400 font-medium">GNN</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {isActive ? '...' : '✓'}
              </div>
            </div>
            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-2 border border-purple-200 dark:border-purple-800">
              <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">LSTM</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {isActive ? '...' : '✓'}
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          {isActive && !modelUpdated && (
            <div className="mt-3">
              <div className="h-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full animate-[shimmer_2s_ease-in-out_infinite]"
                  style={{
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s ease-in-out infinite'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </Card>
  )
}
