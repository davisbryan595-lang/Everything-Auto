"use client"

import { motion } from "framer-motion"
import { useBookingStore } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function Step3Details() {
  const { clientName, clientPhone, vehicleMake, vehicleModel, notes, setClientInfo, setNotes } = useBookingStore()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={clientName}
            onChange={(e) => setClientInfo(e.target.value, clientPhone, vehicleMake, vehicleModel)}
            placeholder="John Doe"
            className="focus:ring-secondary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={clientPhone}
            onChange={(e) => setClientInfo(clientName, e.target.value, vehicleMake, vehicleModel)}
            placeholder="(555) 123-4567"
            className="focus:ring-secondary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="make">Vehicle Make *</Label>
          <Input
            id="make"
            value={vehicleMake}
            onChange={(e) => setClientInfo(clientName, clientPhone, e.target.value, vehicleModel)}
            placeholder="Toyota"
            className="focus:ring-secondary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Vehicle Model *</Label>
          <Input
            id="model"
            value={vehicleModel}
            onChange={(e) => setClientInfo(clientName, clientPhone, vehicleMake, e.target.value)}
            placeholder="Camry"
            className="focus:ring-secondary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell us about any specific concerns or requests..."
          className="min-h-32 focus:ring-secondary"
        />
      </div>
    </motion.div>
  )
}
