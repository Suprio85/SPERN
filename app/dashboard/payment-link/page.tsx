"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, ArrowLeft } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import Footer from "@/components/footer"

export default function PaymentLinkPage() {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [copied, setCopied] = useState(false)

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault()
    const generatedLink = `https://pay.sprn.io/${Date.now()}`
    setLink(generatedLink)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-2">Create Payment Link</h1>
        <p className="text-muted-foreground mb-8">Generate a sharable link for customers to pay</p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <form onSubmit={handleGenerateLink} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1000"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Order #12345"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                />
              </div>

              <Button type="submit" className="w-full">
                Generate Link
              </Button>
            </form>
          </Card>

          <Card className="p-6">
            {link ? (
              <div>
                <p className="text-sm text-muted-foreground mb-4">Payment Link</p>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={link}
                    readOnly
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-muted text-foreground text-sm"
                  />
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-transparent">
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">Amount: ₹{amount}</p>
                  {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Your payment link will appear here</p>
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
