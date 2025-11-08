"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  email: string
  businessName: string
  balance: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, businessName: string) => void
  logout: () => void
  updateBalance: (amount: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, businessName: string) => {
    setUser({
      id: Date.now().toString(),
      email,
      businessName,
      balance: 45230,
    })
  }

  const logout = () => {
    setUser(null)
  }

  const updateBalance = (amount: number) => {
    if (user) {
      setUser({ ...user, balance: user.balance + amount })
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateBalance,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
