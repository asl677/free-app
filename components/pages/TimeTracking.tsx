'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

interface TimeTrackingProps {
  contracts?: any[]
  selectedContractId?: number | null
  onSelectContract?: (id: number | null) => void
  isRunning?: boolean
  time?: number
  onStart?: () => void
  onStop?: () => void
  onSaveEntry?: (entry: any) => void
  entries?: any[]
}

export default function TimeTracking({ contracts = [], selectedContractId = null, onSelectContract, isRunning = false, time = 0, onStart, onStop, onSaveEntry, entries = [] }: TimeTrackingProps) {
  const timeRef = useRef(0)

  useEffect(() => {
    timeRef.current = time
  }, [time])


  const selectedContract = contracts.find((c) => c.id === selectedContractId)

  const hours = Math.floor(timeRef.current / 3600)
  const minutes = Math.floor((timeRef.current % 3600) / 60)
  const seconds = timeRef.current % 60

  return (
    <div className="w-full">
      <motion.h1 variants={itemVariants} initial="hidden" animate="visible"
        className="sticky top-0 bg-dark z-40 px-4 md:px-8 py-8 text-4xl font-light"
      >
        Time Tracking
      </motion.h1>

      <div className="px-4 md:px-8 py-4">


      <motion.div className="fixed top-8 right-8 z-30">
        <div className="text-7xl text-mint font-sans font-medium tracking-tight">
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </motion.div>


      <motion.div variants={itemVariants} initial="hidden" animate="visible"
        className="bg-surface pl-0 pr-0 py-0"
      >
        <motion.h2 variants={itemVariants} initial="hidden" animate="visible" className="text-left text-xl font-light mb-4">Today's Entries</motion.h2>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              variants={itemVariants}
              className="flex items-center justify-between bg-dark "
            >
              <div>
                <p className="font-light">{entry.contract}</p>
                <p className="text-cream/50 font-mono text-xs">{entry.rate}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-mint">{entry.earnings}</p>
                <p className="text-cream/50 font-mono text-xs">{entry.duration}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      </div>
    </div>
  )
}
