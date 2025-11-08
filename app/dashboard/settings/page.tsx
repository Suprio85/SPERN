"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, LogOut } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import Footer from "@/components/footer"
import { useAuth } from "@/app/providers"

export default function SettingsPage() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* Account Settings */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4">Account Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Email</label>
              <p className="font-medium">{user?.email || "merchant@example.com"}</p>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Business Name</label>
              <p className="font-medium">{user?.businessName || "Your Business"}</p>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Account Balance</label>
              <p className="font-bold text-lg">₹{user?.balance.toLocaleString() || "0"}</p>
            </div>
          </div>
        </Card>

        {/* Payment Settings */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4">Payment Settings</h3>
          <div className="space-y-4">
            <div className="pb-4 border-b border-border">
              <p className="font-medium mb-2">Settlement Frequency</p>
              <select className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div>
              <p className="font-medium mb-2">Bank Account</p>
              <p className="text-sm text-muted-foreground">XXXX XXXX XXXX 1234</p>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-destructive/20 bg-destructive/5">
          <h3 className="font-semibold text-lg mb-4">Danger Zone</h3>
          <Button variant="destructive" className="gap-2" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
