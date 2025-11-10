import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PagePreloader } from "@/components/page-preloader"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Everything Auto San Antonio | Auto Repair & Scheduling",
  description:
    "Fast, reliable auto repair services in San Antonio. Schedule appointments online with our expert technicians. 24/7 roadside support available.",
  generator: "v0.app",
  openGraph: {
    title: "Everything Auto San Antonio",
    description: "Professional auto repair services in San Antonio, TX",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <PagePreloader />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
