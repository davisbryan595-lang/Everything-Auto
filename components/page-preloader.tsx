"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function PagePreloader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_new-removebg-preview-hvoIVNsOQvinPtqIy6FmMRMYUxrEI3.png"
            alt="Everything Auto Logo"
            className="h-16 w-auto"
          />
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full"
        />

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-foreground font-semibold text-sm"
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  )
}
