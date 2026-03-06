'use client'

import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate progress bar with random increments
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev
        return prev + Math.random() * 30
      })
    }, 500)

    // Complete on page load
    setProgress(100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[100]">
      <div
        className="h-full bg-gradient-to-r from-coral via-mint to-coral transition-all duration-500 ease-out"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  )
}
