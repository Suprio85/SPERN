"use client"

import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Copy } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function TransactionExplorerPage({ params }: { params: Promise<{ hash: string }> }) {
  const [copied, setCopied] = React.useState(false)
  const resolvedParams = React.use(params)

  const transaction = {
    hash: resolvedParams.hash,
    blockNumber: 18952845,
    timestamp: "2024-11-04 14:32:45",
    from: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    to: "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e",
    value: "₹450",
    gasLimit: 21000,
    gasUsed: 21000,
    gasPrice: "45 Gwei",
    nonce: 1245,
    status: "Success",
    fee: "₹0.945",
    confirmations: 15,
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(resolvedParams.hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <Link href="/explorer" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Explorer
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Transaction Details</h1>
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono">{resolvedParams.hash}</code>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Transaction Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                  {transaction.status}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground">Confirmations</span>
                <span className="font-medium">{transaction.confirmations}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground">Block Number</span>
                <span className="font-medium">#{transaction.blockNumber}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground">Timestamp</span>
                <span className="font-medium">{transaction.timestamp}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Nonce</span>
                <span className="font-medium">{transaction.nonce}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Transaction Details</h3>
            <div className="space-y-4">
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">From</p>
                <code className="text-xs font-mono bg-muted p-2 rounded break-all">{transaction.from}</code>
              </div>
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">To</p>
                <code className="text-xs font-mono bg-muted p-2 rounded break-all">{transaction.to}</code>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground">Value</span>
                <span className="font-bold">{transaction.value}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Transaction Fee</span>
                <span className="font-bold text-accent">{transaction.fee}</span>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Gas Information</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Gas Limit</p>
              <p className="font-semibold">{transaction.gasLimit.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Gas Used</p>
              <p className="font-semibold">{transaction.gasUsed.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Gas Price</p>
              <p className="font-semibold">{transaction.gasPrice}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Transaction Fee</p>
              <p className="font-semibold text-accent">{transaction.fee}</p>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
