"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Video Background */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover brightness-50"
          poster="/car-repair-shop-mechanics-working.jpg"
        >
          <source src="https://videos.pexels.com/video-files/8393626/8393626-sd_640_360_24fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-transparent to-secondary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Everything Auto: <span className="text-secondary">Your San Antonio Repair Experts</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/90 mb-4 max-w-2xl mx-auto"
        >
          Performed At Your Home - No Travel Fee
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <Link
            href="/services"
            className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-2xl text-center"
          >
            View Services
          </Link>
          <Link
            href="/schedule"
            className="px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all hover:shadow-2xl text-center"
          >
            Book Appointment
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white z-10"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </motion.div>
    </section>
  )
}
