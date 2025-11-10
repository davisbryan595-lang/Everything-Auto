"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "John Martinez",
    service: "Brake Fluid Flush",
    rating: 5,
    quote: "Fixed my brakes in 2 hours! Professional, quick, and affordable. Highly recommended!",
    initials: "JM",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    service: "Oil Change & Filter",
    rating: 5,
    quote: "Best auto shop in San Antonio. The team knows what they are doing. Very satisfied with the service!",
    initials: "SJ",
  },
  {
    id: 3,
    name: "Michael Chen",
    service: "Power Steering Flush",
    rating: 5,
    quote: "Amazing experience. They explained everything clearly and got the job done quickly. Worth every penny!",
    initials: "MC",
  },
  {
    id: 4,
    name: "Lisa Rodriguez",
    service: "Spark Plugs Installation",
    rating: 5,
    quote: "Excellent service and friendly staff. My car runs like new again. Will definitely come back!",
    initials: "LR",
  },
]

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % testimonials.length)
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Customer Reviews</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by customers throughout San Antonio for quality service
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
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[current, (current + 1) % testimonials.length].map((index) => {
                const testimonial = testimonials[index]
                return (
                  <motion.div
                    key={testimonial.id}
                    whileHover={{ y: -5 }}
                    className="bg-card rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-8 border border-border"
                  >
                    {/* Quote Mark */}
                    <div className="text-5xl text-secondary/30 font-bold mb-2">❝</div>

                    {/* Quote */}
                    <p className="text-foreground text-lg mb-6 italic">{testimonial.quote}</p>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                      ))}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.service}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-primary text-white hover:bg-primary/80 transition-all hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full bg-secondary text-white hover:bg-secondary/80 transition-all hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${current === i ? "bg-secondary w-8" : "bg-muted w-2"}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
