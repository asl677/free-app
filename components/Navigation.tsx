'use client'

interface NavigationProps {
  currentPage: 'dashboard' | 'contracts' | 'time' | 'invoices' | 'payments'
  onNavigate: (page: 'dashboard' | 'contracts' | 'time' | 'invoices' | 'payments') => void
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', symbol: '⌘' },
    { id: 'contracts', label: 'Contracts', symbol: '📋' },
    { id: 'time', label: 'Time', symbol: '⏱' },
    { id: 'invoices', label: 'Invoices', symbol: '📄' },
    { id: 'payments', label: 'Payments', symbol: '💳' },
  ] as const

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:left-0 md:top-0 md:w-20 md:h-screen bg-surface border-t md:border-r border-border flex md:flex-col items-center justify-around md:justify-start gap-0 md:gap-4 px-0 py-3 md:px-3 md:py-8">
      {navItems.map(({ id, label, symbol }) => (
        <button
          key={id}
          onClick={() => onNavigate(id as any)}
          className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all text-xl ${
            currentPage === id
              ? 'bg-coral text-dark'
              : 'text-cream hover:bg-border'
          }`}
          title={label}
        >
          {symbol}
          <span className="text-xs font-mono hidden md:block">{label}</span>
        </button>
      ))}
    </nav>
  )
}
