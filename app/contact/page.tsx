"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", phone: "", service: "", message: "" })
    }, 3000)
  }

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-white/90">Get in touch with Everything Auto San Antonio</p>
          </div>
        </motion.section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  content: "425-346-8851",
                  href: "tel:4253468851",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "contact@everythingauto.com",
                  href: "mailto:contact@everythingauto.com",
                },
                {
                  icon: MapPin,
                  title: "Location",
                  content: "San Antonio, TX",
                  href: "#",
                },
                {
                  icon: Clock,
                  title: "Hours",
                  content: "Mon-Sat 8AM-6PM",
                  href: "#",
                },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow text-center"
                  >
                    <Icon className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.content}</p>
                  </motion.a>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
                <h2 className="text-3xl font-bold text-foreground mb-6">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="focus:ring-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="focus:ring-secondary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className="focus:ring-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Interest</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-background text-foreground"
                      >
                        <option value="">Select a service</option>
                        <option value="oil-change">Oil Change</option>
                        <option value="brakes">Brakes</option>
                        <option value="suspension">Suspension</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      required
                      className="min-h-40 focus:ring-secondary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-100 border border-green-200 text-green-800 rounded-lg text-center font-semibold"
                  >
                    ✓ Thank you! We'll get back to you soon.
                  </motion.div>
                )}
              </motion.div>

              {/* Map & Info */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="bg-background rounded-lg p-6 border border-border">
                  <img src="/map-san-antonio.jpg" alt="Map location" className="w-full rounded-lg mb-4" />
                  <h3 className="font-bold text-foreground mb-3">Our Location</h3>
                  <p className="text-muted-foreground mb-4">123 Auto Drive, San Antonio, TX 78201</p>
                </div>

                <div className="bg-background rounded-lg p-6 border border-border">
                  <h3 className="font-bold text-foreground mb-4">Business Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-semibold text-foreground">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-semibold text-foreground">8:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-semibold text-secondary">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary to-primary text-white rounded-lg p-6">
                  <h3 className="font-bold mb-2">Emergency Service?</h3>
                  <p className="mb-4">Call us 24/7 for roadside assistance</p>
                  <a
                    href="tel:4253468851"
                    className="inline-block px-4 py-2 bg-white text-secondary font-bold rounded-lg hover:bg-white/90 transition-all"
                  >
                    Call Now
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-foreground mb-12 text-center"
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="space-y-4">
              {[
                {
                  q: "How do I schedule an appointment?",
                  a: "You can book online through our scheduling page, call us at 425-346-8851, or visit us in person.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept cash, credit cards, and debit cards for your convenience.",
                },
                {
                  q: "Do you provide warranties?",
                  a: "Yes, all our services come with a satisfaction guarantee.",
                },
                {
                  q: "How long does a typical service take?",
                  a: "Service times vary from 1-4 hours depending on the type of work needed.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg p-6 border border-border"
                >
                  <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
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
