import { create } from "zustand"

export interface Service {
  id: string
  name: string
  duration: number
  price: number
  category: "main" | "other"
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
  addService: (service: Service) => void
  removeService: (id: string) => void
  setDate: (date: Date) => void
  setTime: (time: string) => void
  setClientInfo: (name: string, phone: string, make: string, model: string) => void
  setNotes: (notes: string) => void
  nextStep: () => void
  prevStep: () => void
  resetBooking: () => void
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

export const useBookingStore = create<BookingState>((set) => ({
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
}))
