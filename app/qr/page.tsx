"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, Copy, Check } from "lucide-react"
import QRCode from  "qrcode"

export default function QRPage() {
  const [qrCode, setQrCode] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const merchantId = "raju123"
  const paymentLink = `sprn.in/pay/${merchantId}`

  const generateQR = async () => {
    const url = `${window.location.origin}/pay/${merchantId}`
    const dataUrl = await QRCode.toDataURL(url)
    setQrCode(dataUrl)
  }

  const downloadQR = () => {
    if (!qrCode) return
    const link = document.createElement("a")
    link.href = qrCode
    link.download = "sprn-payment-qr.png"
    link.click()
  }

  const copyLink = () => {
    navigator.clipboard.writeText(paymentLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border px-4 py-4">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm hover:text-primary">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-2">Generate QR Code</h1>
          <p className="text-muted-foreground mb-8">Print and display this QR at your shop for instant payments</p>

          <div className="space-y-6">
            {/* Generate button */}
            {!qrCode && (
              <Button onClick={generateQR} size="lg" className="w-full">
                Generate QR Code
              </Button>
            )}

            {/* QR Display */}
            {qrCode && (
              <div className="space-y-6">
                <div className="flex justify-center p-8 bg-white rounded-lg">
                  <img src={qrCode || "/placeholder.svg"} alt="Payment QR Code" className="w-64 h-64" />
                </div>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={paymentLink}
                      readOnly
                      className="flex-1 px-4 py-2 border border-border rounded-lg bg-card text-foreground text-sm"
                    />
                    <Button variant="outline" size="icon" onClick={copyLink}>
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>

                  <Button onClick={downloadQR} className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Download QR Code
                  </Button>

                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setQrCode("")}>
                    Generate New QR
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
