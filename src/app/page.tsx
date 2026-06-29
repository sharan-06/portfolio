'use client'

import dynamic from 'next/dynamic'
import { ReactLenis } from '@studio-freight/react-lenis'
import Navbar from '@/components/Navbar'
import Hero   from '@/components/Hero'
import ParallaxWrapper from '@/components/ParallaxWrapper'

const About    = dynamic(() => import('@/components/About'),    { ssr: true  })
const Skills   = dynamic(() => import('@/components/Skills'),   { ssr: false })
const Projects = dynamic(() => import('@/components/Projects'), { ssr: true  })
const Journey  = dynamic(() => import('@/components/Journey'),  { ssr: true  })
const Contact  = dynamic(() => import('@/components/Contact'),  { ssr: true  })

export default function Home() {
  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <Navbar />
      <Hero />
      <ParallaxWrapper>
        <div id="about"><About /></div>
      </ParallaxWrapper>
      <ParallaxWrapper>
        <div id="skills"><Skills /></div>
      </ParallaxWrapper>
      <ParallaxWrapper>
        <div id="projects"><Projects /></div>
      </ParallaxWrapper>
      <ParallaxWrapper>
        <div id="journey"><Journey /></div>
      </ParallaxWrapper>
      <ParallaxWrapper>
        <Contact />
      </ParallaxWrapper>
    </ReactLenis>
  )
}
