"use client"

import { motion } from "framer-motion"
import { useBookingStore } from "@/lib/store"
import { CheckCircle2, Circle } from "lucide-react"

export function Step1Services() {
  const { services, selectedServices, addService, removeService } = useBookingStore()
  const mainServices = services.filter((s) => s.category === "main")
  const otherServices = services.filter((s) => s.category === "other")

  const renderServices = (serviceList: typeof services) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {serviceList.map((service) => {
        const isSelected = selectedServices.some((s) => s.id === service.id)
        return (
          <motion.button
            key={service.id}
            onClick={() => (isSelected ? removeService(service.id) : addService(service))}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-lg text-left transition-all ${
              isSelected ? "bg-secondary text-white shadow-lg" : "bg-card border border-border hover:border-secondary"
            }`}
          >
            <div className="flex items-start gap-3">
              {isSelected ? (
                <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 mt-1 flex-shrink-0 opacity-50" />
              )}
              <div className="flex-1">
                <div className="font-semibold">{service.name}</div>
                <div className="text-xs opacity-75">
                  {service.duration}h • ${service.price}
                </div>
              </div>
            </div>
          </motion.button>
        )
      })}
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Main Services</h3>
        {renderServices(mainServices)}
      </div>

      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Other Services</h3>
        {renderServices(otherServices)}
      </div>

      {selectedServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary/10 border border-secondary rounded-lg p-4"
        >
          <p className="font-semibold text-foreground">Selected Services: {selectedServices.length}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Total Duration: {selectedServices.reduce((acc, s) => acc + s.duration, 0)} hours
          </p>
          <p className="text-sm font-semibold text-secondary mt-2">
            Estimated Cost: ${selectedServices.reduce((acc, s) => acc + s.price, 0)}
          </p>
        </motion.div>
      )}
    </div>
  )
}
