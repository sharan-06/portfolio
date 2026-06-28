'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Journey from '@/components/Journey'
import Contact from '@/components/Contact'
import ParallaxWrapper from '@/components/ParallaxWrapper'

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
