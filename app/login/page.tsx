"use client"

import type React from "react"

import { useAuth } from "@/app/providers"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Mail, Smartphone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [step, setStep] = useState<"contact" | "otp">("contact")
  const [contactType, setContactType] = useState<"email" | "phone">("email")
  const [contact, setContact] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validate contact
    if (contactType === "email" && !contact.includes("@")) {
      setError("Please enter a valid email")
      setLoading(false)
      return
    }
    if (contactType === "phone" && contact.length < 10) {
      setError("Please enter a valid phone number")
      setLoading(false)
      return
    }

    // Simulate OTP sending
    setTimeout(() => {
      setStep("otp")
      setLoading(false)
    }, 1000)
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate OTP verification
    if (otp.length === 6) {
      setTimeout(() => {
        // Call login function from auth context
        const businessName = contact.split("@")[0] || contact
        login(contact, businessName)
        
        // Redirect to dashboard after successful login
        router.push("/dashboard")
      }, 1000)
    } else {
      setError("Please enter a valid 6-digit OTP")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          <Card className="p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Sign In to SPRN</h1>
              <p className="text-muted-foreground">
                {step === "contact" ? "Choose how you want to receive OTP" : "Verify with OTP"}
              </p>
            </div>

            {step === "contact" ? (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setContactType("email")
                      setContact("")
                    }}
                    className={`p-4 border rounded-lg text-center transition ${
                      contactType === "email" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Mail className="w-5 h-5 mx-auto mb-2" />
                    <p className="text-sm font-medium">Email</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setContactType("phone")
                      setContact("")
                    }}
                    className={`p-4 border rounded-lg text-center transition ${
                      contactType === "phone" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mx-auto mb-2" />
                    <p className="text-sm font-medium">Phone</p>
                  </button>
                </div>

                {/* Email or Phone Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {contactType === "email" ? "Email Address" : "Phone Number"}
                  </label>
                  <input
                    type={contactType === "email" ? "email" : "tel"}
                    value={contact}
                    onChange={(e) => {
                      if (contactType === "phone") {
                        setContact(e.target.value.replace(/\D/g, "").slice(0, 10))
                      } else {
                        setContact(e.target.value)
                      }
                    }}
                    placeholder={contactType === "email" ? "merchant@example.com" : "9876543210"}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                    required
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" className="w-full gap-2" disabled={loading || !contact}>
                  {loading ? "Sending OTP..." : "Send OTP"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                  <p className="text-sm text-foreground">
                    We sent a 6-digit code to{" "}
                    <strong>
                      {contactType === "email" ? contact : `+91-${contact.replace(/(\d{5})(\d{5})/, "$1 $2")}`}
                    </strong>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">OTP Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground text-center text-2xl tracking-widest font-mono"
                    required
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("contact")
                    setOtp("")
                  }}
                  className="w-full text-sm text-primary hover:underline"
                >
                  Back to {contactType}
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
