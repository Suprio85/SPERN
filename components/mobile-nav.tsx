"use client"

import { useAuth } from "@/app/providers"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, User, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    setOpen(false)
    router.push("/")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        className="w-10 h-10 p-0 hover:bg-purple-50 dark:hover:bg-purple-900/20"
        aria-label="Toggle menu"
      >
        {open ? (
          <X className="w-5 h-5 text-slate-700 dark:text-slate-200" />
        ) : (
          <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
        )}
      </Button>

      {open && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="fixed top-16 left-0 right-0 bg-white dark:bg-slate-950 border-b border-purple-200 dark:border-purple-900 shadow-lg z-50 animate-slide-in-down">
            <nav className="flex flex-col p-4 space-y-1 max-w-7xl mx-auto">
              {/* User Profile Section (if authenticated) */}
              {isAuthenticated && user && (
                <div className="mb-4 pb-4 border-b border-purple-200 dark:border-purple-900">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Avatar className="h-12 w-12 border-2 border-purple-600">
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-violet-600 text-white font-semibold">
                        {getInitials(user.businessName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {user.businessName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Link 
                href="/" 
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all"
              >
                Home
              </Link>
              <Link 
                href="/dashboard" 
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all"
              >
                Dashboard
              </Link>
              <Link 
                href="/explorer" 
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all"
              >
                Explorer
              </Link>
              <Link 
                href="#" 
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all"
              >
                Pricing
              </Link>
              
              <div className="pt-4 border-t border-purple-200 dark:border-purple-900 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link 
                      href="/dashboard" 
                      onClick={() => setOpen(false)}
                      className="block"
                    >
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                      >
                        <User className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      onClick={() => setOpen(false)}
                      className="block"
                    >
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link 
                      href="/signup" 
                      onClick={() => setOpen(false)}
                      className="block"
                    >
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-md"
                      >
                        Join Free
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
