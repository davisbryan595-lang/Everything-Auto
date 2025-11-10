import { useBookingStore } from "./store"

const BUSINESS_HOURS = {
  start: 8, // 8 AM
  end: 18, // 6 PM
}

const SLOT_DURATION = 1 // 1 hour slots

export function getTimeSlots(): string[] {
  const slots: string[] = []
  for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`)
  }
  return slots
}

export function addHours(date: Date, hours: number): Date {
  const result = new Date(date)
  result.setHours(result.getHours() + hours)
  return result
}

export function formatDateForStorage(date: Date): string {
  return date.toISOString().split("T")[0]
}

export function calculateEndTime(timeString: string, durationHours: number): string {
  const [hours, minutes] = timeString.split(":").map(Number)
  const endHours = hours + durationHours
  return `${String(endHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}

export function timeToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(":").map(Number)
  return hours * 60 + minutes
}

export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
}

export function isTimeSlotAvailable(
  date: string,
  startTime: string,
  durationHours: number,
  appointments: any[] = [],
): boolean {
  const startMinutes = timeToMinutes(startTime)
  const endMinutes = startMinutes + durationHours * 60

  // Check if within business hours
  if (startMinutes < BUSINESS_HOURS.start * 60 || endMinutes > BUSINESS_HOURS.end * 60) {
    return false
  }

  // Check for conflicts with existing appointments
  for (const apt of appointments) {
    if (apt.date !== date || apt.status === "cancelled") {
      continue
    }

    const aptStartMinutes = timeToMinutes(apt.time)
    const aptEndMinutes = timeToMinutes(apt.endTime)

    // Check if there's any overlap
    if (startMinutes < aptEndMinutes && endMinutes > aptStartMinutes) {
      return false
    }
  }

  return true
}

export function getAvailableTimeSlots(
  date: string,
  durationHours: number,
  appointments: any[] = [],
): string[] {
  const allSlots = getTimeSlots()
  return allSlots.filter((slot) => isTimeSlotAvailable(date, slot, durationHours, appointments))
}

export function isDateDisabled(date: Date): boolean {
  // Disable Sundays and past dates
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (date < today) {
    return true
  }

  // Disable Sundays (day 0)
  if (date.getDay() === 0) {
    return true
  }

  return false
}
