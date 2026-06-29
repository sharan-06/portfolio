'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface SphereData {
  sprite: THREE.Sprite
  texture: THREE.CanvasTexture
  vx: number
  vy: number
}

const SKILLS = [
  { name: 'React',    logo: '/react.png'    },
  { name: 'C++',      logo: '/c++.png'      },
  { name: 'C',        logo: '/c.png'        },
  { name: 'Firebase', logo: '/firebase.png' },
  { name: 'Java',     logo: '/java.png'     },
  { name: 'Supabase', logo: '/supabase.png' },
]

const TEX_PX = 1024

function buildSphereCanvas(logoSrc: string): THREE.CanvasTexture {
  const sz = TEX_PX
  const cv = document.createElement('canvas')
  cv.width  = sz
  cv.height = sz
  const ctx = cv.getContext('2d')!
  const cx = sz / 2, cy = sz / 2, R = sz / 2 - 4

  ctx.save()
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip()
  ctx.fillStyle = '#1A1A1A'
  ctx.fillRect(0, 0, sz, sz)
  ctx.restore()

  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace

  const img = new Image()
  img.onload = () => {
    ctx.save()
    ctx.beginPath(); ctx.arc(cx, cy, R - 2, 0, Math.PI * 2); ctx.clip()
    ctx.drawImage(img, cx - (R - 2), cy - (R - 2), (R - 2) * 2, (R - 2) * 2)
    ctx.restore()

    ctx.save()
    ctx.beginPath(); ctx.arc(cx, cy, R - 1, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,255,255,0.20)'
    ctx.lineWidth = 6
    ctx.stroke()
    ctx.restore()

    tex.needsUpdate = true
  }
  img.src = logoSrc
  return tex
}

export default function Skills() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const isMobile = window.innerWidth < 768
    const SPRITE_SIZE = isMobile ? 1.2 : 1.6
    const RADIUS = SPRITE_SIZE / 2

    const W = mount.clientWidth, H = mount.clientHeight

    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const vFOV = THREE.MathUtils.degToRad(camera.fov)
    const visH = 2 * Math.tan(vFOV / 2) * camera.position.z
    const visW = visH * (W / H)
    const bX   = visW / 2 - RADIUS
    const bY   = visH / 2 - RADIUS

    const spheres: SphereData[] = SKILLS.map((skill) => {
      const texture = buildSphereCanvas(skill.logo)
      const mat     = new THREE.SpriteMaterial({ map: texture, transparent: true })
      const sprite  = new THREE.Sprite(mat)
      sprite.scale.set(SPRITE_SIZE, SPRITE_SIZE, 1)
      sprite.position.set(
        (Math.random() - 0.5) * visW * 0.60,
        (Math.random() - 0.5) * visH * 0.60, 0
      )
      scene.add(sprite)
      return { sprite, texture, vx: (Math.random() - 0.5) * 0.01, vy: (Math.random() - 0.5) * 0.01 }
    })

    const toWorld = (cx: number, cy: number) => {
      const r = mount.getBoundingClientRect()
      return {
        x: ((cx - r.left) / r.width  * 2 - 1) * (visW / 2),
        y: (-((cy - r.top) / r.height * 2 - 1)) * (visH / 2),
      }
    }

    let drag: SphereData | null = null
    let px = 0, py = 0

    /* ---- Mouse interaction ---- */
    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return
      const { x, y } = toWorld(e.clientX, e.clientY); px = x; py = y
      for (const s of spheres) {
        const dx = s.sprite.position.x - x, dy = s.sprite.position.y - y
        if (Math.sqrt(dx * dx + dy * dy) <= RADIUS * 1.15) {
          drag = s; s.vx = 0; s.vy = 0; mount.style.cursor = 'grabbing'; break
        }
      }
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!drag) return
      const { x, y } = toWorld(e.clientX, e.clientY)
      drag.vx = (x - px) * 0.5; drag.vy = (y - py) * 0.5
      drag.sprite.position.x = x; drag.sprite.position.y = y
      px = x; py = y
    }
    const onUp = () => { drag = null; mount.style.cursor = 'default' }

    /* ---- Touch interaction ---- */
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const rect = mount.getBoundingClientRect()
      const touch = e.touches[0]
      const wx = ((touch.clientX - rect.left) / rect.width  * 2 - 1) * (visW / 2)
      const wy = (-((touch.clientY - rect.top) / rect.height * 2 - 1)) * (visH / 2)
      if (!drag) {
        for (const s of spheres) {
          const dx = s.sprite.position.x - wx, dy = s.sprite.position.y - wy
          if (Math.sqrt(dx * dx + dy * dy) <= RADIUS * 1.15) {
            drag = s; s.vx = 0; s.vy = 0; break
          }
        }
      }
      if (drag) {
        drag.vx = (wx - px) * 0.5; drag.vy = (wy - py) * 0.5
        drag.sprite.position.x = wx; drag.sprite.position.y = wy
      }
      px = wx; py = wy
    }
    const onTouchEnd = () => {
      drag = null
      px = 0; py = 0
    }

    mount.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onUp)
    mount.addEventListener('touchmove', onTouchMove, { passive: false })
    mount.addEventListener('touchend',  onTouchEnd)

    let animId: number
    const tick = () => {
      animId = requestAnimationFrame(tick)
      for (const s of spheres) {
        if (s === drag) continue
        s.vx *= 0.993; s.vy *= 0.993
        s.sprite.position.x += s.vx; s.sprite.position.y += s.vy
        if (s.sprite.position.x >  bX) { s.sprite.position.x =  bX; s.vx *= -0.55 }
        if (s.sprite.position.x < -bX) { s.sprite.position.x = -bX; s.vx *= -0.55 }
        if (s.sprite.position.y >  bY) { s.sprite.position.y =  bY; s.vy *= -0.55 }
        if (s.sprite.position.y < -bY) { s.sprite.position.y = -bY; s.vy *= -0.55 }
        s.vx += -s.sprite.position.x * 0.00020
        s.vy += -s.sprite.position.y * 0.00020
      }
      for (let i = 0; i < spheres.length; i++) {
        for (let j = i + 1; j < spheres.length; j++) {
          const a = spheres[i], b = spheres[j]
          const dx = b.sprite.position.x - a.sprite.position.x
          const dy = b.sprite.position.y - a.sprite.position.y
          const dist = Math.sqrt(dx * dx + dy * dy), minD = RADIUS * 2
          if (dist < minD && dist > 0) {
            const ov = minD - dist, nx = dx / dist, ny = dy / dist
            if (a !== drag) { a.sprite.position.x -= nx * ov / 2; a.sprite.position.y -= ny * ov / 2 }
            if (b !== drag) { b.sprite.position.x += nx * ov / 2; b.sprite.position.y += ny * ov / 2 }
            const dot = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny
            if (dot < 0 && a !== drag && b !== drag) {
              a.vx += dot * nx; a.vy += dot * ny; b.vx -= dot * nx; b.vy -= dot * ny
            }
          }
        }
      }
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight
      camera.aspect = nw / nh; camera.updateProjectionMatrix(); renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      mount.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onUp)
      mount.removeEventListener('touchmove', onTouchMove)
      mount.removeEventListener('touchend',  onTouchEnd)
      window.removeEventListener('resize',    onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
      spheres.forEach(({ sprite, texture }) => {
        ;(sprite.material as THREE.Material).dispose(); texture.dispose()
      })
    }
  }, [])

  return (
    <section className="skills-section">
      <div className="skills-label">TECHNICAL STACK</div>
      <div ref={mountRef} className="skills-canvas" />
    </section>
  )
}
