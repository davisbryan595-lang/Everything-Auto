import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Service {
  id: string
  name: string
  duration: number
  price: number
  category: "main" | "other"
}

export interface Appointment {
  id: string
  date: string
  time: string
  endTime: string
  serviceIds: string[]
  serviceNames: string[]
  clientName: string
  clientPhone: string
  vehicleMake: string
  vehicleModel: string
  notes: string
  status: "confirmed" | "pending" | "cancelled"
  totalDuration: number
  totalPrice: number
  createdAt: string
}

export interface BookingState {
  services: Service[]
  selectedServices: Service[]
  selectedDate: Date | null
  selectedTime: string | null
  clientName: string
  clientPhone: string
  vehicleMake: string
  vehicleModel: string
  notes: string
  step: 1 | 2 | 3 | 4
  appointments: Appointment[]
  addService: (service: Service) => void
  removeService: (id: string) => void
  setDate: (date: Date) => void
  setTime: (time: string) => void
  setClientInfo: (name: string, phone: string, make: string, model: string) => void
  setNotes: (notes: string) => void
  nextStep: () => void
  prevStep: () => void
  resetBooking: () => void
  createAppointment: (appointment: Appointment) => void
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void
  deleteAppointment: (id: string) => void
  getAppointments: () => Appointment[]
  getAppointmentsForDate: (date: string) => Appointment[]
}

const defaultServices: Service[] = [
  { id: "1", name: "Air Filters", duration: 1, price: 45, category: "main" },
  { id: "2", name: "Power Steering Flush", duration: 2, price: 89, category: "main" },
  { id: "3", name: "Brake Fluid Flush", duration: 2, price: 79, category: "main" },
  { id: "4", name: "Coolant Flush", duration: 2, price: 69, category: "main" },
  { id: "5", name: "Spark Plugs", duration: 3, price: 99, category: "main" },
  { id: "6", name: "Oil Changes", duration: 2, price: 59, category: "other" },
  { id: "7", name: "Brakes", duration: 4, price: 199, category: "other" },
  { id: "8", name: "Battery Replacement", duration: 1, price: 139, category: "other" },
]

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      services: defaultServices,
      selectedServices: [],
      selectedDate: null,
      selectedTime: null,
      clientName: "",
      clientPhone: "",
      vehicleMake: "",
      vehicleModel: "",
      notes: "",
      step: 1,
      appointments: [],
      addService: (service) =>
        set((state) => ({
          selectedServices: state.selectedServices.some((s) => s.id === service.id)
            ? state.selectedServices
            : [...state.selectedServices, service],
        })),
      removeService: (id) =>
        set((state) => ({
          selectedServices: state.selectedServices.filter((s) => s.id !== id),
        })),
      setDate: (date) => set({ selectedDate: date }),
      setTime: (time) => set({ selectedTime: time }),
      setClientInfo: (name, phone, make, model) =>
        set({ clientName: name, clientPhone: phone, vehicleMake: make, vehicleModel: model }),
      setNotes: (notes) => set({ notes }),
      nextStep: () =>
        set((state) => ({
          step: Math.min((state.step + 1) as any, 4),
        })),
      prevStep: () =>
        set((state) => ({
          step: Math.max((state.step - 1) as any, 1),
        })),
      resetBooking: () =>
        set({
          selectedServices: [],
          selectedDate: null,
          selectedTime: null,
          clientName: "",
          clientPhone: "",
          vehicleMake: "",
          vehicleModel: "",
          notes: "",
          step: 1,
        }),
      createAppointment: (appointment) =>
        set((state) => ({
          appointments: [...state.appointments, appointment],
        })),
      updateAppointment: (id, updates) =>
        set((state) => ({
          appointments: state.appointments.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt)),
        })),
      deleteAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter((apt) => apt.id !== id),
        })),
      getAppointments: () => get().appointments,
      getAppointmentsForDate: (date: string) => {
        return get().appointments.filter((apt) => apt.date === date)
      },
    }),
    {
      name: "booking-store",
    },
  ),
)
