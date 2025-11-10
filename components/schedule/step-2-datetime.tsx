"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useBookingStore } from "@/lib/store"
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"
import {
  getAvailableTimeSlots,
  formatDateForStorage,
  isDateDisabled,
} from "@/lib/availability"

export function Step2DateTime() {
  const { selectedDate, selectedTime, selectedServices, setDate, setTime, appointments } = useBookingStore()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const totalDuration = useMemo(() => {
    return selectedServices.reduce((acc, s) => acc + s.duration, 0)
  }, [selectedServices])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setDate(newDate)
    setTime("")
  }

  const days = Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => i + 1)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    )
  }

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return []
    const dateStr = formatDateForStorage(selectedDate)
    return getAvailableTimeSlots(dateStr, totalDuration, appointments)
  }, [selectedDate, totalDuration, appointments])

  const hasAvailableSlots = availableTimeSlots.length > 0

  return (
    <div className="space-y-8">
      {/* Calendar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">Select Date</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold min-w-[150px] text-center">
              {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-2">
            {emptyDays.map((i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map((day) => {
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
              const disabled = isDateDisabled(date)
              const selected = isDateSelected(day)

              return (
                <motion.button
                  key={day}
                  onClick={() => !disabled && handleDateClick(day)}
                  disabled={disabled}
                  whileHover={!disabled ? { scale: 1.1 } : {}}
                  whileTap={!disabled ? { scale: 0.95 } : {}}
                  className={`p-2 rounded text-sm font-medium transition-all ${
                    selected
                      ? "bg-secondary text-white"
                      : disabled
                        ? "bg-muted opacity-30 cursor-not-allowed"
                        : "bg-card hover:bg-primary/10"
                  }`}
                >
                  {day}
                </motion.button>
              )
            })}
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Sundays are closed. Bookings available Mon-Sat, 8AM-6PM
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div>
            <h3 className="font-bold text-foreground">Select Time</h3>
            <p className="text-sm text-muted-foreground">
              Need {totalDuration} hour{totalDuration !== 1 ? "s" : ""} for your services
            </p>
          </div>

          {!hasAvailableSlots ? (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900">No availability</p>
                <p className="text-sm text-amber-800 mt-1">
                  There are no {totalDuration}-hour blocks available on this date. Please choose another date.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {availableTimeSlots.map((time) => (
                <motion.button
                  key={time}
                  onClick={() => setTime(time)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg font-semibold transition-all ${
                    selectedTime === time
                      ? "bg-secondary text-white shadow-lg"
                      : "bg-card border border-border hover:border-secondary"
                  }`}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
