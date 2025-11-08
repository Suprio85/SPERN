"use client"

export default function PaymentReminderCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="font-bold text-sm mb-2 flex items-center space-x-2">
        <span>🔔</span>
        <span>Smart Reminders</span>
      </h3>
      <p className="text-xs text-gray-600 mb-3">
        AI will remind you before due dates and suggest optimal payment times.
      </p>
      <button className="w-full text-xs py-2 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50">
        Enable Reminders
      </button>
    </div>
  )
}
