"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useBookingStore } from "@/lib/store"
import { Step1Services } from "@/components/schedule/step-1-services"
import { Step2DateTime } from "@/components/schedule/step-2-datetime"
import { Step3Details } from "@/components/schedule/step-3-details"
import { Step4Confirmation } from "@/components/schedule/step-4-confirmation"
import { ChevronLeft, ChevronRight } from "lucide-react"

const steps = [
  { number: 1, title: "Select Services", description: "Choose the services you need" },
  { number: 2, title: "Pick Date & Time", description: "Schedule your appointment" },
  { number: 3, title: "Your Details", description: "Contact and vehicle information" },
  { number: 4, title: "Confirmation", description: "Review and confirm booking" },
]

export default function SchedulePage() {
  const {
    step,
    nextStep,
    prevStep,
    selectedServices,
    selectedDate,
    selectedTime,
    clientName,
    clientPhone,
    vehicleMake,
    vehicleModel,
    resetBooking,
  } = useBookingStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedServices.length > 0
      case 2:
        return selectedDate && selectedTime
      case 3:
        return clientName && clientPhone && vehicleMake && vehicleModel
      case 4:
        return true
      default:
        return false
    }
  }

  const handleReset = () => {
    resetBooking()
  }

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Book Your Appointment</h1>
            <p className="text-muted-foreground text-lg">Easy online scheduling for Everything Auto services</p>
          </motion.div>

          {/* Progress Stepper */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              {steps.map((s, index) => (
                <motion.div
                  key={s.number}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
                      step >= s.number ? "bg-secondary text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.number}
                  </div>
                  <p className="text-xs text-center font-medium text-foreground">{s.title}</p>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute h-1 w-full transform translate-x-[80px] -translate-y-[35px] ${
                        step > s.number ? "bg-secondary" : "bg-muted"
                      }`}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Active Step Description */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">{steps[step - 1].title}</h2>
              <p className="text-muted-foreground">{steps[step - 1].description}</p>
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-lg shadow-lg p-8 mb-8 min-h-96"
          >
            {step === 1 && <Step1Services />}
            {step === 2 && <Step2DateTime />}
            {step === 3 && <Step3Details />}
            {step === 4 && <Step4Confirmation />}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-semibold rounded-lg hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Step {step} of {steps.length}
              </p>
            </div>

            {step === 4 ? (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all"
              >
                New Booking
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
