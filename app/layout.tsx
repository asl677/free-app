import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Freelancer Pro',
  description: 'Professional contract, time tracking, and payment management for freelancers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className="bg-dark text-cream font-serif">
        {children}
      </body>
    </html>
  )
}
