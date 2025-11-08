"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap, Bell, Settings } from "lucide-react"

export default function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Zap className="w-6 h-6 text-primary" />
          SPRN
        </Link>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-muted rounded-lg transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>
          <Link href="/dashboard/settings">
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
