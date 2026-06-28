'use client'

import { motion } from 'framer-motion'

function CornerBracket({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const isTop  = position[0] === 't'
  const isLeft = position[1] === 'l'
  return (
    <div style={{
      position: 'absolute',
      ...(isTop  ? { top: 24 }    : { bottom: 24 }),
      ...(isLeft ? { left: 24 }   : { right: 24  }),
      width: 24, height: 24, zIndex: 30,
    }}>
      <div style={{ position: 'absolute', ...(isTop ? { top: 0 } : { bottom: 0 }), ...(isLeft ? { left: 0 } : { right: 0 }), width: 24, height: 1, background: '#FFD700' }} />
      <div style={{ position: 'absolute', ...(isTop ? { top: 0 } : { bottom: 0 }), ...(isLeft ? { left: 0 } : { right: 0 }), width: 1, height: 24, background: '#FFD700' }} />
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero-section">

      {/* Gold spotlight */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#D4AF37] rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
      </div>

      {/* Corner brackets */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.3, delay: 2.1 }}
      >
        <CornerBracket position="tl" />
        <CornerBracket position="tr" />
        <CornerBracket position="bl" />
        <CornerBracket position="br" />
      </motion.div>

      {/* Label */}
      <motion.div
        className="hero-label"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        I AM
      </motion.div>

      {/* Giant name — always in flex flow, centered by flex container */}
      <motion.h1
        className="bebas hero-name"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        SHARAVANAN R
      </motion.h1>

      {/* Photo */}
      <motion.div
        className="hero-photo-wrap"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.3 }}
      >
        <img
          src="/sharavanan.png"
          alt="Sharavanan R"
          className="hero-photo-img"
        />
      </motion.div>

      {/* HUD subtitle */}
      <motion.div
        className="hero-hud"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.9 }}
      >
        Undergrad in Bachelor&apos;s of Electronics
      </motion.div>

    </section>
  )
}
