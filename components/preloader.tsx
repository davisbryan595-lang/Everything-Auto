"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 bg-background z-50 flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="relative w-16 h-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 animate-pulse-subtle" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl">⚙️</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-xl font-bold text-primary">Revving Up...</h2>
          <p className="text-sm text-muted-foreground mt-2">Everything Auto San Antonio</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
