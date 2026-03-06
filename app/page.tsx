'use client'

import { useState } from 'react'
import Dashboard from '@/components/pages/Dashboard'
import Contracts from '@/components/pages/Contracts'
import TimeTracking from '@/components/pages/TimeTracking'
import Invoices from '@/components/pages/Invoices'
import Payments from '@/components/pages/Payments'
import Navigation from '@/components/Navigation'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'contracts' | 'time' | 'invoices' | 'payments'>('dashboard')

  return (
    <main className="min-h-screen w-full bg-dark text-cream pb-20 md:pb-0">
      {currentPage === 'dashboard' && <Dashboard onNavigate={setCurrentPage} />}
      {currentPage === 'contracts' && <Contracts onNavigate={setCurrentPage} />}
      {currentPage === 'time' && <TimeTracking onNavigate={setCurrentPage} />}
      {currentPage === 'invoices' && <Invoices onNavigate={setCurrentPage} />}
      {currentPage === 'payments' && <Payments onNavigate={setCurrentPage} />}

      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
    </main>
  )
}
