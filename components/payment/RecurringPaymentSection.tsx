"use client"

interface RecurringPaymentSectionProps {
  recurringEnabled: boolean
  onToggle: (checked: boolean) => void
}

export default function RecurringPaymentSection({ 
  recurringEnabled, 
  onToggle 
}: RecurringPaymentSectionProps) {
  return (
    <div className="mb-6 p-3 bg-purple-50 rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={recurringEnabled}
          onChange={(e) => onToggle(e.target.checked)}
          className="w-4 h-4"
        />
        <label className="text-sm font-semibold">🔄 Setup Auto-pay (Monthly)</label>
      </div>
    </div>
  )
}
