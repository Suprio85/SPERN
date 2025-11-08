"use client"

import { Currency, CurrencyRates } from '@/lib/payment/types'
import { getCurrencySymbol } from '@/lib/payment/utils'

interface CurrencySelectorProps {
  amount: number
  selectedCurrency: Currency
  onCurrencyChange: (currency: Currency) => void
  currencyRates: CurrencyRates
}

export default function CurrencySelector({ 
  amount, 
  selectedCurrency, 
  onCurrencyChange,
  currencyRates 
}: CurrencySelectorProps) {
  const convertAmount = (toCurrency: Currency) => {
    return (amount * currencyRates[toCurrency]).toFixed(2)
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-4xl font-bold">
        {getCurrencySymbol(selectedCurrency)}
        {selectedCurrency === 'INR' ? amount : convertAmount(selectedCurrency)}
      </div>
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value as Currency)}
        className="px-3 py-1 border rounded-lg text-sm"
      >
        <option value="INR">INR (₹)</option>
        <option value="USD">USD ($)</option>
        <option value="EUR">EUR (€)</option>
        <option value="GBP">GBP (£)</option>
        <option value="BDT">BDT (৳)</option>
      </select>
    </div>
  )
}
