"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AdminLoginProps {
  onLogin: (credentials: { username: string; password: string }) => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminAuth", "true")
      onLogin({ username, password })
    } else {
      setError("Invalid credentials. Try admin/admin123")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="bg-card rounded-lg shadow-2xl p-8 max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="focus:ring-secondary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="focus:ring-secondary"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-secondary bg-secondary/10 p-2 rounded"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all"
          >
            Sign In
          </button>

          <p className="text-xs text-muted-foreground text-center mt-4">Demo credentials: admin / admin123</p>
        </form>
      </motion.div>
    </motion.div>
  )
}
