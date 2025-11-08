"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Zap } from "lucide-react"

export default function PaymentPage({ params }: { params: { slug?: string[] } }) {
  const [amount, setAmount] = useState(100)
  const [method, setMethod] = useState("upi")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [routing, setRouting] = useState(false)
  const merchantId = params.slug?.[0] || "merchant"

  const methods = [
    { id: "upi", name: "UPI", fee: 0 },
    { id: "card", name: "Card", fee: 0.8 },
    { id: "wallet", name: "Wallet", fee: 0.3 },
    { id: "crypto", name: "Crypto", fee: 0.05 },
  ]

  const selectedMethod = methods.find((m) => m.id === method)

  const handlePay = async () => {
    setLoading(true)
    setRouting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setRouting(false)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSuccess(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border px-4 py-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm hover:text-primary">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      <div className="max-w-md mx-auto px-4 py-12">
        {!success ? (
          <Card className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">{merchantId}</h2>
              <p className="text-sm text-muted-foreground">Payment for services</p>
            </div>

            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 text-2xl border border-border rounded-lg bg-card text-foreground text-center font-semibold"
                  disabled={loading}
                />
              </div>

              {/* Method Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  {methods.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      disabled={loading}
                      className={`p-3 rounded-lg border transition ${
                        method === m.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs">{m.fee}% fee</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Routing Animation */}
              {routing && (
                <div className="space-y-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm font-medium">Scanning routes...</p>
                  <div className="space-y-2">
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-primary animate-pulse w-1/2" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Best: {selectedMethod?.name} {selectedMethod?.fee}%
                    </p>
                  </div>
                </div>
              )}

              {/* Fee Summary */}
              <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{amount.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fee ({selectedMethod?.fee}%)</span>
                  <span>₹{((amount * (selectedMethod?.fee || 0)) / 100).toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{(amount * (1 + (selectedMethod?.fee || 0) / 100)).toFixed(2)}</span>
                </div>
              </div>

              {/* Pay Button */}
              <Button onClick={handlePay} disabled={loading} className="w-full" size="lg">
                {loading ? "Processing..." : `Pay ₹${amount.toFixed(0)}`}
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-muted-foreground">Your payment has been processed instantly</p>
            </div>

            <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Blockchain Proof</p>
              <p className="text-xs font-mono break-all">0x3F2a94C0b1E3a8F9C2D5E7F1A3B5C7D9E1F3A5B</p>
            </div>

            <div className="flex gap-3">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Home
                </Button>
              </Link>
              <Link href="/explorer" className="flex-1">
                <Button className="w-full gap-2">
                  <Zap className="w-4 h-4" />
                  View on Explorer
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
