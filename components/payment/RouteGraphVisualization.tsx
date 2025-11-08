"use client"

import type { Route } from "@/lib/payment/types"

interface RouteGraphVisualizationProps {
  routes: Route[]
  selectedRoute: string | null
}

export function RouteGraphVisualization({ routes, selectedRoute }: RouteGraphVisualizationProps) {
  return (
    <div className="relative w-full h-72 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-xl p-6 overflow-hidden border border-purple-200 dark:border-slate-700">
      {/* Decorative grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-purple-200 dark:border-slate-600" />
          ))}
        </div>
      </div>

      {/* Central user node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-600 rounded-full flex items-center justify-center text-white font-bold shadow-xl animate-pulse">
            <span className="text-2xl">👤</span>
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded">
              You
            </span>
          </div>
        </div>
      </div>

      {/* Route nodes in circular arrangement */}
      {routes.map((route, i) => {
        const totalRoutes = routes.length
        const angle = (i / totalRoutes) * 2 * Math.PI - Math.PI / 2
        const radius = 38 // percentage
        const x = 50 + radius * Math.cos(angle)
        const y = 50 + radius * Math.sin(angle)
        const isSelected = route.name === selectedRoute

        // Get icon for route type
        const getRouteIcon = (name: string) => {
          if (name.includes('UPI')) return '💳'
          if (name.includes('Visa') || name.includes('Card')) return '💳'
          if (name.includes('Paytm')) return '💰'
          if (name.includes('Bank')) return '🏦'
          if (name.includes('Crypto')) return '₿'
          return '💵'
        }

        return (
          <div key={route.name}>
            {/* Connection line with animation */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: isSelected ? 15 : 5 }}
            >
              <line
                x1="50%"
                y1="50%"
                x2={`${x}%`}
                y2={`${y}%`}
                stroke={isSelected ? '#10b981' : '#e5e7eb'}
                strokeWidth={isSelected ? 3 : 1.5}
                strokeDasharray={isSelected ? '0' : '5,5'}
                className={isSelected ? 'animate-pulse' : ''}
              />
              
              {/* Animated data flow particles */}
              {isSelected && (
                <>
                  <circle
                    cx="50%"
                    cy="50%"
                    r="3"
                    fill="#10b981"
                    className="animate-ping"
                  />
                  <circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="3"
                    fill="#10b981"
                    className="animate-ping"
                    style={{ animationDelay: '0.5s' }}
                  />
                </>
              )}
            </svg>

            {/* Route node */}
            <div
              className="absolute z-10"
              style={{ 
                left: `${x}%`, 
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className={`relative transition-all duration-300 ${isSelected ? 'scale-110' : ''}`}>
                {/* Node circle */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all ${
                  isSelected 
                    ? 'bg-gradient-to-br from-green-400 to-green-600 ring-4 ring-green-200 dark:ring-green-900' 
                    : 'bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600'
                }`}>
                  {getRouteIcon(route.name)}
                </div>

                {/* Selection checkmark */}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}

                {/* Route info tooltip */}
                <div className="absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                    isSelected 
                      ? 'bg-green-600 text-white shadow-lg' 
                      : 'bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-600'
                  }`}>
                    <div className="font-semibold">{route.name}</div>
                    <div className="text-[10px] opacity-80">
                      {route.fee}% • {route.time}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Legend */}
      <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-3 py-2 rounded-lg text-xs z-20 border border-gray-200 dark:border-slate-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-0.5 bg-green-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Active</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-0.5 border-t border-dashed border-gray-300"></div>
            <span className="text-gray-700 dark:text-gray-300">Available</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-2 left-2 z-20">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-purple-200 dark:border-slate-600">
          <span className="text-xs font-semibold text-purple-700 dark:text-purple-400">
            📊 Payment Network Graph
          </span>
        </div>
      </div>
    </div>
  )
}
