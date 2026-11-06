import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'
import type { Kanda } from '../data/story'
import Scene from './Scene'

export default function Chapter({ k, onPrev, onNext }: { k: Kanda; onPrev?: () => void; onNext: () => void }) {
  const reduced = useReducedMotion()

  return (
    <section id={`k${k.id}`} data-k={k.id} className="chapter-section" aria-labelledby={`chapter-title-${k.id}`}>
      <div className="chapter-backdrop" aria-hidden="true">
        <Scene k={k} />
        <div className="chapter-shade" />
      </div>

      <div className="chapter-content">
        <div className="chapter-heading">
          <p className="eyebrow">CHAPTER {String(k.id).padStart(2, '0')} <span>·</span> 07</p>
          <motion.p className="chapter-number" initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>THE RAMAYANA</motion.p>
          <motion.h2
            id={`chapter-title-${k.id}`}
            className="deva chapter-title"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >{k.hi}</motion.h2>
          <p className="chapter-english">{k.en}</p>
          <p className="chapter-quote">“{k.line}”</p>
          <span className="heading-ornament" aria-hidden="true">✦</span>
        </div>

        <div className="story-list" aria-label={`${k.en} story`}>
          {k.beats.map((beat, index) => (
            <motion.article
              key={`${k.id}-${index}`}
              className="story-beat"
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7, delay: reduced ? 0 : 0.04 }}
            >
              <div className="beat-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
              <div className="beat-copy"><p>{beat}</p></div>
            </motion.article>
          ))}
        </div>

        <div className="chapter-footer">
          {onPrev ? <button className="outline-action" onClick={onPrev}><ArrowLeft size={16} /> Previous Kanda</button> : <span className="chapter-begin-note"><BookOpen size={15} /> The journey begins</span>}
          <button className="primary-action" onClick={onNext}>{k.id === 7 ? 'Enter the Diwali finale' : 'Continue the journey'} <ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  )
}
