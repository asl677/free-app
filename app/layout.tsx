import type { Metadata } from 'next'
import './globals.css'
import ProgressBar from '@/components/ProgressBar'

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
      <head>
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
      </head>
      <body className="bg-dark text-cream font-serif">
        <ProgressBar />
        {children}
      </body>
    </html>
  )
}
