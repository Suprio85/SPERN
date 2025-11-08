"use client"

import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, ChartBar, CheckCircle2, Lock, Shield, Sparkles, TrendingDown, Users, Zap } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function HomePage() {
  const [dailySales, setDailySales] = useState(5000)
  const yearlySavings = dailySales * 365 * 0.02

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Navigation />

      {/* Hero Section - Modern with floating elements */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-40">
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-cyan-500/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-400/20 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 backdrop-blur-sm border border-violet-500/20 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                  Save up to 3% on every payment
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                  Smart Payment
                </span>
                <br />
                <span className="text-slate-900 dark:text-white">
                  Routing for
                </span>
                <br />
                <span className="text-slate-900 dark:text-white">
                  Every Merchant
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                AI-powered routing + blockchain transparency = instant settlements with{" "}
                <span className="font-semibold text-slate-900 dark:text-white">zero hidden fees</span>. 
                From 2-4% down to under 1%.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/signup">
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all duration-300">
                    Join Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/pay">
                  <Button size="lg" variant="outline" className="gap-2 border-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                    Pay with SPRN
                    <Zap className="w-5 h-5" />
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { value: "50+", label: "Payment Routes" },
                  { value: "<1s", label: "Processing Time" },
                  { value: "0.5%", label: "Average Fee" },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden md:block relative">
              <div className="relative w-full aspect-square">
                {/* Glassmorphic cards floating */}
                <div className="absolute top-0 right-0 w-64 h-40 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 animate-float">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">AI Routing</div>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">Processing payment...</div>
                  <div className="mt-3 h-2 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-56 h-36 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-5 animate-float-delayed">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">Blockchain Verified</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mb-2">Transaction secured</div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">Verified</span>
                  </div>
                </div>

                {/* Center glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-400 rounded-full blur-3xl opacity-30 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Modern Cards */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-full text-sm font-medium mb-6">
              <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-red-600 dark:text-red-400">The Problem</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Merchants Are Bleeding Money
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Small merchants lose thousands annually to hidden fees and lack of transparency
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="relative p-8 border-2 border-red-500/20 bg-gradient-to-br from-red-500/5 to-red-600/5 backdrop-blur-sm hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full blur-3xl group-hover:blur-2xl transition-all" />
              <div className="relative flex gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <TrendingDown className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl mb-3 text-slate-900 dark:text-white">Excessive Fees</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Card networks, PSPs, and banks charge 2-4% per transaction, making micro-transactions unprofitable and eating into margins.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="relative p-8 border-2 border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-orange-600/5 backdrop-blur-sm hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full blur-3xl group-hover:blur-2xl transition-all" />
              <div className="relative flex gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl mb-3 text-slate-900 dark:text-white">Zero Transparency</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Merchants don't know who took what fee. No audit trail. Zero visibility. Just money disappearing.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Big impact card */}
          <Card className="relative overflow-hidden p-12 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 border-0 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-full blur-3xl" />
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
              </div>
              <p className="text-6xl md:text-7xl font-black mb-4">
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  ₹66,600
                </span>
              </p>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Annual loss for a chaiwala with ₹5,000 daily sales at 2.2% fee
              </p>
              <p className="text-sm text-slate-400 mt-2">That's real money. Real impact.</p>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works - Interactive Cards */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-cyan-500/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 backdrop-blur-sm border border-violet-500/20 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span className="text-violet-600 dark:text-violet-400">How It Works</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Three Steps to Savings
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our AI-powered system works automatically to find you the best rates
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Scan Routes",
                description: "AI engine scans 50+ payment routes (UPI, cards, wallets, crypto) in under 1 second",
                icon: ChartBar,
                color: "from-violet-500 to-purple-600",
                bgColor: "from-violet-500/10 to-purple-500/10",
                borderColor: "border-violet-500/20",
              },
              {
                step: 2,
                title: "AI Routes",
                description: "Reinforcement learning picks the cheapest, fastest, safest path every single time",
                icon: Zap,
                color: "from-fuchsia-500 to-pink-600",
                bgColor: "from-fuchsia-500/10 to-pink-500/10",
                borderColor: "border-fuchsia-500/20",
              },
              {
                step: 3,
                title: "Blockchain Records",
                description: "Every transaction recorded immutably with smart contract enforcement and transparency",
                icon: Shield,
                color: "from-cyan-500 to-blue-600",
                bgColor: "from-cyan-500/10 to-blue-500/10",
                borderColor: "border-cyan-500/20",
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <Card 
                  key={item.step} 
                  className={`relative p-8 border-2 ${item.borderColor} bg-gradient-to-br ${item.bgColor} backdrop-blur-sm hover:scale-105 hover:shadow-2xl transition-all duration-300 group overflow-hidden`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.bgColor} rounded-full blur-2xl group-hover:blur-xl transition-all`} />
                  
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${item.color} text-white font-bold text-sm mb-4`}>
                      {item.step}
                    </div>
                    
                    <h3 className="font-bold text-2xl mb-3 text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Savings Calculator - Interactive & Modern */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
        
        <div className="relative max-w-4xl mx-auto px-4 md:px-6">
          <Card className="relative overflow-hidden p-10 md:p-12 border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 backdrop-blur-sm shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-full text-sm font-medium mb-6">
                  <ChartBar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Savings Calculator</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white">
                  Calculate Your Savings
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  See how much you could save with SPRN
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-slate-900 dark:text-white">
                    Your Daily Sales (₹)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={dailySales}
                      onChange={(e) => setDailySales(Number(e.target.value))}
                      className="w-full px-6 py-4 border-2 border-emerald-500/20 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-900 dark:text-white text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      placeholder="5000"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">₹</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-red-500/10 border-2 border-red-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Current Fee (2.2%)</p>
                    </div>
                    <p className="text-4xl font-black text-red-600 dark:text-red-400">
                      ₹{(dailySales * 0.022 * 365).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">per year</p>
                  </div>
                  
                  <div className="p-6 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">SPRN Fee (0.5%)</p>
                    </div>
                    <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
                      ₹{(dailySales * 0.005 * 365).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">per year</p>
                  </div>
                </div>

                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
                  <div className="relative text-center text-white">
                    <p className="text-sm font-semibold mb-2 opacity-90">💰 Your Annual Savings</p>
                    <p className="text-5xl md:text-6xl font-black mb-2">
                      ₹{yearlySavings.toLocaleString()}
                    </p>
                    <p className="text-sm opacity-90">That's {((yearlySavings / (dailySales * 365 * 0.022)) * 100).toFixed(0)}% more profit in your pocket!</p>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Link href="/signup">
                    <Button size="lg" className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg">
                      Start Saving Today
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials - Modern & Social Proof */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Trusted by Merchants
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Real stories from real merchants saving real money
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Raju", 
                role: "Chaiwala, Mumbai", 
                quote: "SPRN saves me ₹180 daily. That's my ingredient money! Now I can afford better quality tea leaves.",
                avatar: "R",
                color: "from-orange-500 to-red-600"
              },
              {
                name: "Priya",
                role: "Freelance Designer",
                quote: "Finally, I know exactly where my fees go. No more surprises. Complete transparency is game-changing!",
                avatar: "P",
                color: "from-violet-500 to-purple-600"
              },
              {
                name: "Amit",
                role: "Small Shop Owner",
                quote: "Blockchain proof means my customers trust me more. Win-win for everyone involved in the transaction.",
                avatar: "A",
                color: "from-cyan-500 to-blue-600"
              },
            ].map((testimonial, idx) => (
              <Card 
                key={testimonial.name} 
                className="relative p-8 border-2 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-full blur-2xl group-hover:blur-xl transition-all" />
                
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-slate-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(star => (
                        <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-slate-700 dark:text-slate-200 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="mt-6 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">Verified User</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Social proof banner */}
          <div className="mt-16 text-center">
            <Card className="inline-block p-6 border-2 border-violet-500/20 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">10,000+</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Active Merchants</p>
                </div>
                <div className="w-px h-12 bg-slate-300 dark:bg-slate-600" />
                <div className="text-center">
                  <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">₹50Cr+</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Processed Monthly</p>
                </div>
                <div className="w-px h-12 bg-slate-300 dark:bg-slate-600" />
                <div className="text-center">
                  <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">4.9/5</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">User Rating</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
