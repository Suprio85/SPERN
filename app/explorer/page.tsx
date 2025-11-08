"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, ExternalLink } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function BlockchainExplorerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("transactions")

  const recentTransactions = [
    {
      hash: "0x4f1a5c3e8b2d9f7a6c1e3b5d8f2a4e7c9b1d3f5e",
      from: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
      to: "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e",
      amount: "₹450",
      timestamp: "2 min ago",
      status: "confirmed",
      gasPrice: "45 Gwei",
    },
    {
      hash: "0x8f2a4e7c9b1d3f5e0a1b2c3d4e5f6a7b8c9d0e1f",
      from: "0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
      to: "0x2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a",
      amount: "₹1,200",
      timestamp: "15 min ago",
      status: "confirmed",
      gasPrice: "48 Gwei",
    },
    {
      hash: "0x1d3f5e0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e",
      from: "0x7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e",
      to: "0x3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f",
      amount: "₹750",
      timestamp: "32 min ago",
      status: "confirmed",
      gasPrice: "42 Gwei",
    },
  ]

  const topMerchants = [
    { address: "0x1a2b3c4d...", transactions: 1250, volume: "₹4,52,300", avgFee: "0.48%" },
    { address: "0x5c6d7e8f...", transactions: 892, volume: "₹2,15,600", avgFee: "0.51%" },
    { address: "0x9f8e7d6c...", transactions: 756, volume: "₹1,88,400", avgFee: "0.49%" },
    { address: "0x2f3a4b5c...", transactions: 543, volume: "₹1,25,800", avgFee: "0.50%" },
    { address: "0x7d8e9f0a...", transactions: 412, volume: "₹98,500", avgFee: "0.47%" },
  ]

  const networkStats = [
    { label: "Total Transactions", value: "1.2M", change: "+12.5%" },
    { label: "Total Volume", value: "₹45.2Cr", change: "+8.3%" },
    { label: "Avg Gas Price", value: "45 Gwei", change: "-2.1%" },
    { label: "Network Health", value: "99.9%", change: "↔" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Blockchain Explorer</h1>
          <p className="text-muted-foreground">Track SPRN transactions on the blockchain</p>
        </div>

        {/* Search */}
        <Card className="p-4 mb-8">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by transaction hash, address, or block number..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
            <Button>Search</Button>
          </div>
        </Card>

        {/* Network Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {networkStats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className={`text-xs mt-2 ${stat.change === "↔" ? "text-muted-foreground" : "text-accent"}`}>
                {stat.change}
              </p>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("transactions")}
            className={`pb-3 px-2 font-medium text-sm transition ${
              activeTab === "transactions" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
            }`}
          >
            Recent Transactions
          </button>
          <button
            onClick={() => setActiveTab("merchants")}
            className={`pb-3 px-2 font-medium text-sm transition ${
              activeTab === "merchants" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
            }`}
          >
            Top Merchants
          </button>
        </div>

        {/* Content */}
        {activeTab === "transactions" ? (
          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <Card key={tx.hash} className="p-4 hover:bg-muted/50 transition">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono truncate">{tx.hash}</code>
                      <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded">
                        {tx.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">From</p>
                        <code className="text-xs font-mono">{tx.from.slice(0, 14)}...</code>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">To</p>
                        <code className="text-xs font-mono">{tx.to.slice(0, 14)}...</code>
                      </div>
                    </div>
                  </div>

                  <div className="text-right whitespace-nowrap">
                    <p className="font-semibold">{tx.amount}</p>
                    <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                  </div>

                  <Link href={`/explorer/${tx.hash}`}>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Address</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Transactions</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Volume</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Avg Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {topMerchants.map((merchant, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/50 transition">
                      <td className="py-3 px-4">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">{merchant.address}</code>
                      </td>
                      <td className="py-3 px-4">{merchant.transactions.toLocaleString()}</td>
                      <td className="py-3 px-4 font-medium">{merchant.volume}</td>
                      <td className="py-3 px-4 text-accent">{merchant.avgFee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
