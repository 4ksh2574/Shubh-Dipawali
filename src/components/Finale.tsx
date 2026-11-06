import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Sparkles } from 'lucide-react'

export default function Finale() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const lamps = Array.from({ length: 42 }, (_, index) => index)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    let animation = 0
    let particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; hue: number }> = []
    let tick = 0

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(canvas.clientWidth * ratio)
      canvas.height = Math.floor(canvas.clientHeight * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduced) {
      context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      const glow = context.createRadialGradient(canvas.clientWidth / 2, canvas.clientHeight / 2, 8, canvas.clientWidth / 2, canvas.clientHeight / 2, canvas.clientWidth * 0.65)
      glow.addColorStop(0, 'rgba(255,190,90,.16)')
      glow.addColorStop(1, 'rgba(255,190,90,0)')
      context.fillStyle = glow
      context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    } else {
      const draw = () => {
        tick += 1
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        context.fillStyle = 'rgba(7, 10, 26, 0.22)'
        context.fillRect(0, 0, width, height)

        if (tick % 62 === 0 && particles.length < 240) {
          const x = width * (0.12 + Math.random() * 0.76)
          const y = height * (0.08 + Math.random() * 0.34)
          const hue = 28 + Math.random() * 34
          for (let i = 0; i < 34; i += 1) {
            const angle = Math.random() * Math.PI * 2
            const speed = 0.7 + Math.random() * 2.1
            particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 54 + Math.random() * 18, hue })
          }
        }

        particles = particles.filter(particle => particle.life > 0)
        particles.forEach(particle => {
          particle.x += particle.vx
          particle.y += particle.vy
          particle.vy += 0.018
          particle.life -= 1
          context.fillStyle = `hsla(${particle.hue}, 96%, 70%, ${Math.min(1, particle.life / 42)})`
          context.fillRect(particle.x, particle.y, 2, 2)
        })
        animation = window.requestAnimationFrame(draw)
      }
      animation = window.requestAnimationFrame(draw)
    }

    return () => {
      window.cancelAnimationFrame(animation)
      window.removeEventListener('resize', resize)
      particles = []
    }
  }, [reduced])

  return (
    <section id="finale" aria-labelledby="finale-title" className="finale-section">
      <canvas ref={canvasRef} className="finale-canvas" aria-hidden="true" />
      <div className="finale-horizon" aria-hidden="true" />
      <motion.div className="pushpak" initial={{ x: '-65vw', opacity: 0 }} whileInView={{ x: '0vw', opacity: 1 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 5, ease: 'easeOut' }} aria-hidden="true">
        <svg viewBox="0 0 250 90" role="presentation">
          <path d="M20 48 Q125 -8 230 48 Q125 76 20 48Z" fill="#d79a4c" stroke="#ffe0a0" strokeWidth="2" />
          <path d="M82 38 Q125 6 168 38 L155 53 H95Z" fill="#f8d58c" />
          <path d="M125 16 V4 M119 10 H131" stroke="#ffe7b3" strokeWidth="3" strokeLinecap="round" />
          <circle cx="125" cy="43" r="7" fill="#fff2c3" />
        </svg>
      </motion.div>
      <div className="finale-copy">
        <p className="eyebrow finale-eyebrow"><Sparkles size={14} /> THE RETURN OF LIGHT</p>
        <motion.h2 id="finale-title" className="deva finale-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 1.4 }}>शुभ दीपावली</motion.h2>
        <motion.p className="deva finale-hindi" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: reduced ? 0 : 0.8, duration: 1.2 }}>जब सत्य लौटता है, तब हर घर अयोध्या बन जाता है।</motion.p>
        <motion.p className="finale-english" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: reduced ? 0 : 1.5, duration: 1.2 }}>May the light of wisdom, kindness and courage always find its way home.</motion.p>
        <motion.p className="deva finale-jai" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: reduced ? 0 : 2.2, duration: 1.2 }}>जय श्री राम</motion.p>
      </div>
      <div className="diya-row" aria-hidden="true">
        {lamps.map(index => <motion.span key={index} className="final-diya" initial={{ opacity: 0.25, boxShadow: '0 0 0 rgba(255,184,75,0)' }} whileInView={{ opacity: 1, boxShadow: '0 0 18px 4px rgba(255,184,75,.36)' }} viewport={{ once: true }} transition={{ delay: reduced ? 0 : index * 0.055, duration: 0.7 }} />)}
      </div>
      <button className="finale-restart" onClick={() => document.getElementById('k1')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })}>Walk the story again <ArrowUpRight size={16} /></button>
      <p className="finale-footnote">A small tribute to a story told in many voices, across generations.</p>
    </section>
  )
}
