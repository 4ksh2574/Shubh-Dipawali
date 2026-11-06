import type { Kanda } from '../data/story'
import { motion, useReducedMotion } from 'motion/react'

export default function Scene({ k }: { k: Kanda }) {
  const reduced = useReducedMotion()
  return (
    <svg className="scene-art" viewBox="0 0 400 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id={`sky-${k.id}`} x2="0" y2="1">{k.sky.map((color, i) => <stop key={color} offset={`${i * 50}%`} stopColor={color} />)}</linearGradient>
        <linearGradient id={`sea-${k.id}`} x2="0" y2="1"><stop stopColor="#285d83"/><stop offset="1" stopColor="#07182d"/></linearGradient>
      </defs>
      <rect width="400" height="600" fill={`url(#sky-${k.id})`} />
      {Array.from({ length: 20 }, (_, i) => <motion.circle key={i} cx={(i * 79 + 17) % 400} cy={(i * 47 + 23) % 310} r={i % 3 ? 1 : 1.5} fill="#fff5d8" animate={reduced ? undefined : { opacity: [.2,.8,.2] }} transition={{ duration: 3 + i % 3, repeat: Infinity, delay: i * .05 }} />)}
      <circle cx="300" cy="160" r="52" fill="#ffe1a0" opacity=".65" />
      {k.motif === 'palace' && <g fill="#241a32" stroke="#e7b76c" strokeWidth="2"><path d="M30 540V420h60v-40h40v40h30v120zm220 0V420h30v-40h40v40h50v120z"/><path d="M90 420Q200 260 310 420Z"/><rect x="105" y="420" width="190" height="120"/><path d="M180 540v-75q20-40 40 0v75" fill="#090f22"/></g>}
      {k.motif === 'forest' && <g fill="#0d3028">{Array.from({length:11},(_,i)=><path key={i} d={`M${i*42-4} 570l-25-100 25 18-18-80 18 16 20-16-13 83 28-21-35 100z`}/>)}</g>}
      {k.motif === 'hills' && <g><path d="M0 520l86-130 64 90 84-150 96 150 70-90v210H0" fill="#241d34"/><path d="M0 555l110-110 64 75 108-120 118 120v80H0" fill="#38283a"/></g>}
      {(k.motif === 'ocean' || k.motif === 'bridge') && <g><path d="M0 420q100-22 200 0t200 0v180H0" fill={`url(#sea-${k.id})`}/>{k.motif === 'bridge' && <path d="M0 432q80-34 160-12t160-10 80 10v35q-80-12-160 0t-160 0-80 7" fill="#bd9b75"/>}{k.lanka && <g fill="#21152e" stroke="#f3bd73"><path d="M284 430V345l28-45 28 45v85zm54 0v-65l18-30 18 30v65z"/></g>}</g>}
      <path d="M0 575q100-24 200 0t200 0" fill="none" stroke="#f0bd70" strokeOpacity=".25" />
    </svg>
  )
}
