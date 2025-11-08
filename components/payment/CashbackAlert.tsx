"use client"

import { Route } from '@/lib/payment/types'

interface CashbackAlertProps {
  route: Route
  amount: number
}

export default function CashbackAlert({ route, amount }: CashbackAlertProps) {
  const cashbackAmount = ((route.cashback || 0) / 100 * amount).toFixed(2)
  const netBenefit = ((route.cashback || 0) - route.fee).toFixed(1)

  return (
    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
      <p className="text-sm">
        <strong>💰 Best Cashback:</strong> {route.name} gives you{' '}
        <strong className="text-green-600">₹{cashbackAmount}</strong>{' '}
        back! (Net: {netBenefit}%)
      </p>
    </div>
  )
}
