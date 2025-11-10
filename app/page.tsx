import { Preloader } from "@/components/preloader"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { StatsBanner } from "@/components/home/stats-banner"
import { PromoBanner } from "@/components/home/promo-banner"
import { ServicesCarousel } from "@/components/home/services-carousel"
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel"

export default function Home() {
  return (
    <main>
      <Preloader />
      <Navbar />
      <HeroSection />
      <StatsBanner />
      <ServicesCarousel />
      <PromoBanner />
      <TestimonialsCarousel />
      <Footer />
    </main>
  )
}
