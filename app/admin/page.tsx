"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdminLogin } from "@/components/admin/admin-login"
import { BookingsCalendar } from "@/components/admin/bookings-calendar"
import { BookingsTable } from "@/components/admin/bookings-table"
import { Calendar, BarChart3, Users, TrendingUp } from "lucide-react"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isAuth = localStorage.getItem("adminAuth") === "true"
    setIsAuthenticated(isAuth)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
  }

  if (!mounted) return null

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">Manage bookings and view analytics</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all"
            >
              Logout
            </button>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Calendar, label: "Today's Bookings", value: "2", color: "from-primary to-primary/80" },
              { icon: TrendingUp, label: "This Week", value: "12", color: "from-secondary to-secondary/80" },
              { icon: Users, label: "Total Clients", value: "487", color: "from-blue-500 to-blue-600" },
              { icon: BarChart3, label: "Completion Rate", value: "96%", color: "from-green-500 to-green-600" },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${stat.color} text-white rounded-lg p-6 shadow-lg`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-8 h-8 opacity-80" />
                  </div>
                  <p className="text-sm opacity-90">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <BookingsCalendar />
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border border-border rounded-lg p-6 h-fit"
            >
              <h3 className="font-bold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="bg-background rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Pending Approvals</p>
                  <p className="text-2xl font-bold text-secondary">3</p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Confirmed Today</p>
                  <p className="text-2xl font-bold text-primary">8</p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Revenue This Week</p>
                  <p className="text-2xl font-bold text-green-600">$2,450</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bookings Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <BookingsTable />
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
