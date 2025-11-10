"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface Booking {
  id: string
  date: Date
  time: string
  service: string
  clientName: string
  clientPhone: string
  status: "confirmed" | "pending" | "cancelled"
  duration: number
}

const mockBookings: Booking[] = [
  {
    id: "1",
    date: new Date(2025, 11, 20),
    time: "10:00",
    service: "Power Steering Flush",
    clientName: "John Martinez",
    clientPhone: "(555) 123-4567",
    status: "confirmed",
    duration: 2,
  },
  {
    id: "2",
    date: new Date(2025, 11, 20),
    time: "13:00",
    service: "Oil Change",
    clientName: "Sarah Johnson",
    clientPhone: "(555) 234-5678",
    status: "confirmed",
    duration: 2,
  },
  {
    id: "3",
    date: new Date(2025, 11, 21),
    time: "14:00",
    service: "Spark Plugs",
    clientName: "Michael Chen",
    clientPhone: "(555) 345-6789",
    status: "pending",
    duration: 3,
  },
]

export function BookingsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const days = Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => i + 1)
  const firstDay = getFirstDayOfMonth(currentDate)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const getBookingsForDate = (date: Date) => {
    return mockBookings.filter(
      (b) =>
        b.date.getDate() === date.getDate() &&
        b.date.getMonth() === date.getMonth() &&
        b.date.getFullYear() === date.getFullYear(),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-foreground">Bookings Calendar</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold min-w-[150px] text-center">
              {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
              {day}
            </div>
          ))}

          {emptyDays.map((i) => (
            <div key={`empty-${i}`} />
          ))}

          {days.map((day) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            const dayBookings = getBookingsForDate(date)
            const isSelected = selectedDate?.toDateString() === date.toDateString()

            return (
              <motion.button
                key={day}
                onClick={() => setSelectedDate(date)}
                whileHover={{ scale: 1.05 }}
                className={`p-2 rounded text-sm font-medium transition-all relative ${
                  isSelected
                    ? "bg-secondary text-white"
                    : dayBookings.length > 0
                      ? "bg-secondary/20 border border-secondary"
                      : "bg-muted hover:bg-muted/80"
                }`}
              >
                <div>{day}</div>
                {dayBookings.length > 0 && (
                  <div className="text-xs mt-1">
                    {dayBookings.length} booking{dayBookings.length > 1 ? "s" : ""}
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Day Bookings */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">Bookings for {selectedDate.toLocaleDateString()}</h3>
            <button onClick={() => setSelectedDate(null)} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {getBookingsForDate(selectedDate).length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No bookings for this date</p>
            ) : (
              getBookingsForDate(selectedDate).map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-foreground">{booking.time}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(booking.status)}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                      <p className="text-sm font-medium text-foreground mt-2">{booking.clientName}</p>
                      <p className="text-xs text-muted-foreground">{booking.clientPhone}</p>
                    </div>
                    <button
                      onClick={() => setEditingId(editingId === booking.id ? null : booking.id)}
                      className="px-3 py-1 bg-secondary/20 text-secondary rounded text-xs font-semibold hover:bg-secondary/30 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
