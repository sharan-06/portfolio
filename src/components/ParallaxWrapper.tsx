'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5])
  const y       = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <motion.div style={{ scale, opacity, y, transformOrigin: 'center top' }}>
        {children}
      </motion.div>
    </div>
  )
}
