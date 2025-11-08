import { Currency, CurrencyRates, FeePrediction, FraudAlert, Route } from './types'

export const CURRENCY_RATES: CurrencyRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  BDT: 1.44 // 1 INR = 1.44 BDT
}

export const PAYMENT_ROUTES: Route[] = [
  { name: "Visa Card", fee: 2.9, time: "5s", risk: "Medium", cashback: 1.5 },
  { name: "Paytm UPI", fee: 1.8, time: "3s", risk: "Low", cashback: 0.5 },
  { name: "Bank Transfer", fee: 0.5, time: "10s", risk: "Low", cashback: 0 },
  { name: "Polygon Crypto", fee: 0.05, time: "1s", risk: "Low", cashback: 0.1 },
  { name: "UPI Direct", fee: 0.0, time: "1s", risk: "Low", cashback: 2.0 }
]

export const runFraudDetection = (amount: number): FraudAlert => {
  const hour = new Date().getHours()
  
  let riskScore = 0
  const reasons: string[] = []

  if (amount > 10000) {
    riskScore += 30
    reasons.push("Large transaction amount")
  }
  if (hour >= 23 || hour <= 5) {
    riskScore += 20
    reasons.push("Unusual transaction time")
  }
  
  const randomFactor = Math.random() * 30
  riskScore += randomFactor

  const risk: 'low' | 'medium' | 'high' = 
    riskScore < 30 ? 'low' : riskScore < 60 ? 'medium' : 'high'

  return { risk, score: Math.round(riskScore), reasons }
}

export const predictOptimalFee = (amount: number): FeePrediction => {
  const currentHour = new Date().getHours()
  const offPeakHours = [2, 3, 4, 5, 14, 15]
  const isOffPeak = offPeakHours.includes(currentHour)
  
  const currentFee = 1.8
  const bestTimeFee = isOffPeak ? currentFee * 0.7 : currentFee * 0.5
  const bestTime = isOffPeak ? "Now" : "2:00 AM - 5:00 AM"
  const savings = ((currentFee - bestTimeFee) / 100) * amount

  return {
    currentFee,
    bestTimeFee,
    bestTime,
    savings: Math.abs(savings)
  }
}

export const generateQRCode = (merchant: string, amount: number): string => {
  const qrData = `upi://pay?pa=raju@upi&pn=${encodeURIComponent(merchant)}&am=${amount}&cu=INR&tn=Payment`
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`
}

export const calculateSplit = (amount: number, splitCount: number): string => {
  return (amount / splitCount).toFixed(2)
}

export const convertCurrency = (amount: number, toCurrency: Currency): string => {
  return (amount * CURRENCY_RATES[toCurrency]).toFixed(2)
}

export const getBestCashbackRoute = (routes: Route[]): Route => {
  return routes.reduce((best, current) => {
    const currentNet = (current.cashback || 0) - current.fee
    const bestNet = (best.cashback || 0) - best.fee
    return currentNet > bestNet ? current : best
  })
}

export const getCurrencySymbol = (currency: Currency): string => {
  const symbols: Record<Currency, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    BDT: '৳'
  }
  return symbols[currency]
}
