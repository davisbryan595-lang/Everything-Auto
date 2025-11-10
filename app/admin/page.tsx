"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminAppointmentManager } from "@/components/admin/admin-appointment-manager"
import { useBookingStore } from "@/lib/store"
import { Calendar, BarChart3, Users, TrendingUp } from "lucide-react"
import { formatDateForStorage } from "@/lib/availability"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { appointments } = useBookingStore()

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

  const stats = useMemo(() => {
    const today = formatDateForStorage(new Date())
    const todayAppointments = appointments.filter((apt) => apt.date === today && apt.status !== "cancelled")

    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)

    const thisWeekAppointments = appointments.filter((apt) => {
      const aptDate = new Date(apt.date)
      return aptDate >= weekStart && aptDate <= weekEnd && apt.status !== "cancelled"
    })

    const totalClients = new Set(appointments.map((apt) => apt.clientName)).size
    const confirmedAppointments = appointments.filter((apt) => apt.status === "confirmed").length
    const totalAppointments = appointments.filter((apt) => apt.status !== "cancelled").length
    const completionRate = totalAppointments > 0 ? Math.round((confirmedAppointments / totalAppointments) * 100) : 0

    const totalRevenue = appointments
      .filter((apt) => apt.status !== "cancelled")
      .reduce((acc, apt) => acc + apt.totalPrice, 0)

    return {
      todayCount: todayAppointments.length,
      weekCount: thisWeekAppointments.length,
      totalClients,
      completionRate,
      weekRevenue: totalRevenue,
    }
  }, [appointments])

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
              <p className="text-muted-foreground mt-2">Manage appointments and view analytics</p>
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
              { icon: Calendar, label: "Today's Appointments", value: stats.todayCount, color: "from-primary to-primary/80" },
              { icon: TrendingUp, label: "This Week", value: stats.weekCount, color: "from-secondary to-secondary/80" },
              { icon: Users, label: "Total Clients", value: stats.totalClients, color: "from-blue-500 to-blue-600" },
              { icon: BarChart3, label: "Completion Rate", value: `${stats.completionRate}%`, color: "from-green-500 to-green-600" },
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

          {/* Appointment Manager */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AdminAppointmentManager />
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
