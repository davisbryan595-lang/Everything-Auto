"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MapPin, Award, Users, Zap } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Award,
      title: "Expert Technicians",
      description: "Highly trained professionals with years of automotive expertise",
    },
    {
      icon: Zap,
      title: "Quick Turnaround",
      description: "Fast, efficient service without compromising on quality",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our top priority, always",
    },
  ]

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Everything Auto</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              San Antonio's trusted partner for professional auto repair and maintenance
            </p>
          </div>
        </motion.section>

        {/* Story Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Everything Auto San Antonio was founded with a simple mission: to provide honest, reliable auto repair
                  services to the San Antonio community. With over 10 years of experience, we've built our reputation on
                  quality workmanship and customer care.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our team of expert technicians is committed to keeping your vehicle running smoothly. We believe in
                  transparent pricing, expert diagnostics, and getting the job right the first time.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Whether it's routine maintenance or complex repairs, you can trust Everything Auto to deliver
                  exceptional service every time.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img src="/auto-repair-shop-interior.png" alt="Everything Auto shop" className="rounded-lg shadow-lg" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We go above and beyond to ensure your complete satisfaction
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background rounded-lg p-8 border border-border hover:shadow-lg transition-shadow"
                  >
                    <Icon className="w-12 h-12 text-secondary mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experienced professionals dedicated to your automotive needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Miguel Rodriguez", role: "Master Technician", specialization: "Engine & Transmission" },
                { name: "Carlos Santos", role: "Senior Technician", specialization: "Brakes & Suspension" },
                { name: "Juan Martinez", role: "Lead Technician", specialization: "Electrical Systems" },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-border"
                >
                  <div className="h-40 bg-gradient-to-br from-primary to-secondary" />
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-foreground text-lg mb-1">{member.name}</h3>
                    <p className="text-secondary font-semibold text-sm mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.specialization}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Visit Us</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-background rounded-lg p-8 border border-border"
              >
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">San Antonio, TX</h3>
                    <p className="text-muted-foreground">
                      123 Auto Drive
                      <br />
                      San Antonio, TX 78201
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <a
                      href="tel:4253468851"
                      className="font-semibold text-primary hover:text-secondary transition-colors"
                    >
                      425-346-8851
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Hours</p>
                    <p className="font-semibold text-foreground">
                      Mon - Sat: 8:00 AM - 6:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg p-8 flex items-center justify-center"
              >
                <img src="/map-location-san-antonio.jpg" alt="Location map" className="rounded-lg w-full" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Expert Auto Service?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Schedule your appointment today and experience the Everything Auto difference
              </p>
              <Link
                href="/schedule"
                className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-white/90 transition-all"
              >
                Book Now
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
