'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Project {
  id: number
  title: string
  category: string
  status: string
  statusColor: string
  role: string
  description: string
  stack: string[]
  github: string
  image: string
  featured: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: 'INNSOLE',
    category: 'HARDWARE',
    status: 'MVP COMPLETE',
    statusColor: '#FFD700',
    role: 'Lead Hardware Engineer',
    description: 'Peltier-based portable medical storage carrier with embedded temperature regulation and real-time thermal monitoring.',
    stack: ['Li-Po Battery', 'DC-DC Buck converter', 'Peltier Module', 'Hardware Debugging'],
    github: 'https://github.com/sharan-06/innsole',
    image: '/innsole.png',
    featured: true,
  },
  {
    id: 2,
    title: 'TRACKEASY',
    category: 'BACKEND',
    status: 'PROTOTYPE',
    statusColor: '#FFB800',
    role: 'Backend Engineer',
    description: 'Scalable backend infrastructure for real-time tracking and logistics management system.',
    stack: ['Flutter','Dart', 'OpenStreetMap API', 'Firebase'],
    github: 'https://github.com/sharan-06/track_easy',
    image: '',
    featured: false,
  },
  {
    id: 3,
    title: 'PRINT-E',
    category: 'BACKEND',
    status: 'PROTOTYPE',
    statusColor: '#FFB800',
    role: 'Backend Engineer',
    description: 'Automated print job management and routing system with queue optimization.',
    stack: ['Python', 'NoSQL', 'Firebase', 'Next.js'],
    github: '#',
    image: '/printe.png',
    featured: false,
  },
  {
    id: 4,
    title: 'KERA AIR',
    category: 'BACKEND',
    status: 'PROTOTYPE',
    statusColor: '#FFB800',
    role: 'Backend Engineer',
    description: 'Air quality monitoring backend with real-time sensor data aggregation and analytics pipeline.',
    stack: ['Next.js', 'MQTT', 'Firebase', 'NoSQL'],
    github: 'https://github.com/i-am-sarath/kera-air',
    image: '',
    featured: false,
  },
  {
    id: 5,
    title: 'HIGH NOON TRIVIA',
    category: 'FULLSTACK',
    status: 'COMPLETE',
    statusColor: '#FFD700',
    role: 'Full Stack Developer',
    description: 'Real-time multiplayer trivia game with live scoring, room management, and leaderboard system.',
    stack: ['Next.js', 'Open-Trivia API'],
    github: 'https://github.com/sharan-06/High-Noon-Trivia',
    image: '/highnoontrivia.png',
    featured: false,
  },
  {
    id: 6,
    title: 'SOLO LEVELLING APP',
    category: 'FULLSTACK',
    status: 'COMPLETE',
    statusColor: '#FFD700',
    role: 'Full Stack Developer',
    description: 'Gamified personal productivity app with habit tracking, XP system, and progression mechanics.',
    stack: ['Google ML Training Kit', 'Flutter', 'Isar'],
    github: 'https://github.com/sharan-06/arise',
    image: '/sololevelling.png',
    featured: false,
  },
  {
    id: 7,
    title: 'CROWDSHIELD',
    category: 'FRONTEND',
    status: 'PROTOTYPE',
    statusColor: '#FFB800',
    role: 'Frontend Engineer',
    description: 'Crowd safety monitoring dashboard with real-time density visualization and alert system.',
    stack: ['Edge-AI', 'Next.js', 'ESP32'],
    github: 'https://github.com/i-am-sarath/crowd-shield',
    image: '/crowdshield.png',
    featured: false,
  },
  {
    id: 8,
    title: 'J.A.R.V.I.S',
    category: 'IN DEV',
    status: 'IN DEVELOPMENT',
    statusColor: '#8A2BE2',
    role: 'Systems Architect',
    description: 'Autonomous backend system parsing natural language into system-level commands via local LLM control loops.',
    stack: ['Python', 'Ollama', 'FastAPI', 'Linux'],
    github: 'https://github.com/sharan-06/JARVIS',
    image: '',
    featured: false,
  },
]

const FILTERS = ['ALL', 'HARDWARE', 'BACKEND', 'FULLSTACK', 'FRONTEND', 'IN DEV']

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false)
  const showImg = src && !err
  return (
    <div style={{
      aspectRatio: '16/9',
      position: 'relative',
      width: '100%',
      background: '#0a0a0a',
      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {showImg && (
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          onError={() => setErr(true)}
        />
      )}
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.35, ease: 'linear', delay: index * 0.08 }}
      className={`proj-card${project.featured ? ' proj-card--featured' : ''}`}
    >
      {/* Category + status row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="mono" style={{ fontSize: 9, color: '#A0A0A0', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {project.category}
        </span>
        <span className="mono" style={{
          fontSize: 9,
          color: project.statusColor,
          border: `1px solid ${project.statusColor}`,
          padding: '2px 8px',
        }}>
          {project.status}
        </span>
      </div>

      {/* Image */}
      <ProjectImage src={project.image} alt={project.title} />

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <span className="mono" style={{ fontSize: 10, color: '#FFD700', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {project.role}
        </span>
        <h3
          className={`bebas ${project.featured ? 'proj-title--featured' : 'proj-title'}`}
          style={{ color: '#FFFFFF', lineHeight: 1 }}
        >
          {project.title}
        </h3>
        <p className={`mono proj-desc${project.featured ? ' proj-desc--featured' : ''}`}
          style={{ fontSize: 12, color: '#A0A0A0', lineHeight: 1.6 }}
        >
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.stack.map(tag => (
            <span key={tag} className="mono" style={{
              fontSize: 9,
              border: '1px solid rgba(255,255,255,0.12)',
              padding: '3px 8px',
              color: '#A0A0A0',
            }}>
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.github}
          className="mono"
          style={{
            fontSize: 10,
            color: '#FFD700',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            marginTop: 'auto',
            paddingTop: 8,
            display: 'block',
          }}
        >
          [ VIEW ON GITHUB → ]
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const filtered = activeFilter === 'ALL'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section className="proj-section">
      <div className="proj-inner">
        {/* Heading + filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mono" style={{ fontSize: 11, color: '#FFD700', letterSpacing: '0.2em', marginBottom: 8 }}>
            SELECTED WORK
          </div>
          <h2 className="bebas proj-heading">PROJECTS.</h2>
          <div className="mono proj-count">
            08 PROJECTS // HARDWARE · BACKEND · FULLSTACK
          </div>

          {/* Filter bar */}
          <div className="filter-bar">
            <div className="filter-buttons">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="mono"
                  style={{
                    fontSize: 10,
                    padding: '8px 16px',
                    background: 'transparent',
                    border: `1px solid ${activeFilter === f ? '#FFD700' : 'rgba(255,255,255,0.12)'}`,
                    color: activeFilter === f ? '#FFD700' : '#A0A0A0',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    borderRadius: 0,
                    transition: 'all 150ms linear',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="proj-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
