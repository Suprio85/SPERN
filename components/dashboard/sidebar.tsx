"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Zap, BarChart3, QrCode, Settings, X } from "lucide-react"

interface SidebarProps {
  open?: boolean
  onClose?: () => void
}

export default function Sidebar({ open = true, onClose }: SidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { label: "Dashboard", icon: BarChart3, href: "/dashboard" },
    { label: "QR Codes", icon: QrCode, href: "/qr" },
    { label: "Settings", icon: Settings, href: "/settings" },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
        fixed md:relative
        w-64 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border
        z-30 transition-transform
        md:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Zap className="w-6 h-6" />
            SPRN
          </Link>
          <button onClick={onClose} className="md:hidden p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-lg transition
                  ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent text-sidebar-foreground"
                  }
                `}
                onClick={onClose}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
