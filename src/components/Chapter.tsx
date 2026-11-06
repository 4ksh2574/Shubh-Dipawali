import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import type { Kanda } from '../data/story'
import Scene from './Scene'

export default function Chapter({ k, onPrev, onNext }: { k: Kanda; onPrev?: () => void; onNext: () => void }) {
  const reduced = useReducedMotion()

  return (
    <section id={`k${k.id}`} data-k={k.id} className="cinema-chapter" aria-label={`${k.en} cinematic chapter`}>
      {k.beats.map((beat, index) => (
        <article className="cinema-frame" key={`${k.id}-scene-${index}`}>
          <Scene k={k} sceneIndex={index} />
          <div className="cinema-vignette" aria-hidden="true" />
          <div className="cinema-topline">
            <span>श्री रामायण</span>
            <span>CHAPTER {String(k.id).padStart(2, '0')} <i>✦</i> SCENE {String(index + 1).padStart(2, '0')}</span>
          </div>
          <motion.div
            className="cinema-caption"
            initial={reduced ? false : { opacity: 0, y: 38, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ amount: 0.35 }}
            transition={{ duration: reduced ? 0 : 1, ease: [0.2, 0.75, 0.2, 1] }}
          >
            {index === 0 && <>
              <p className="cinema-kicker"><Sparkles size={13} /> THE RAMAYANA · SEVEN KANDAS</p>
              <h2 className="deva cinema-title">{k.hi}</h2>
              <p className="cinema-subtitle">{k.en}</p>
              <p className="cinema-theme">“{k.line}”</p>
            </>}
            <div className="cinema-story-row">
              <span className="cinema-scene-count">{String(index + 1).padStart(2, '0')} <i>/</i> {String(k.beats.length).padStart(2, '0')}</span>
              <p className="cinema-story">{beat}</p>
            </div>
            <div className="cinema-progress" aria-label={`Scene ${index + 1} of ${k.beats.length}`}>
              {k.beats.map((_, i) => <span key={i} className={i <= index ? 'is-past' : ''} />)}
            </div>
            {index === k.beats.length - 1 && (
              <div className="cinema-actions">
                {onPrev && <button className="cinema-secondary" onClick={onPrev}><ArrowLeft size={15} /> Previous Kanda</button>}
                <button className="cinema-primary" onClick={onNext}>{k.id === 7 ? 'See the festival of light' : 'Next chapter'} <ArrowRight size={16} /></button>
              </div>
            )}
          </motion.div>
          {index < k.beats.length - 1 && <div className="cinema-scroll-hint" aria-hidden="true"><span /> SCROLL TO CONTINUE</div>}
        </article>
      ))}
    </section>
  )
}
