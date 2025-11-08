"use client"

export function useMockTransactions() {
  return [
    { id: "1", amount: 1250, method: "UPI", fee: 0.0, status: "INSTANT", timestamp: "2:45 PM" },
    { id: "2", amount: 850, method: "Card", fee: 0.8, status: "INSTANT", timestamp: "2:30 PM" },
    { id: "3", amount: 500, method: "Wallet", fee: 0.3, status: "INSTANT", timestamp: "2:15 PM" },
    { id: "4", amount: 2000, method: "UPI", fee: 0.0, status: "INSTANT", timestamp: "1:45 PM" },
    { id: "5", amount: 350, method: "Crypto", fee: 0.05, status: "INSTANT", timestamp: "1:20 PM" },
  ]
}
