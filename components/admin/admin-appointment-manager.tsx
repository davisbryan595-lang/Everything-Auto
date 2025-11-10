"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useBookingStore, type Appointment } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { X, Plus, Edit2, Trash2 } from "lucide-react"
import { formatDateForStorage, getAvailableTimeSlots, calculateEndTime } from "@/lib/availability"

interface EditingAppointment extends Partial<Appointment> {
  id?: string
}

export function AdminAppointmentManager() {
  const { services, appointments, createAppointment, updateAppointment, deleteAppointment } = useBookingStore()
  const [selectedDate, setSelectedDate] = useState<string>(formatDateForStorage(new Date()))
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<EditingAppointment>({
    date: selectedDate,
    time: "",
    serviceIds: [],
    clientName: "",
    clientPhone: "",
    vehicleMake: "",
    vehicleModel: "",
    notes: "",
    status: "confirmed",
  })

  const dayAppointments = useMemo(() => {
    return appointments.filter((apt) => apt.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time))
  }, [selectedDate, appointments])

  const totalDurationForForm = useMemo(() => {
    return (formData.serviceIds || []).reduce((acc, id) => {
      const service = services.find((s) => s.id === id)
      return acc + (service?.duration || 0)
    }, 0)
  }, [formData.serviceIds, services])

  const availableTimeSlots = useMemo(() => {
    if (totalDurationForForm === 0) return []
    return getAvailableTimeSlots(
      formData.date || selectedDate,
      totalDurationForForm,
      editingId ? appointments.filter((apt) => apt.id !== editingId) : appointments,
    )
  }, [formData.date, totalDurationForForm, editingId, appointments, services, selectedDate])

  const handleAddNew = () => {
    setIsAddingNew(true)
    setEditingId(null)
    setFormData({
      date: selectedDate,
      time: "",
      serviceIds: [],
      clientName: "",
      clientPhone: "",
      vehicleMake: "",
      vehicleModel: "",
      notes: "",
      status: "confirmed",
    })
  }

  const handleEdit = (appointment: Appointment) => {
    setIsAddingNew(false)
    setEditingId(appointment.id)
    setFormData(appointment)
  }

  const handleSave = () => {
    if (
      !formData.date ||
      !formData.time ||
      !formData.clientName ||
      !formData.clientPhone ||
      !formData.vehicleMake ||
      !formData.vehicleModel ||
      (formData.serviceIds || []).length === 0
    ) {
      alert("Please fill in all required fields")
      return
    }

    const endTime = calculateEndTime(formData.time, totalDurationForForm)
    const selectedServices = services.filter((s) => (formData.serviceIds || []).includes(s.id))
    const totalPrice = selectedServices.reduce((acc, s) => acc + s.price, 0)

    const appointmentData: Appointment = {
      id: editingId || Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: formData.date,
      time: formData.time,
      endTime,
      serviceIds: formData.serviceIds || [],
      serviceNames: selectedServices.map((s) => s.name),
      clientName: formData.clientName || "",
      clientPhone: formData.clientPhone || "",
      vehicleMake: formData.vehicleMake || "",
      vehicleModel: formData.vehicleModel || "",
      notes: formData.notes || "",
      status: formData.status || "confirmed",
      totalDuration: totalDurationForForm,
      totalPrice,
      createdAt: editingId
        ? appointments.find((a) => a.id === editingId)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
    }

    if (editingId) {
      updateAppointment(editingId, appointmentData)
    } else {
      createAppointment(appointmentData)
    }

    setIsAddingNew(false)
    setEditingId(null)
    setFormData({
      date: selectedDate,
      time: "",
      serviceIds: [],
      clientName: "",
      clientPhone: "",
      vehicleMake: "",
      vehicleModel: "",
      notes: "",
      status: "confirmed",
    })
  }

  const handleCancel = () => {
    setIsAddingNew(false)
    setEditingId(null)
    setFormData({
      date: selectedDate,
      time: "",
      serviceIds: [],
      clientName: "",
      clientPhone: "",
      vehicleMake: "",
      vehicleModel: "",
      notes: "",
      status: "confirmed",
    })
  }

  const handleDeleteAppointment = (id: string) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      deleteAppointment(id)
    }
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
      {/* Date Selector */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-bold text-foreground mb-4">Select Date</h3>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="max-w-xs focus:ring-secondary"
        />
      </motion.div>

      {/* Appointments for Selected Date */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">Appointments for {new Date(selectedDate).toLocaleDateString()}</h3>
          <Button onClick={handleAddNew} className="bg-secondary text-white hover:bg-secondary/90 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Appointment
          </Button>
        </div>

        {dayAppointments.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No appointments for this date</p>
        ) : (
          <div className="space-y-3">
            {dayAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-semibold text-foreground">
                        {appointment.time} - {appointment.endTime} ({appointment.totalDuration}h)
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{appointment.serviceNames.join(", ")}</p>
                    <p className="text-sm font-medium text-foreground mt-2">{appointment.clientName}</p>
                    <p className="text-xs text-muted-foreground">{appointment.clientPhone}</p>
                    <p className="text-xs text-muted-foreground">
                      {appointment.vehicleMake} {appointment.vehicleModel}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(appointment)}
                      className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6 space-y-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">{editingId ? "Edit Appointment" : "New Appointment"}</h3>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="form-date">Date *</Label>
              <Input
                id="form-date"
                type="date"
                value={formData.date || ""}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="focus:ring-secondary"
              />
            </div>

            {/* Time */}
            <div className="space-y-2">
              <Label htmlFor="form-time">Time *</Label>
              <select
                id="form-time"
                value={formData.time || ""}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-secondary"
              >
                <option value="">Select a time</option>
                {availableTimeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {totalDurationForForm > 0 && (
                <p className="text-xs text-muted-foreground">Available slots for {totalDurationForForm}h block</p>
              )}
            </div>

            {/* Services */}
            <div className="space-y-2 md:col-span-2">
              <Label>Services *</Label>
              <div className="grid grid-cols-2 gap-2">
                {services.map((service) => (
                  <motion.label
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2 p-2 rounded border border-border cursor-pointer hover:bg-muted/50"
                  >
                    <input
                      type="checkbox"
                      checked={(formData.serviceIds || []).includes(service.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            serviceIds: [...(formData.serviceIds || []), service.id],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            serviceIds: (formData.serviceIds || []).filter((id) => id !== service.id),
                          })
                        }
                      }}
                      className="cursor-pointer"
                    />
                    <span className="text-sm">
                      {service.name} ({service.duration}h)
                    </span>
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Client Name */}
            <div className="space-y-2">
              <Label htmlFor="form-name">Client Name *</Label>
              <Input
                id="form-name"
                value={formData.clientName || ""}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="John Doe"
                className="focus:ring-secondary"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="form-phone">Phone *</Label>
              <Input
                id="form-phone"
                type="tel"
                value={formData.clientPhone || ""}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                placeholder="(555) 123-4567"
                className="focus:ring-secondary"
              />
            </div>

            {/* Vehicle Make */}
            <div className="space-y-2">
              <Label htmlFor="form-make">Vehicle Make *</Label>
              <Input
                id="form-make"
                value={formData.vehicleMake || ""}
                onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                placeholder="Toyota"
                className="focus:ring-secondary"
              />
            </div>

            {/* Vehicle Model */}
            <div className="space-y-2">
              <Label htmlFor="form-model">Vehicle Model *</Label>
              <Input
                id="form-model"
                value={formData.vehicleModel || ""}
                onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                placeholder="Camry"
                className="focus:ring-secondary"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="form-status">Status *</Label>
              <select
                id="form-status"
                value={formData.status || "confirmed"}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-secondary"
              >
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Notes */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="form-notes">Notes</Label>
              <textarea
                id="form-notes"
                value={formData.notes || ""}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special notes..."
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-secondary resize-none"
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button onClick={handleCancel} variant="outline" className="border-border">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-secondary text-white hover:bg-secondary/90">
              {editingId ? "Update" : "Create"} Appointment
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
