"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedCounter } from "@/components/animated-counter"
import { Clock, DollarSign, Star } from "lucide-react"

const mainServices = [
  {
    id: 1,
    name: "Air Filters",
    description: "Replace cabin and engine filters for optimal performance and air quality",
    duration: 1,
    price: 45,
    image: "/car-air-filter-replacement.jpg",
  },
  {
    id: 2,
    name: "Power Steering Flush",
    description: "Complete fluid replacement for smooth steering control and responsiveness",
    duration: 2,
    price: 89,
    image: "/power-steering-system.jpg",
  },
  {
    id: 3,
    name: "Brake Fluid Flush",
    description: "Essential maintenance for safe braking performance and system health",
    duration: 2,
    price: 79,
    image: "/car-brake-system.png",
  },
  {
    id: 4,
    name: "Coolant Flush",
    description: "Keep your engine running at optimal temperature with fresh coolant",
    duration: 2,
    price: 69,
    image: "/car-cooling-system.jpg",
  },
  {
    id: 5,
    name: "Spark Plugs",
    description: "New spark plugs for smooth engine ignition and fuel efficiency",
    duration: 3,
    price: 99,
    image: "/spark-plugs-installation.jpg",
  },
  {
    id: 6,
    name: "Oil Changes",
    description: "Regular oil changes for engine longevity and optimal performance",
    duration: 2,
    price: 59,
    image: "/car-oil-change.png",
  },
]

const otherServices = [
  { name: "Brakes", description: "Complete brake system inspection and replacement", duration: 4, price: 199 },
  {
    name: "Battery Replacement",
    description: "Professional battery installation and testing",
    duration: 1,
    price: 139,
  },
  { name: "Tire Services", description: "Rotation, balancing, and replacement services", duration: 2, price: 89 },
  { name: "Transmission Flush", description: "Complete transmission fluid replacement", duration: 3, price: 159 },
  { name: "AC Service", description: "Refrigerant recharge and system inspection", duration: 2, price: 119 },
  {
    name: "Suspension Repair",
    description: "Shocks, struts, and suspension component repair",
    duration: 4,
    price: 279,
  },
]

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-primary/80 text-white py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Comprehensive Auto Services</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Professional auto repair and maintenance services in San Antonio
            </p>
          </div>
        </motion.section>

        {/* Stats Sidebar */}
        <section className="py-12 bg-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">
                  <AnimatedCounter end={98} suffix="%" duration={2} />
                </div>
                <p className="text-muted-foreground">Customer Satisfaction</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-secondary mb-2">
                  <AnimatedCounter end={500} suffix="+" duration={2} />
                </div>
                <p className="text-muted-foreground">Services Completed</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-secondary mb-2">
                  <AnimatedCounter end={10} suffix="+" duration={2} />
                </div>
                <p className="text-muted-foreground">Years Experience</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Main Services</h2>
              <p className="text-muted-foreground">
                Our most popular services designed to keep your vehicle in top condition
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-border"
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

                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {service.duration}h
                      </div>
                      <div className="flex items-center gap-1 text-secondary font-semibold">
                        <DollarSign className="w-4 h-4" />
                        {service.price}
                      </div>
                    </div>

                    <Link
                      href="/schedule"
                      className="w-full px-4 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all text-center block"
                    >
                      Schedule Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Additional Services</h2>
              <p className="text-muted-foreground">More services available for your complete automotive needs</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherServices.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 bg-background rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {service.duration}h
                      </span>
                      <span className="flex items-center gap-1 text-secondary font-semibold">
                        <DollarSign className="w-3 h-3" /> {service.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
