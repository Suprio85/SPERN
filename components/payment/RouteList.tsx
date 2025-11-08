"use client"

import { Route } from '@/lib/payment/types'

interface RouteListProps {
  routes: Route[]
  selectedRoute: string | null
  amount: number
}

export default function RouteList({ routes, selectedRoute, amount }: RouteListProps) {
  return (
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
  )
}
