"use client"

import { motion } from "framer-motion"
import { AnimatedCounter } from "../animated-counter"
import { Wrench, Star, TrendingUp, Clock } from "lucide-react"

const stats = [
  { icon: Wrench, label: "Repairs Completed", value: 500, suffix: "+" },
  { icon: Clock, label: "24/7 Roadside", value: 24, suffix: "/7", prefix: "" },
  { icon: Star, label: "Star Reviews", value: 5, suffix: "★" },
  { icon: TrendingUp, label: "Years Experience", value: 10, suffix: "+" },
]

export function StatsBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary via-primary/80 to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <Icon className="w-10 h-10 text-secondary mb-4" />
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} duration={2} />
                </div>
                <p className="text-sm sm:text-base text-white/80 font-medium">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
