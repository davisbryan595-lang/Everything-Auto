"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, ChevronUp, ChevronDown } from "lucide-react"

interface Booking {
  id: string
  date: string
  time: string
  service: string
  duration: number
  clientName: string
  phone: string
  status: "confirmed" | "pending" | "cancelled"
}

const mockBookings: Booking[] = [
  {
    id: "1",
    date: "2025-12-20",
    time: "10:00",
    service: "Power Steering Flush",
    duration: 2,
    clientName: "John Martinez",
    phone: "(555) 123-4567",
    status: "confirmed",
  },
  {
    id: "2",
    date: "2025-12-20",
    time: "13:00",
    service: "Oil Change",
    duration: 2,
    clientName: "Sarah Johnson",
    phone: "(555) 234-5678",
    status: "confirmed",
  },
  {
    id: "3",
    date: "2025-12-21",
    time: "14:00",
    service: "Spark Plugs",
    duration: 3,
    clientName: "Michael Chen",
    phone: "(555) 345-6789",
    status: "pending",
  },
  {
    id: "4",
    date: "2025-12-22",
    time: "09:00",
    service: "Brake Fluid Flush",
    duration: 2,
    clientName: "Lisa Rodriguez",
    phone: "(555) 456-7890",
    status: "confirmed",
  },
]

type SortField = "date" | "service" | "status"

export function BookingsTable() {
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [filter, setFilter] = useState<"all" | "confirmed" | "pending" | "cancelled">("all")

  const filteredBookings = mockBookings.filter((b) => (filter === "all" ? true : b.status === filter))

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const aVal: any = a[sortField]
    const bVal: any = b[sortField]

    if (aVal < bVal) return sortDir === "asc" ? -1 : 1
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDir("asc")
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

  const exportCSV = () => {
    const headers = ["Date", "Time", "Service", "Client", "Phone", "Duration", "Status"]
    const rows = sortedBookings.map((b) => [
      b.date,
      b.time,
      b.service,
      b.clientName,
      b.phone,
      `${b.duration}h`,
      b.status,
    ])

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "bookings.csv"
    a.click()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="font-bold text-foreground">Recent Bookings</h3>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all text-sm font-semibold"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 p-4 bg-background border-b border-border flex-wrap">
        {(["all", "confirmed", "pending", "cancelled"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded text-sm font-medium transition-all ${
              filter === status ? "bg-secondary text-white" : "bg-muted hover:bg-muted/80"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                <button
                  onClick={() => handleSort("date")}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  Date
                  {sortField === "date" &&
                    (sortDir === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Time</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                <button
                  onClick={() => handleSort("service")}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  Service
                  {sortField === "service" &&
                    (sortDir === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Client</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  Status
                  {sortField === "status" &&
                    (sortDir === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBookings.map((booking, index) => (
              <motion.tr
                key={booking.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-foreground">{booking.date}</td>
                <td className="px-6 py-4 text-sm text-foreground font-semibold">{booking.time}</td>
                <td className="px-6 py-4 text-sm text-foreground">{booking.service}</td>
                <td className="px-6 py-4 text-sm text-foreground">{booking.clientName}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{booking.phone}</td>
                <td className="px-6 py-4 text-sm text-foreground">{booking.duration}h</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}
                  >
                    {booking.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
