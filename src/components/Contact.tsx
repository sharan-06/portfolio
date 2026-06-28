'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const GOLD = '#FFD700'

const LG: React.CSSProperties = {
  background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 55%, rgba(255,215,0,0.04) 100%)',
  backdropFilter: 'blur(28px) saturate(180%) brightness(1.04)',
  WebkitBackdropFilter: 'blur(28px) saturate(180%) brightness(1.04)',
  border: '1px solid rgba(255,255,255,0.16)',
  borderRadius: 20,
  boxShadow: [
    'inset 0 1px 0 rgba(255,255,255,0.26)',
    'inset 0 -1px 0 rgba(0,0,0,0.16)',
    '0 20px 60px rgba(0,0,0,0.50)',
    '0 2px 8px rgba(0,0,0,0.28)',
  ].join(', '),
  padding: 40,
}

interface ContactLinkProps { label: string; platform: string; handle: string; href: string }

function ContactLink({ label, platform, handle, href }: ContactLinkProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const rawX   = useMotionValue(0)
  const x      = useSpring(rawX, { stiffness: 200, damping: 20 })

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !rowRef.current) return
    const rect = rowRef.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top  + rect.height / 2)
    const d  = Math.sqrt(dx * dx + dy * dy)
    rawX.set(d < 100 && d > 0 ? -(dx / d) * (1 - d / 100) * 24 : 0)
  }

  return (
    <motion.div
      ref={rowRef}
      style={isMobile ? {} : { x }}
      onMouseMove={onMove}
      onMouseLeave={() => { if (!isMobile) rawX.set(0) }}
    >
      <a href={href} target="_blank" rel="noopener noreferrer"
        style={{ display: 'block', textDecoration: 'none', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#A0A0A0', letterSpacing: '0.2em', marginBottom: 4 }}>{label}</div>
        <div className="bebas" style={{ fontSize: 36, color: '#FFFFFF', lineHeight: 1.1, marginBottom: 4 }}>{platform}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: GOLD }}>{handle}</div>
      </a>
    </motion.div>
  )
}

const LINKS: ContactLinkProps[] = [
  { label: 'FIND ME ON',  platform: 'GITHUB',   handle: 'github.com/sharan-06',          href: 'https://github.com/sharan-06' },
  { label: 'FIND ME ON',  platform: 'LINKEDIN',  handle: 'https://www.linkedin.com/in/sharavanan-rajadurai/',     href: 'https://www.linkedin.com/in/sharavanan-rajadurai/' },
  { label: 'REACH ME AT', platform: 'EMAIL',     handle: 'rvsharan2007@gmail.com', href: 'rvsharan2007@gmail.com' },
]

export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [status,  setStatus]  = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '88b7c4c9-fcf8-48de-a159-901ff943ebb7',
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Contact from ${form.name}`,
        }),
      })
      const result = await response.json()
      if (result.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const field = (name: string): React.CSSProperties => ({
    background: 'transparent', border: 'none',
    borderBottom: `1px solid ${focused === name ? GOLD : 'rgba(255,255,255,0.15)'}`,
    borderRadius: 0, color: '#FFFFFF',
    fontFamily: 'var(--font-mono)', fontSize: 16,
    padding: '14px 0', width: '100%', outline: 'none',
    transition: 'border-color 150ms linear', resize: 'none',
  })

  return (
    <section id="contact" className="contact-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: GOLD, letterSpacing: '0.2em', marginBottom: 16 }}>
          INITIATE CONTACT
        </div>
        <h2 className="bebas contact-heading">
          LET&apos;S BUILD SOMETHING.
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#A0A0A0', marginBottom: 48 }}>
          Open to full-time roles, internships, and high-signal collaborations.
        </p>

        <div style={{ borderTop: '1px solid rgba(255,215,0,0.12)', marginBottom: 56 }} />

        <div className="contact-layout">
          {/* Links — first in DOM (order 1 on mobile, order 2 on desktop) */}
          <div className="contact-links-panel" style={LG}>
            {LINKS.map((l) => <ContactLink key={l.platform} {...l} />)}
          </div>

          {/* Form — second in DOM (order 2 on mobile, order 1 on desktop) */}
          <div className="contact-form-panel" style={LG}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {(['name', 'email'] as const).map((f) => (
                <div key={f}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#808080', letterSpacing: '0.2em', marginBottom: 8 }}>
                    {f.toUpperCase()}
                  </label>
                  <input
                    type={f === 'email' ? 'email' : 'text'}
                    value={form[f]}
                    onChange={(e) => setForm(prev => ({ ...prev, [f]: e.target.value }))}
                    onFocus={() => setFocused(f)} onBlur={() => setFocused(null)}
                    style={field(f)}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#808080', letterSpacing: '0.2em', marginBottom: 8 }}>MESSAGE</label>
                <textarea rows={4} value={form.message}
                  onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  style={field('message') as React.CSSProperties}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    background: status === 'success' ? '#00C853' : status === 'error' ? '#FF3D00' : GOLD,
                    color: '#050505', fontFamily: 'var(--font-mono)',
                    fontWeight: 700, fontSize: 13, letterSpacing: '0.2em',
                    padding: '18px', border: 'none', borderRadius: 10,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    width: '100%',
                    transition: 'background 0.2s linear, box-shadow 150ms linear',
                    boxShadow: '0 4px 20px rgba(255,215,0,0.25)',
                    opacity: status === 'sending' ? 0.7 : 1,
                  }}
                >
                  {status === 'idle'    && 'SEND MESSAGE →'}
                  {status === 'sending' && 'SENDING...'}
                  {status === 'success' && 'MESSAGE SENT ✓'}
                  {status === 'error'   && 'FAILED — TRY AGAIN'}
                </button>
                {status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: 11, marginTop: 12,
                      color: status === 'success' ? '#00C853' : '#FF3D00',
                    }}
                  >
                    {status === 'success' && '> MESSAGE RECEIVED. I WILL RESPOND SHORTLY.'}
                    {status === 'error'   && '> SEND FAILED. EMAIL ME DIRECTLY INSTEAD.'}
                  </motion.div>
                )}
              </div>
            </form>
          </div>
        </div>

        <div style={{ paddingTop: 80, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#606060' }}>
          © 2026 SHARAVANAN R. BUILT WITH PURPOSE.
        </div>
      </div>
    </section>
  )
}
