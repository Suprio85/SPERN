"use client"

import DashboardHeader from "@/components/dashboard-header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function TransactionDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [copied, setCopied] = React.useState("")
  const resolvedParams = React.use(params)

  const transaction = {
    id: resolvedParams.id,
    txHash: "0x4f1a5c3e8b2d9f7a6c1e3b5d8f2a4e7c9b1d3f5e",
    customer: "Amit Kumar",
    customerPhone: "+91-9876543210",
    amount: 450,
    feeCharged: 2.25,
    feeSaved: 2.23,
    timestamp: "2024-11-04 14:32:45",
    method: "UPI (Google Pay)",
    status: "completed",
    settlement: "2024-11-05 09:00:00",
    route: "UPI Direct",
    description: "Chai order #1245",
    blockchainStatus: "confirmed",
    blockNumber: 18952845,
    gasUsed: 21000,
    smartContractAddress: "0x1f2c3e4d5a6b7c8e9f0a1b2c3d4e5f6a7b8c9d0e",
  }

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(""), 2000)
  }

  const routeBreakdown = [
    { provider: "Card Network", fee: 0.75 },
    { provider: "Payment Gateway", fee: 0.6 },
    { provider: "Bank Charges", fee: 0.38 },
    { provider: "SPRN Platform", fee: 0.5 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Transaction Details</h1>
            <CheckCircle className="w-6 h-6 text-accent" />
          </div>
          <p className="text-muted-foreground">Transaction ID: TXN{transaction.id}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Amount</p>
            <p className="text-3xl font-bold">₹{transaction.amount}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Fee Charged</p>
            <p className="text-3xl font-bold">₹{transaction.feeCharged.toFixed(2)}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Fee Saved</p>
            <p className="text-3xl font-bold text-accent">₹{transaction.feeSaved.toFixed(2)}</p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Transaction Info */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Transaction Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-start pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground">Customer</span>
                <div className="text-right">
                  <p className="font-medium">{transaction.customer}</p>
                  <p className="text-xs text-muted-foreground">{transaction.customerPhone}</p>
                </div>
              </div>

              <div className="flex justify-between items-start pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground">Payment Method</span>
                <p className="font-medium">{transaction.method}</p>
              </div>

              <div className="flex justify-between items-start pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground">Route Used</span>
                <p className="font-medium">{transaction.route}</p>
              </div>

              <div className="flex justify-between items-start pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground">Description</span>
                <p className="font-medium">{transaction.description}</p>
              </div>

              <div className="flex justify-between items-start pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground">Time</span>
                <p className="font-medium">{transaction.timestamp}</p>
              </div>

              <div className="flex justify-between items-start pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground">Settlement Time</span>
                <p className="font-medium">{transaction.settlement}</p>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                  {transaction.status}
                </span>
              </div>
            </div>
          </Card>

          {/* Fee Breakdown */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Fee Breakdown</h3>
            <div className="space-y-3">
              {routeBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center pb-3 border-b border-border last:border-b-0"
                >
                  <span className="text-sm text-muted-foreground">{item.provider}</span>
                  <span className="font-medium">₹{item.fee.toFixed(2)}</span>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-border flex justify-between">
                <span className="font-semibold">Total Fees</span>
                <span className="font-bold">₹{routeBreakdown.reduce((sum, item) => sum + item.fee, 0).toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Blockchain Verification */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="font-semibold text-lg">Blockchain Verification</h3>
            <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded">
              {transaction.blockchainStatus}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Transaction Hash</p>
              <div className="flex gap-2 items-center">
                <code className="flex-1 text-xs bg-muted p-3 rounded font-mono break-all">{transaction.txHash}</code>
                <Button variant="outline" size="sm" onClick={() => handleCopy(transaction.txHash, "txHash")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Smart Contract</p>
              <div className="flex gap-2 items-center">
                <code className="flex-1 text-xs bg-muted p-3 rounded font-mono break-all">
                  {transaction.smartContractAddress}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(transaction.smartContractAddress, "contract")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Block Number</p>
              <p className="font-semibold">{transaction.blockNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Gas Used</p>
              <p className="font-semibold">{transaction.gasUsed.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <p className="font-semibold text-accent capitalize">{transaction.blockchainStatus}</p>
            </div>
          </div>

          <Link
            href={`/explorer/${transaction.txHash}`}
            className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
          >
            View on Blockchain Explorer
            <ExternalLink className="w-4 h-4" />
          </Link>
        </Card>
      </main>

      <Footer />
    </div>
  )
}