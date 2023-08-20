import type { Metadata } from "next"
import { Inter } from "next/font/google"

import Providers from "@/components/providers"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "...",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("text-gray-900 antialiased", inter.className)}>
      <body suppressHydrationWarning>
        <Providers>
          <main
            className="
              sm:container 
              max-w-7xl
              mx-auto 
              min-h-screen
              px-5
            "
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
