"use client"

import type React from "react"

import { useAuth } from "@/app/providers"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Mail, Smartphone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignupPage() {
  const [step, setStep] = useState<"contact" | "business" | "otp">("contact")
  const [contactType, setContactType] = useState<"email" | "phone">("email")
  const [contact, setContact] = useState("")
  const [businessData, setBusinessData] = useState({
    businessName: "",
    businessType: "",
    monthlyRevenue: "",
    location: "",
    ownerName: "",
    gstin: "",
  })
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

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

    setTimeout(() => {
      setStep("business")
      setLoading(false)
    }, 1000)
  }

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!businessData.businessName || !businessData.businessType || !businessData.monthlyRevenue) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    setTimeout(() => {
      setStep("otp")
      setLoading(false)
    }, 1000)
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (otp.length === 6) {
      setTimeout(() => {
        // Call login function from auth context with business data
        login(contact, businessData.businessName)
        
        // Redirect to dashboard after successful signup
        router.push("/dashboard")
      }, 1000)
    } else {
      setError("Please enter a valid 6-digit OTP")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors duration-300">
      <Navigation />

      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-2xl">
          <Card className="p-8 animate-scale-in">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className={`flex items-center ${step === "contact" ? "text-primary" : "text-muted-foreground"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "contact" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    1
                  </div>
                  <span className="ml-2 text-sm font-medium">Contact</span>
                </div>
                <div className={`h-1 flex-1 mx-2 ${step !== "contact" ? "bg-primary" : "bg-muted"}`} />

                <div className={`flex items-center ${step === "business" ? "text-primary" : "text-muted-foreground"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "business" ? "bg-primary text-primary-foreground" : step !== "contact" ? "bg-accent" : "bg-muted"}`}
                  >
                    {step === "otp" ? <CheckCircle2 className="w-5 h-5" /> : "2"}
                  </div>
                  <span className="ml-2 text-sm font-medium">Business</span>
                </div>
                <div className={`h-1 flex-1 mx-2 ${step === "otp" ? "bg-primary" : "bg-muted"}`} />

                <div className={`flex items-center ${step === "otp" ? "text-primary" : "text-muted-foreground"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "otp" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    3
                  </div>
                  <span className="ml-2 text-sm font-medium">Verify</span>
                </div>
              </div>
            </div>

            {step === "contact" && (
              <div className="animate-slide-in-up">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold mb-2">Create Merchant Account</h1>
                  <p className="text-muted-foreground">Choose how you want to receive OTP</p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => {
                        setContactType("email")
                        setContact("")
                      }}
                      className={`p-4 border rounded-lg text-center transition ${
                        contactType === "email"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50"
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
                        contactType === "phone"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto mb-2" />
                      <p className="text-sm font-medium">Phone</p>
                    </button>
                  </div>

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
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground transition focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  {error && <p className="text-sm text-destructive animate-slide-in-down">{error}</p>}

                  <Button type="submit" className="w-full gap-2" disabled={loading || !contact}>
                    {loading ? "Sending OTP..." : "Continue"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            )}

            {step === "business" && (
              <div className="animate-slide-in-up">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold mb-2">Business Information</h1>
                  <p className="text-muted-foreground">Tell us about your business to personalize your experience</p>
                </div>

                <form onSubmit={handleBusinessSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Name *</label>
                    <input
                      type="text"
                      value={businessData.businessName}
                      onChange={(e) => setBusinessData({ ...businessData, businessName: e.target.value })}
                      placeholder="Your Shop Name"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground transition focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Business Type *</label>
                    <select
                      value={businessData.businessType}
                      onChange={(e) => setBusinessData({ ...businessData, businessType: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground transition focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Select business type</option>
                      <option value="retail">Retail Shop</option>
                      <option value="restaurant">Restaurant/Cafe</option>
                      <option value="services">Services</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Revenue *</label>
                    <select
                      value={businessData.monthlyRevenue}
                      onChange={(e) => setBusinessData({ ...businessData, monthlyRevenue: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground transition focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Select monthly revenue</option>
                      <option value="0-50k">₹0 - ₹50,000</option>
                      <option value="50k-5l">₹50,000 - ₹5,00,000</option>
                      <option value="5l-1cr">₹5,00,000 - ₹1,00,00,000</option>
                      <option value="1cr+">₹1,00,00,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={businessData.location}
                      onChange={(e) => setBusinessData({ ...businessData, location: e.target.value })}
                      placeholder="City, State"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground transition focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Owner Name</label>
                    <input
                      type="text"
                      value={businessData.ownerName}
                      onChange={(e) => setBusinessData({ ...businessData, ownerName: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground transition focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">GSTIN (Optional)</label>
                    <input
                      type="text"
                      value={businessData.gstin}
                      onChange={(e) => setBusinessData({ ...businessData, gstin: e.target.value })}
                      placeholder="Your GSTIN"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground transition focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {error && <p className="text-sm text-destructive animate-slide-in-down">{error}</p>}

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep("contact")} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 gap-2" disabled={loading}>
                      {loading ? "Processing..." : "Continue"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {step === "otp" && (
              <div className="animate-slide-in-up">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold mb-2">Verify Your Account</h1>
                  <p className="text-muted-foreground">Enter the 6-digit code we sent to verify your account</p>
                </div>

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
                      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground text-center text-2xl tracking-widest font-mono transition focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  {error && <p className="text-sm text-destructive animate-slide-in-down">{error}</p>}

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
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Sign in
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
