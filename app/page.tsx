"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PagePreloader } from "@/components/page-preloader"
import { HeroSection } from "@/components/home/hero-section"
import { StatsBanner } from "@/components/home/stats-banner"
import { PromoBanner } from "@/components/home/promo-banner"
import { ServicesCarousel } from "@/components/home/services-carousel"
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel"
import { AnimatedCounter } from "@/components/animated-counter"
import { Clock, DollarSign, Star, Award, Zap, Users, MapPin, Phone, Mail } from "lucide-react"
import { Step1Services } from "@/components/schedule/step-1-services"
import { Step2DateTime } from "@/components/schedule/step-2-datetime"
import { Step3Details } from "@/components/schedule/step-3-details"
import { Step4Confirmation } from "@/components/schedule/step-4-confirmation"
import { useBookingStore } from "@/lib/store"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Home() {
  const { step, nextStep, prevStep, selectedServices, selectedDate, selectedTime, clientName, clientPhone, vehicleMake, vehicleModel } = useBookingStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

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

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedServices.length > 0
      case 2:
        return selectedDate && selectedTime
      case 3:
        return clientName && clientPhone && vehicleMake && vehicleModel
      case 4:
        return true
      default:
        return false
    }
  }

  const steps = [
    { number: 1, title: "Select Services", description: "Choose the services you need" },
    { number: 2, title: "Pick Date & Time", description: "Schedule your appointment" },
    { number: 3, title: "Your Details", description: "Contact and vehicle information" },
    { number: 4, title: "Confirmation", description: "Review and confirm booking" },
  ]

  return (
    <main>
      <PagePreloader />
      <Navbar />

      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>

      {/* Stats Banner */}
      <StatsBanner />

      {/* Services Carousel */}
      <section id="services-preview">
        <ServicesCarousel />
      </section>

      {/* Promo Banner */}
      <PromoBanner />

      {/* Full Services Grid */}
      <section id="services" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground">
              Comprehensive auto repair and maintenance services in San Antonio
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

                  <a
                    href="#book"
                    className="w-full px-4 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all text-center block"
                  >
                    Schedule Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* About Section */}
      <section id="about" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
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

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Why Choose Us</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow"
                  >
                    <Icon className="w-12 h-12 text-secondary mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Our Team</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Miguel Rodriguez", role: "Master Technician", specialization: "Engine & Transmission", image: "/car-cooling-system.jpg" },
                { name: "Carlos Santos", role: "Senior Technician", specialization: "Brakes & Suspension", image: "/car-brake-system.png" },
                { name: "Juan Martinez", role: "Lead Technician", specialization: "Electrical Systems", image: "/spark-plugs-installation.jpg" },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-border"
                >
                  <div className="h-48 overflow-hidden bg-muted">
                    <img 
                      src={member.image} 
                      alt={`${member.name} - ${member.role}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-foreground text-lg mb-1">{member.name}</h3>
                    <p className="text-secondary font-semibold text-sm mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.specialization}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact & Booking Section */}
      <section id="book" className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Book Your Appointment</h2>
            <p className="text-muted-foreground">Easy online scheduling for Everything Auto services</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
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
                content: "123 Auto Drive, San Antonio, TX 78201",
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
                  className="bg-background rounded-lg p-6 border border-border hover:shadow-lg transition-shadow text-center"
                >
                  <Icon className="w-8 h-8 text-secondary mx-auto mb-3" />
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.content}</p>
                </motion.a>
              )
            })}
          </div>

          {/* Progress Stepper */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              {steps.map((s, index) => (
                <motion.div
                  key={s.number}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
                      step >= s.number ? "bg-secondary text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.number}
                  </div>
                  <p className="text-xs text-center font-medium text-foreground">{s.title}</p>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute h-1 w-full transform translate-x-[80px] -translate-y-[35px] ${
                        step > s.number ? "bg-secondary" : "bg-muted"
                      }`}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground">{steps[step - 1].title}</h3>
              <p className="text-muted-foreground">{steps[step - 1].description}</p>
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-lg shadow-lg p-8 mb-8 min-h-96 border border-border"
          >
            {step === 1 && <Step1Services />}
            {step === 2 && <Step2DateTime />}
            {step === 3 && <Step3Details />}
            {step === 4 && <Step4Confirmation />}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-semibold rounded-lg hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Step {step} of {steps.length}
              </p>
            </div>

            {step === 4 ? (
              <button
                disabled
                className="flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all"
              >
                Booking Complete ✓
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location Info */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-background rounded-lg p-6 border border-border"
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-secondary to-primary text-white rounded-lg p-6"
            >
              <h3 className="font-bold mb-2">Emergency Service?</h3>
              <p className="mb-4">Call us 24/7 for roadside assistance</p>
              <a
                href="tel:4253468851"
                className="inline-block px-4 py-2 bg-white text-secondary font-bold rounded-lg hover:bg-white/90 transition-all"
              >
                Call Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
