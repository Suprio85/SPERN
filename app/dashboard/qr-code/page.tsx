"use client"

import type React from "react"

import { useAuth } from "@/app/providers"
import DashboardHeader from "@/components/dashboard-header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Copy, Download, Printer, Receipt, Store } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function QRCodeGeneratorPage() {
  const { user } = useAuth()
  const [qrType, setQrType] = useState<"static" | "dynamic">("static")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [qrGenerated, setQrGenerated] = useState(false)
  const [qrCode, setQrCode] = useState("")
  const [paymentLink, setPaymentLink] = useState("")
  const [copied, setCopied] = useState(false)

  // Static QR - Generate immediately for merchant
  const merchantUPI = `${user?.businessName.toLowerCase().replace(/\s+/g, "")}@sprn`
  const staticQRLink = `upi://pay?pa=${merchantUPI}&pn=${encodeURIComponent(user?.businessName || "Merchant")}`
  const staticQRCode = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(staticQRLink)}`

  const handleGenerateDynamicQR = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate payment link with amount
    const link = `${window.location.origin}/pay/pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setPaymentLink(link)

    // Generate dynamic QR with amount
    const txnId = `TXN${Date.now()}`
    const dynamicUPILink = `upi://pay?pa=${merchantUPI}&pn=${encodeURIComponent(user?.businessName || "Merchant")}&am=${amount}&tr=${txnId}&cu=INR&tn=${encodeURIComponent(description || "Payment")}`
    const dynamicQR = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(dynamicUPILink)}`
    
    setQrCode(dynamicQR)
    setQrGenerated(true)
  }

  const handleCopyLink = () => {
    const linkToCopy = qrType === "static" ? staticQRLink : paymentLink
    navigator.clipboard.writeText(linkToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadQR = () => {
    const qrToDownload = qrType === "static" ? staticQRCode : qrCode
    const link = document.createElement("a")
    link.href = qrToDownload
    link.download = qrType === "static" 
      ? `${user?.businessName}-static-qr.png`
      : `qr-code-₹${amount}.png`
    link.click()
  }

  const handlePrintQR = () => {
    const printWindow = window.open("", "_blank")
    const qrToPrint = qrType === "static" ? staticQRCode : qrCode
    
    printWindow?.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body { 
              margin: 0; 
              padding: 40px; 
              text-align: center; 
              font-family: Arial, sans-serif;
            }
            .container {
              max-width: 400px;
              margin: 0 auto;
              padding: 30px;
              border: 2px solid #000;
            }
            h1 { font-size: 24px; margin-bottom: 10px; }
            .upi { 
              font-family: monospace; 
              font-size: 14px; 
              color: #666; 
              margin: 10px 0;
            }
            img { 
              width: 300px; 
              height: 300px; 
              margin: 20px 0;
            }
            .amount { 
              font-size: 32px; 
              font-weight: bold; 
              margin: 10px 0;
            }
            .instructions {
              font-size: 12px;
              color: #666;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${user?.businessName}</h1>
            <div class="upi">${merchantUPI}</div>
            ${qrType === "dynamic" ? `<div class="amount">₹${amount}</div>` : '<p style="font-size: 18px; font-weight: bold;">Scan & Pay Any Amount</p>'}
            <img src="${qrToPrint}" alt="QR Code" />
            ${qrType === "static" 
              ? '<div class="instructions">Scan this QR code with any UPI app<br/>and enter the amount to pay</div>'
              : `<div class="instructions">${description || 'Payment'}</div>`
            }
          </div>
          <script>
            window.onload = () => {
              window.print();
              setTimeout(() => window.close(), 500);
            }
          </script>
        </body>
      </html>
    `)
    printWindow?.document.close()
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-2">Payment QR Codes</h1>
        <p className="text-muted-foreground mb-8">Generate QR codes for your business</p>

        {/* QR Type Selector */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card 
            className={`p-6 cursor-pointer transition-all ${qrType === "static" ? "border-2 border-primary bg-primary/5" : "border-2 border-transparent hover:border-primary/50"}`}
            onClick={() => setQrType("static")}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Store className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Static QR Code</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  One QR for all transactions. Customers scan and enter amount.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
                    Physical Store
                  </span>
                  <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full">
                    Printable
                  </span>
                  <span className="text-xs px-2 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full">
                    Variable Amount
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card 
            className={`p-6 cursor-pointer transition-all ${qrType === "dynamic" ? "border-2 border-primary bg-primary/5" : "border-2 border-transparent hover:border-primary/50"}`}
            onClick={() => setQrType("dynamic")}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                <Receipt className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Dynamic QR Code</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Generate QR for specific amount. Customer just confirms payment.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full">
                    Online Payment
                  </span>
                  <span className="text-xs px-2 py-1 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-full">
                    Fixed Amount
                  </span>
                  <span className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-full">
                    Invoice
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form/Info */}
          <div>
            {qrType === "static" ? (
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Your Static QR Code</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Business Name</p>
                    <p className="font-semibold">{user?.businessName}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">UPI ID</p>
                    <p className="font-mono text-sm">{merchantUPI}</p>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">How to use:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">1.</span>
                        <span>Download or print this QR code</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">2.</span>
                        <span>Display it at your shop/counter</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">3.</span>
                        <span>Customers scan and enter the amount</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">4.</span>
                        <span>No need to generate new QR each time!</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button onClick={handleDownloadQR} className="w-full gap-2">
                      <Download className="w-4 h-4" />
                      Download QR Code
                    </Button>
                    <Button onClick={handlePrintQR} variant="outline" className="w-full gap-2">
                      <Printer className="w-4 h-4" />
                      Print QR Code
                    </Button>
                    <Button onClick={handleCopyLink} variant="outline" className="w-full gap-2">
                      <Copy className="w-4 h-4" />
                      {copied ? "Copied!" : "Copy UPI Link"}
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Generate Payment QR</h3>
                <form onSubmit={handleGenerateDynamicQR} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount (₹) *</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="500"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g., Invoice #12345"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full">
                      Generate QR Code
                    </Button>
                  </div>

                  {qrGenerated && (
                    <>
                      <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                        <p className="text-sm font-medium mb-3">Payment Link</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={paymentLink}
                            readOnly
                            className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleCopyLink}
                            className="gap-2"
                          >
                            <Copy className="w-4 h-4" />
                            {copied ? "Copied" : "Copy"}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button onClick={handleDownloadQR} variant="outline" className="w-full gap-2">
                          <Download className="w-4 h-4" />
                          Download QR Code
                        </Button>
                        <Button onClick={handlePrintQR} variant="outline" className="w-full gap-2">
                          <Printer className="w-4 h-4" />
                          Print QR Code
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              </Card>
            )}
          </div>

          {/* QR Preview */}
          <div>
            <Card className="p-6 sticky top-4">
              <h3 className="font-semibold text-lg mb-4 text-center">QR Code Preview</h3>
              <div className="flex flex-col items-center justify-center">
                {qrType === "static" || qrGenerated ? (
                  <div className="text-center w-full">
                    <div className="bg-white p-6 rounded-xl border-2 border-primary inline-block mb-4">
                      <img
                        src={qrType === "static" ? staticQRCode : qrCode}
                        alt="Payment QR Code"
                        className="w-64 h-64"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-xl">{user?.businessName}</p>
                      <p className="font-mono text-sm text-muted-foreground">{merchantUPI}</p>
                      {qrType === "dynamic" && (
                        <>
                          <p className="font-semibold text-2xl text-primary">₹{amount}</p>
                          {description && <p className="text-sm text-muted-foreground">{description}</p>}
                        </>
                      )}
                      {qrType === "static" && (
                        <p className="text-sm font-medium text-muted-foreground">
                          Scan & Pay Any Amount
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 w-full">
                    <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                      <p className="text-muted-foreground text-sm">QR Code will appear here</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enter amount and generate QR code
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
