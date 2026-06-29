'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GOLD = '#FFD700'

const DESKTOP_LINKS = [
  { label: 'ABOUT',      href: '#about'    },
  { label: 'SKILLS',     href: '#skills'   },
  { label: 'PROJECTS',   href: '#projects' },
  { label: 'MY JOURNEY', href: '#journey'  },
]

const MOBILE_LINKS = [
  { label: 'HERO',     href: '#hero'     },
  { label: 'ABOUT',    href: '#about'    },
  { label: 'SKILLS',   href: '#skills'   },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'JOURNEY',  href: '#journey'  },
  { label: 'CONTACT',  href: '#contact'  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    if (href === '#hero' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 60,
        display: 'flex', alignItems: 'center', padding: '0 20px',
        justifyContent: 'space-between',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, rgba(5,5,5,0.55) 100%)',
        backdropFilter: 'blur(28px) saturate(180%) brightness(1.06)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%) brightness(1.06)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 32px rgba(0,0,0,0.35)',
      }}>
        <span className="bebas" style={{ fontSize: 22, color: '#FFFFFF', letterSpacing: '0.04em' }}>
          SR&apos;S PORTFOLIO<span style={{ color: GOLD }}></span>
        </span>

        {/* Hamburger — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setIsOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="nav-hamburger-line"
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2, ease: 'linear' }}
          />
          <motion.span
            className="nav-hamburger-line"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15, ease: 'linear' }}
          />
          <motion.span
            className="nav-hamburger-line"
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2, ease: 'linear' }}
          />
        </button>

        {/* Desktop nav links */}
        <div className="nav-desktop-links">
          {DESKTOP_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleScroll(e, href)}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#A0A0A0', textDecoration: 'none', letterSpacing: '0.15em', transition: 'color 150ms linear' }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = GOLD)}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#A0A0A0')}
            >
              {label}
            </a>
          ))}
          <a
            href="/Resume (2).pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
              color: '#050505', background: GOLD,
              letterSpacing: '0.15em', textDecoration: 'none',
              padding: '8px 18px', borderRadius: 8,
              transition: 'background 150ms linear, box-shadow 150ms linear',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 12px rgba(255,215,0,0.35)',
            }}
            onMouseEnter={(e) => { const a = e.target as HTMLAnchorElement; a.style.background = '#FFFFFF'; a.style.boxShadow = '0 2px 16px rgba(255,255,255,0.40)' }}
            onMouseLeave={(e) => { const a = e.target as HTMLAnchorElement; a.style.background = GOLD;    a.style.boxShadow = '0 2px 12px rgba(255,215,0,0.35)' }}
          >
            RESUME →
          </a>
        </div>
      </nav>

      {/* Mobile dropdown — compact panel below hamburger */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'linear' }}
            style={{
              position: 'fixed',
              top: 68,
              right: 16,
              zIndex: 90,
              minWidth: 180,
              background: 'rgba(8,8,8,0.96)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
            }}
          >
            {MOBILE_LINKS.map(({ label, href }, i) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleScroll(e, href)}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: '#A0A0A0',
                  letterSpacing: '0.15em',
                  textDecoration: 'none',
                  padding: '13px 20px',
                  borderBottom: i < MOBILE_LINKS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  transition: 'color 150ms linear',
                }}
                onTouchStart={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = GOLD)}
                onTouchEnd={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#A0A0A0')}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = GOLD)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#A0A0A0')}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
