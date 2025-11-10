"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const endOfDay = new Date(now.getTime() + 24 * 60 * 60 * 1000)
      endOfDay.setHours(23, 59, 59, 999)

      const diff = endOfDay.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-8 bg-secondary text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Free Headlight Restoration with Any Service!</h2>
            <p className="text-white/90">Limited time offer - Book your appointment today</p>
          </div>

          <div className="flex items-center gap-4 bg-white/20 backdrop-blur-md rounded-lg px-6 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs uppercase">Hours</div>
            </div>
            <span className="text-2xl">:</span>
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs uppercase">Minutes</div>
            </div>
            <span className="text-2xl">:</span>
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.seconds}</div>
              <div className="text-xs uppercase">Seconds</div>
            </div>
          </div>

          <Link
            href="/schedule"
            className="px-6 py-3 bg-white text-secondary font-semibold rounded-lg hover:bg-white/90 transition-all whitespace-nowrap"
          >
            Book Today
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
