"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"

export default function TransactionList() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const transactions = [
    {
      id: 1,
      txHash: "TXN000001",
      customer: "Amit Kumar",
      amount: 450,
      fee: 2.25,
      saved: 2.23,
      time: "2 min ago",
      status: "completed",
      method: "UPI",
      route: "Direct",
    },
    {
      id: 2,
      txHash: "TXN000002",
      customer: "Priya Singh",
      amount: 1200,
      fee: 6,
      saved: 5.98,
      time: "15 min ago",
      status: "completed",
      method: "Card",
      route: "Gateway A",
    },
    {
      id: 3,
      txHash: "TXN000003",
      customer: "Rajesh Patel",
      amount: 750,
      fee: 3.75,
      saved: 3.73,
      time: "32 min ago",
      status: "completed",
      method: "Wallet",
      route: "Gateway B",
    },
    {
      id: 4,
      txHash: "TXN000004",
      customer: "Neha Verma",
      amount: 2100,
      fee: 10.5,
      saved: 10.48,
      time: "1 hour ago",
      status: "completed",
      method: "UPI",
      route: "Direct",
    },
    {
      id: 5,
      txHash: "TXN000005",
      customer: "Vikram Singh",
      amount: 325,
      fee: 1.63,
      saved: 1.61,
      time: "2 hours ago",
      status: "completed",
      method: "Crypto",
      route: "Blockchain",
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-border">
          <tr>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Transaction ID</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Fee Charged</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Fee Saved</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground"></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <React.Fragment key={tx.id}>
              <tr className="border-b border-border hover:bg-muted/50 transition cursor-pointer">
                <td className="py-3 px-4">
                  <p className="font-mono text-sm font-semibold">{tx.txHash}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="font-medium">{tx.customer}</p>
                </td>
                <td className="py-3 px-4">
                  <span className="font-semibold">₹{tx.amount}</span>
                </td>
                <td className="py-3 px-4">
                  <span>₹{tx.fee.toFixed(2)}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-accent font-medium">₹{tx.saved.toFixed(2)}</span>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{tx.time}</td>
                <td className="py-3 px-4">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    {tx.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => setExpandedId(expandedId === tx.id ? null : tx.id)}
                    className="p-1 hover:bg-muted rounded transition"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${expandedId === tx.id ? "rotate-180" : ""}`}
                    />
                  </button>
                </td>
              </tr>

              {expandedId === tx.id && (
                <tr className="border-b border-border bg-muted/30">
                  <td colSpan={8} className="py-4 px-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Payment Method</p>
                          <p className="font-medium">{tx.method}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Route Used</p>
                          <p className="font-medium">{tx.route}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/transactions/${tx.id}`} className="flex-1">
                          <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition">
                            View Full Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
