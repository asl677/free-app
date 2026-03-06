'use client'

import {
  HomeIcon,
  FileTextIcon,
  TimerIcon,
  PaperPlaneIcon,
  ValueIcon,
} from '@radix-ui/react-icons'

interface NavigationProps {
  currentPage: 'dashboard' | 'contracts' | 'time' | 'invoices' | 'payments'
  onNavigate: (page: 'dashboard' | 'contracts' | 'time' | 'invoices' | 'payments') => void
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', Icon: HomeIcon },
    { id: 'contracts', label: 'Contracts', Icon: FileTextIcon },
    { id: 'time', label: 'Time', Icon: TimerIcon },
    { id: 'invoices', label: 'Invoices', Icon: PaperPlaneIcon },
    { id: 'payments', label: 'Payments', Icon: ValueIcon },
  ] as const

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:left-auto md:right-auto md:w-20 md:h-screen bg-surface border-t md:border-r border-border flex md:flex-col items-center justify-around md:justify-start gap-0 md:gap-4 px-0 py-3 md:px-3 md:py-8 z-50 md:z-auto">
      {navItems.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onNavigate(id as any)}
          className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all ${
            currentPage === id
              ? 'bg-coral text-dark'
              : 'text-cream hover:bg-border'
          }`}
          title={label}
          aria-label={label}
        >
          <Icon width={24} height={24} />
          <span className="text-xs font-mono hidden md:block">{label}</span>
        </button>
      ))}
    </nav>
  )
}
