"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

export default function AnalyticsChart() {
  const data = [
    { day: "Mon", revenue: 4200, transactions: 28, feeSaved: 185, customers: 12 },
    { day: "Tue", revenue: 3800, transactions: 24, feeSaved: 160, customers: 10 },
    { day: "Wed", revenue: 5100, transactions: 35, feeSaved: 220, customers: 15 },
    { day: "Thu", revenue: 4600, transactions: 31, feeSaved: 200, customers: 14 },
    { day: "Fri", revenue: 6200, transactions: 42, feeSaved: 280, customers: 18 },
    { day: "Sat", revenue: 7100, transactions: 48, feeSaved: 310, customers: 21 },
    { day: "Sun", revenue: 5800, transactions: 40, feeSaved: 255, customers: 17 },
  ]

  const feeData = [
    { provider: "Card Network", amount: 2100 },
    { provider: "Payment Gateway", amount: 1680 },
    { provider: "Bank Charges", amount: 840 },
    { provider: "SPRN Platform", amount: 1400 },
  ]

  return (
    <div className="space-y-6">
      {/* Main Revenue Chart */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Revenue Trend (7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-primary)"
              dot={{ fill: "var(--color-primary)", r: 4 }}
              strokeWidth={2}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
            <p className="text-lg font-bold">₹36,800</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Transactions</p>
            <p className="text-lg font-bold">248</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Saved</p>
            <p className="text-lg font-bold text-accent">₹1,810</p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Transactions vs Customers */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Transaction Volume</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Bar dataKey="transactions" fill="var(--color-primary)" name="Transactions" radius={[8, 8, 0, 0]} />
              <Bar dataKey="customers" fill="var(--color-accent)" name="New Customers" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Fee Savings Breakdown */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Fee Savings by Provider</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={feeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" stroke="var(--color-muted-foreground)" />
              <YAxis
                dataKey="provider"
                type="category"
                stroke="var(--color-muted-foreground)"
                width={120}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="amount" fill="var(--color-accent)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Fee Savings Trend */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Daily Fee Savings Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="feeSaved"
              stroke="var(--color-accent)"
              dot={{ fill: "var(--color-accent)", r: 4 }}
              strokeWidth={2}
              name="Fee Saved (₹)"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Highest Daily Savings</p>
              <p className="text-lg font-bold text-accent">₹310</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Average Daily Savings</p>
              <p className="text-lg font-bold text-accent">₹258.57</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
