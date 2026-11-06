import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Props = { onDone: () => void }

export default function Intro({ onDone }: Props) {
  const [lit, setLit] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const done = useRef(false)
  const reduced = useReducedMotion()

  const finish = () => {
    if (done.current) return
    done.current = true
    if (timer.current) clearTimeout(timer.current)
    onDone()
  }

  const light = () => {
    if (lit) return
    setLit(true)
    if (reduced) finish()
    else timer.current = setTimeout(finish, 1800)
  }

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  return (
    <motion.main
      key="intro"
      className="intro-screen"
      aria-label="Welcome to Shree Ramayana"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.55 } }}
    >
      <div className="intro-aura" />
      <div className="intro-content">
        <p className="eyebrow">A JOURNEY THROUGH THE RAMAYANA</p>
        <button className="diya-button" onClick={light} disabled={lit} aria-label="Light the diya to begin">
          <motion.svg viewBox="0 0 160 160" width="160" height="160" aria-hidden="true">
            <defs>
              <radialGradient id="flame"><stop stopColor="#fff5c8"/><stop offset=".55" stopColor="#ffc45e"/><stop offset="1" stopColor="#ed7b25"/></radialGradient>
              <linearGradient id="bowl" x2="0" y2="1"><stop stopColor="#f0b44e"/><stop offset="1" stopColor="#8e451e"/></linearGradient>
            </defs>
            <motion.ellipse cx="80" cy="78" rx="51" ry="55" fill="#f5ad3e" opacity=".12" animate={{ opacity: lit ? [.14,.34,.14] : .08 }} transition={{ duration: 1.8, repeat: lit && !reduced ? Infinity : 0 }}/>
            <motion.path d="M80 19 C56 48 66 64 80 73 C95 63 104 46 80 19Z" fill="url(#flame)" animate={lit && !reduced ? { scale:[1,1.07,.98,1] } : { scale: lit ? 1 : .68, opacity: lit ? 1 : .6 }} style={{ transformOrigin:'80px 72px' }} transition={{ duration:1.3, repeat:lit && !reduced ? Infinity : 0 }}/>
            <path d="M36 91 Q80 130 124 91 Q117 132 80 137 Q43 132 36 91Z" fill="url(#bowl)" stroke="#ffda83" strokeWidth="2"/>
            <path d="M42 96 Q80 111 118 96" fill="none" stroke="#ffe7ad" strokeWidth="2"/>
          </motion.svg>
        </button>
        <h1 className="deva intro-title">श्री रामायण</h1>
        <p className="intro-subtitle">The Return of Light</p>
        <div className="intro-mantra deva" aria-label="From untruth lead me to truth; from darkness lead me to light">
          <p>असतो मा सद्गमय</p>
          <p>तमसो मा ज्योतिर्गमय</p>
        </div>
        <p className="intro-translation">From darkness, lead me to light.</p>
        <p className="intro-instruction">{lit ? 'A story of courage, devotion and homecoming…' : 'Touch the diya to begin'}</p>
      </div>
      <button className="skip-intro" onClick={finish}>Skip introduction <span aria-hidden="true">↗</span></button>
    </motion.main>
  )
}
