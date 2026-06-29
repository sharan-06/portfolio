'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'

const ENTRIES = [
  {
    year: '2023-2024',
    title: 'HIGHER SECONDARY SCHOOL',
    desc: 'Foundation in science and first exposure to electronics and circuits. Passed out with 91.3%',
  },
  {
    year: '2024-2028',
    title: "BACHELOR'S DEGREE AT ECE",
    desc: 'Began B.E. ECE at Rajalakshmi Institute of Technology, Chennai with a Grade of 8.34 CGPA',
  },
  {
    year: '2025',
    title: 'MY FIRST INTERNSHIP',
    desc: 'Got my first remote Internship at 1M1B Foundation and started to work as Green Intern from May 2025 to June 2025',
  },
  {
    year: '2026',
    title: 'WON 2ND PRIZE IN GREENVERSE HACKATHON',
    desc: 'Competed among 20 teams and won 2nd prize in EDITHLY SPONSORSHIP happened in Mahalakshmi Tech campus at March 9 2026.',
  },
  {
    year: '2026',
    title: 'PRESENTED RESEARCH PAPER AT IEEE INTERNATIONAL CONFERENCE',
    desc: 'Presented the Research paper at IEEE Third International Conference at SRM Institute of Science and Technology, Chennai at April 7 2026',
  },
]

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isDesktop
}

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  })

  return (
    <section className="journey-section">
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="mono" style={{ fontSize: 11, color: '#FFD700', letterSpacing: '0.2em', marginBottom: 16 }}>
          TIMELINE
        </div>
        <h2 className="bebas journey-heading">MY JOURNEY.</h2>

        <div ref={sectionRef} className="journey-inner">
          {/* Base track */}
          <div className="journey-track" />

          {/* Scroll-driven fill */}
          <motion.div
            className="journey-fill"
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
          />

          {ENTRIES.map((entry, i) => {
            const side = i % 2 === 0 ? 'left' : 'right'
            const xInitial = isDesktop ? (i % 2 === 0 ? -40 : 40) : -16

            return (
              <div key={`${entry.year}-${i}`} className="journey-entry">
                <div className="journey-dot" />
                <div className="journey-connector" />

                <motion.div
                  className={`journey-card journey-card--${side}`}
                  initial={{ opacity: 0, x: xInitial }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: '-50px' }}
                  transition={{ duration: 0.25, ease: 'linear', delay: i * 0.05 }}
                >
                  <div className="mono journey-year">{entry.year}</div>
                  <div className="bebas journey-title">{entry.title}</div>
                  <div className="mono journey-desc">{entry.desc}</div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
