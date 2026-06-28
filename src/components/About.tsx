'use client'

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

export default function About() {
  return (
    <section style={{ padding: '120px 40px', background: '#050505' }}>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'linear' }}
        style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'flex-start' }}
      >
        {/* Left */}
        <div style={{ flex: '0 0 58%' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: GOLD, letterSpacing: '0.2em', marginBottom: 16 }}>
            WHO I AM
          </div>
          <h2 className="bebas" style={{ fontSize: 72, color: '#FFFFFF', lineHeight: 1, marginBottom: 32 }}>
            AUTOMATION ARCHITECT.
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: '#A0A0A0', lineHeight: 1.8, maxWidth: 560, marginBottom: 24 }}>
            Studying Bachelor's in Electronics and Communication Engineering at Rajalakshmi Institute of Technology, Chennai. Having interests 
            in learning Robotics and Automation, Backend Architecture and Embedded systems. Understanding how the systems working
            and debugging the error in the circuits. 
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: '#A0A0A0', lineHeight: 1.8, maxWidth: 560 }}>
            Currently Learning about the Robotics Architecture and the Logic lying behind it.
          </p>
        </div>

        {/* Right — liquid glass HUD card */}
        <div style={{ flex: '0 0 42%' }}>
          <div style={{ ...LG, padding: 36 }}>
            {[
              { label: 'INSTITUTION', value: 'Rajalakshmi Institute of Technology, Chennai' },
              { label: 'DEGREE',      value: 'B.E. Electronics & Communication' },
              { label: 'YEAR',        value: '2024 — 2028' },
              { label: 'FOCUS',       value: 'Robotics / IoT / Automation / Backend Architecture' },
              { label: 'LOCATION',    value: 'Chennai, Tamil Nadu' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 16, marginBottom: 18, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                <span style={{ color: '#808080' }}>{label}:</span>
                <span style={{ color: '#FFFFFF' }}>{value}</span>
              </div>
            ))}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
              <span style={{ color: '#808080' }}>STATUS:</span>
              <span style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 8 }}>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ color: GOLD, fontSize: 9 }}
                >
                  ●
                </motion.span>
                ACTIVELY BUILDING
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
