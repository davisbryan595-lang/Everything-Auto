"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useBookingStore } from "@/lib/store"
import { CheckCircle2, Calendar, Clock, User, Car } from "lucide-react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import { formatDateForStorage, calculateEndTime } from "@/lib/availability"

export function Step4Confirmation() {
  const {
    selectedServices,
    selectedDate,
    selectedTime,
    clientName,
    clientPhone,
    vehicleMake,
    vehicleModel,
    notes,
    createAppointment,
    resetBooking,
  } = useBookingStore()
  const { width, height } = useWindowSize()
  const [bookingId, setBookingId] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const id = Math.random().toString(36).substr(2, 9).toUpperCase()
    setBookingId(id)

    if (!saved && selectedDate && selectedTime) {
      const totalDuration = selectedServices.reduce((acc, s) => acc + s.duration, 0)
      const endTime = calculateEndTime(selectedTime, totalDuration)
      const dateStr = formatDateForStorage(selectedDate)

      const appointment = {
        id,
        date: dateStr,
        time: selectedTime,
        endTime,
        serviceIds: selectedServices.map((s) => s.id),
        serviceNames: selectedServices.map((s) => s.name),
        clientName,
        clientPhone,
        vehicleMake,
        vehicleModel,
        notes,
        status: "confirmed" as const,
        totalDuration,
        totalPrice: selectedServices.reduce((acc, s) => acc + s.price, 0),
        createdAt: new Date().toISOString(),
      }

      createAppointment(appointment)
      setSaved(true)
    }
  }, [selectedDate, selectedTime, clientName])

  const totalPrice = selectedServices.reduce((acc, s) => acc + s.price, 0)
  const totalDuration = selectedServices.reduce((acc, s) => acc + s.duration, 0)

  const handleNewBooking = () => {
    resetBooking()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="space-y-6"
    >
      <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />

      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="flex justify-center mb-4"
        >
          <CheckCircle2 className="w-16 h-16 text-secondary" />
        </motion.div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground">Your appointment has been successfully scheduled</p>
      </div>

      {/* Booking Details Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-lg p-6 space-y-4"
      >
        <div className="text-center pb-4 border-b border-white/20">
          <p className="text-sm opacity-90">Booking Reference</p>
          <p className="text-2xl font-bold tracking-wider">{bookingId}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs opacity-75">Date</p>
              <p className="font-semibold">{selectedDate?.toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs opacity-75">Time</p>
              <p className="font-semibold">{selectedTime}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs opacity-75">Client</p>
              <p className="font-semibold">{clientName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Car className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs opacity-75">Vehicle</p>
              <p className="font-semibold">
                {vehicleMake} {vehicleModel}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-lg p-6 space-y-4"
      >
        <h3 className="font-bold text-foreground">Services</h3>
        {selectedServices.map((service) => (
          <div key={service.id} className="flex justify-between items-center pb-3 border-b border-border last:border-0">
            <div>
              <p className="font-medium text-foreground">{service.name}</p>
              <p className="text-sm text-muted-foreground">{service.duration}h</p>
            </div>
            <p className="font-semibold text-secondary">${service.price}</p>
          </div>
        ))}

        <div className="pt-4 border-t border-border flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Total Duration</p>
            <p className="font-bold text-foreground">{totalDuration} hours</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Price</p>
            <p className="text-2xl font-bold text-secondary">${totalPrice}</p>
          </div>
        </div>
      </motion.div>

      <div className="bg-secondary/10 border border-secondary rounded-lg p-4 text-center">
        <p className="text-sm text-foreground">
          A confirmation email will be sent to you shortly. You can also call us at{" "}
          <span className="font-semibold">425-346-8851</span> to reschedule if needed.
        </p>
      </div>

      <motion.button
        onClick={handleNewBooking}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all"
      >
        Make Another Booking
      </motion.button>
    </motion.div>
  )
}
