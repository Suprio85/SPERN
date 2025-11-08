export interface Route {
  name: string
  fee: number
  time: string
  risk: string
  cashback?: number
}

export interface PaymentData {
  merchant: string
  amount: number
  timestamp: string
}

export interface FraudAlert {
  risk: 'low' | 'medium' | 'high'
  score: number
  reasons: string[]
}

export interface FeePrediction {
  currentFee: number
  bestTimeFee: number
  bestTime: string
  savings: number
}

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'BDT'

export interface CurrencyRates {
  INR: number
  USD: number
  EUR: number
  GBP: number
  BDT: number
}
