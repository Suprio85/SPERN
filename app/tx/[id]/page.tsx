"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function TransactionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params)
  
  // Mock transaction data
  const tx = {
    id: resolvedParams.id,
    amount: 1250,
    status: "CONFIRMED",
    timestamp: "2024-01-15 14:23:45",
    method: "UPI",
    merchant: "Raju's Chai",
    breakdown: [
      { label: "SPRN Fee", amount: 0.1, color: "text-primary" },
      { label: "UPI Network", amount: 0, color: "text-accent" },
      { label: "Bank Charges", amount: 0, color: "text-primary" },
      { label: "Total", amount: 0.1, color: "text-foreground font-semibold" },
    ],
    blockchain: {
      hash: "0x3F2a94C0b1E3a8F9C2D5E7F1A3B5C7D9E1F3A5B",
      block: "18945623",
      confirmed: true,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border px-4 py-4">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm hover:text-primary">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        {/* Header */}
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-2">Transaction Amount</p>
          <p className="text-4xl font-bold mb-4">₹{tx.amount}</p>
          <div className="flex items-center justify-center gap-2">
            <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium">{tx.status}</span>
            <span className="text-xs text-muted-foreground">{tx.timestamp}</span>
          </div>
        </Card>

        {/* Details */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Transaction Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between pb-3 border-b border-border">
              <span className="text-muted-foreground">Method</span>
              <span>{tx.method}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-border">
              <span className="text-muted-foreground">Merchant</span>
              <span>{tx.merchant}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="text-xs font-mono">{tx.id}</span>
            </div>
          </div>
        </Card>

        {/* Fee Breakdown */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Fee Breakdown</h2>
          <div className="space-y-2">
            {tx.breakdown.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm pb-2 border-b border-border last:border-0">
                <span className="text-muted-foreground">{item.label}</span>
                <span className={item.color}>{item.amount}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Blockchain Info */}
        <Card className="p-6 border-l-4 border-l-primary">
          <h2 className="font-semibold mb-4">Blockchain Verification</h2>
          <div className="space-y-3 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
              <p className="text-xs font-mono break-all bg-muted/50 p-2 rounded">{tx.blockchain.hash}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Block Number</p>
              <p className="text-sm font-semibold">{tx.blockchain.block}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <p className="text-sm">Confirmed on Polygon PoS</p>
            </div>
          </div>

          <Link href={`/explorer?hash=${tx.blockchain.hash}`}>
            <Button className="w-full gap-2">
              View on Blockchain Explorer
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
