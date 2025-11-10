"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useBookingStore } from "@/lib/store"
import { ChevronLeft, ChevronRight } from "lucide-react"

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

export function Step2DateTime() {
  const { selectedDate, selectedTime, setDate, setTime } = useBookingStore()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setDate(newDate)
  }

  const days = Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => i + 1)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const isDateValid = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    )
  }

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
              const valid = isDateValid(date)
              const selected = isDateSelected(day)
              const isWeekend = date.getDay() === 0 || date.getDay() === 6

              return (
                <motion.button
                  key={day}
                  onClick={() => valid && handleDateClick(day)}
                  disabled={!valid}
                  whileHover={valid ? { scale: 1.1 } : {}}
                  whileTap={valid ? { scale: 0.95 } : {}}
                  className={`p-2 rounded text-sm font-medium transition-all ${
                    selected
                      ? "bg-secondary text-white"
                      : valid
                        ? `${isWeekend ? "bg-muted" : "bg-card"} hover:bg-primary/10`
                        : "opacity-30 cursor-not-allowed"
                  }`}
                >
                  {day}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h3 className="font-bold text-foreground">Select Time (Mon-Sat, 8AM-6PM)</h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {timeSlots.map((time) => (
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
        </motion.div>
      )}
    </div>
  )
}
