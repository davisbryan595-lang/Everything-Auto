"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const services = [
  {
    id: 1,
    name: "Air Filters",
    description: "Replace cabin and engine filters for optimal performance",
    duration: "1-2 hrs",
    image: "/car-air-filter-replacement.jpg",
  },
  {
    id: 2,
    name: "Power Steering Flush",
    description: "Complete fluid replacement for smooth steering control",
    duration: "2 hrs",
    image: "/power-steering-system.jpg",
  },
  {
    id: 3,
    name: "Brake Fluid Flush",
    description: "Essential maintenance for safe braking performance",
    duration: "2 hrs",
    image: "/car-brake-system.png",
  },
  {
    id: 4,
    name: "Coolant Flush",
    description: "Keep your engine running at optimal temperature",
    duration: "2 hrs",
    image: "/car-cooling-system.jpg",
  },
  {
    id: 5,
    name: "Spark Plugs",
    description: "New spark plugs for smooth engine ignition",
    duration: "3 hrs",
    image: "/spark-plugs-installation.jpg",
  },
  {
    id: 6,
    name: "Oil Changes",
    description: "Regular oil changes for engine longevity",
    duration: "2 hrs",
    image: "/car-oil-change.png",
  },
]

export function ServicesCarousel() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % services.length)
  const prev = () => setCurrent((current - 1 + services.length) % services.length)

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Main Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional auto repair services tailored to keep your vehicle running smoothly
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[current, (current + 1) % services.length, (current + 2) % services.length].map((index) => {
                const service = services[index]
                return (
                  <motion.div
                    key={service.id}
                    whileHover={{ y: -5 }}
                    className="group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">{service.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{service.description}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                          {service.duration}
                        </span>
                        <Link
                          href="/schedule"
                          className="text-primary font-semibold hover:text-secondary transition-colors"
                        >
                          Learn More →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-primary text-white hover:bg-primary/80 transition-all hover:scale-110"
              aria-label="Previous services"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full bg-secondary text-white hover:bg-secondary/80 transition-all hover:scale-110"
              aria-label="Next services"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(services.length / 3) }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrent((i * 3) % services.length)}
                className={`h-2 rounded-full transition-all ${
                  Math.floor(current / 3) === i ? "bg-secondary w-8" : "bg-muted w-2"
                }`}
                aria-label={`Go to service group ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
