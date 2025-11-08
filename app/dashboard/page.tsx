"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogOut, Plus, TrendingUp, Users, DollarSign, Zap, Search } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import TransactionList from "@/components/transaction-list"
import AnalyticsChart from "@/components/analytics-chart"
import Footer from "@/components/footer"

export default function DashboardPage() {
  const [balance, setBalance] = useState(45230)
  const [totalTransactions, setTotalTransactions] = useState(1250)
  const [avgFeesSaved, setAvgFeesSaved] = useState(2.3)
  const [searchTxn, setSearchTxn] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Raju</h1>
          <p className="text-muted-foreground">Here's your business performance today</p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Total Balance</span>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">₹{balance.toLocaleString()}</p>
            <p className="text-xs text-accent mt-2">+2.5% from yesterday</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Transactions</span>
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold">{totalTransactions.toLocaleString()}</p>
            <p className="text-xs text-accent mt-2">This month</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Avg Fee Saved</span>
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">{avgFeesSaved}%</p>
            <p className="text-xs text-accent mt-2">Per transaction</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Customers</span>
              <Users className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold">842</p>
            <p className="text-xs text-accent mt-2">Active this month</p>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Analytics Chart */}
          <div className="md:col-span-2">
            <AnalyticsChart />
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="p-6 h-full flex flex-col">
              <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3 flex-1">
                <Link href="/dashboard/qr-code">
                  <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                    <Plus className="w-4 h-4" />
                    Generate QR Code
                  </Button>
                </Link>
                <Link href="/dashboard/payment-link">
                  <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                    <Plus className="w-4 h-4" />
                    Create Payment Link
                  </Button>
                </Link>
                <Link href="/dashboard/settlements">
                  <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                    <DollarSign className="w-4 h-4" />
                    View Settlements
                  </Button>
                </Link>
              </div>
              <Link href="/">
                <Button className="w-full justify-start gap-2 mt-4" variant="ghost">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Transactions Table with Search */}
        <Card className="p-6">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">Recent Transactions</h3>
                <p className="text-sm text-muted-foreground">Your latest payment activity</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by Transaction ID (TXN000001)"
                  value={searchTxn}
                  onChange={(e) => setSearchTxn(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-border rounded-lg bg-card text-foreground text-sm w-full md:w-64"
                />
              </div>
            </div>
          </div>
          <TransactionList />
        </Card>
      </main>

      <Footer />
    </div>
  )
}
