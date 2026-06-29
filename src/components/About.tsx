'use client'

import { Fragment, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const GOLD = '#FFD700'

const LG: React.CSSProperties = {
  background: 'linear-gradient(145deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 55%, rgba(255,215,0,0.04) 100%)',
  backdropFilter: 'blur(28px) saturate(180%) brightness(1.04)',
  WebkitBackdropFilter: 'blur(28px) saturate(180%) brightness(1.04)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 20,
  boxShadow: [
    'inset 0 1px 0 rgba(255,255,255,0.28)',
    'inset 0 -1px 0 rgba(0,0,0,0.16)',
    '0 20px 60px rgba(0,0,0,0.50)',
    '0 2px 8px rgba(0,0,0,0.28)',
  ].join(', '),
}

const DESKTOP_ROWS = [
  { label: 'INSTITUTION', value: 'Rajalakshmi Institute of Technology, Chennai' },
  { label: 'DEGREE',      value: 'B.E. Electronics & Communication' },
  { label: 'YEAR',        value: '2022 — 2026' },
  { label: 'FOCUS',       value: 'Robotics / IoT / Automation / Backend Architecture' },
  { label: 'LOCATION',    value: 'Chennai, Tamil Nadu' },
]

const MOBILE_ROWS = [
  { label: 'INSTITUTION', value: 'RIT Chennai' },
  { label: 'DEGREE',      value: 'B.E. ECE' },
  { label: 'YEAR',        value: '2022 — 2026' },
  { label: 'FOCUS',       value: 'Robotics / IoT / Automation' },
  { label: 'LOCATION',    value: 'Chennai, Tamil Nadu' },
]

export default function About() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const mobileCardStyle: React.CSSProperties = {
    width: '100%',
    marginTop: 36,
    padding: 20,
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 0,
  }

  const statusDot = (
    <motion.span
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      style={{ color: GOLD, fontSize: 9 }}
    >
      ●
    </motion.span>
  )

  return (
    <section className="about-section">
      <motion.div
        className="about-inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.35, ease: 'linear' }}
      >
        {/* Left */}
        <div className="about-left">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: GOLD, letterSpacing: '0.2em', marginBottom: 16 }}>
            WHO I AM
          </div>
          <h2 className="bebas about-heading" style={{ color: '#FFFFFF' }}>
            AUTOMATION ARCHITECT.
          </h2>
          <p className="about-para" style={{ marginBottom: 24 }}>
            Studying Bachelor&apos;s in Electronics and Communication Engineering at Rajalakshmi Institute of Technology, Chennai. Having interests
            in learning Robotics and Automation, Backend Architecture and Embedded systems. Understanding how the systems working
            and debugging the error in the circuits.
          </p>
          <p className="about-para">
            Currently Learning about the Robotics Architecture and the Logic lying behind it.
          </p>
        </div>

        {/* Right — HUD card */}
        <div className="about-right">
          {isMobile ? (
            <div style={mobileCardStyle}>
              <div className="about-hud-grid">
                {MOBILE_ROWS.map(({ label, value }) => (
                  <Fragment key={label}>
                    <span style={{ color: '#808080' }}>{label}:</span>
                    <span style={{ color: '#FFFFFF' }}>{value}</span>
                  </Fragment>
                ))}
                <span style={{ color: '#808080' }}>STATUS:</span>
                <span style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {statusDot}
                  ACTIVELY BUILDING
                </span>
              </div>
            </div>
          ) : (
            <div style={{ ...LG, padding: 36 }}>
              {DESKTOP_ROWS.map(({ label, value }) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 16, marginBottom: 18, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  <span style={{ color: '#808080' }}>{label}:</span>
                  <span style={{ color: '#FFFFFF' }}>{value}</span>
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                <span style={{ color: '#808080' }}>STATUS:</span>
                <span style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {statusDot}
                  ACTIVELY BUILDING
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
