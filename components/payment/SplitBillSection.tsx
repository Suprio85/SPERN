"use client"

interface SplitBillSectionProps {
  showSplitBill: boolean
  splitCount: number
  amount: number
  onToggle: (checked: boolean) => void
  onCountChange: (count: number) => void
  calculateSplit: () => string
}

export default function SplitBillSection({ 
  showSplitBill, 
  splitCount, 
  amount,
  onToggle, 
  onCountChange,
  calculateSplit 
}: SplitBillSectionProps) {
  return (
    <div className="mb-6 p-3 bg-blue-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showSplitBill}
            onChange={(e) => onToggle(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm font-semibold">Split Bill</label>
        </div>
        {showSplitBill && (
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="2"
              max="10"
              value={splitCount}
              onChange={(e) => onCountChange(Number(e.target.value))}
              className="w-16 px-2 py-1 border rounded text-sm"
            />
            <span className="text-sm">people</span>
          </div>
        )}
      </div>
      {showSplitBill && (
        <p className="text-xs text-gray-600 mt-2">
          Each person pays: ₹{calculateSplit()}
        </p>
      )}
    </div>
  )
}
