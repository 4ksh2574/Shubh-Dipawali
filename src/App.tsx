import { useEffect, useState } from 'react'
import { AnimatePresence, useReducedMotion } from 'motion/react'
import { ArrowUp, Maximize2, Mic, Music2, Pause, RotateCcw, Sparkles, VolumeX } from 'lucide-react'
import { kandas } from './data/story'
import Intro from './components/Intro'
import Chapter from './components/Chapter'
import Finale from './components/Finale'
import { narrate, setMusic, stopNarration } from './audio'

export default function App() {
  const [intro, setIntro] = useState(true)
  const [active, setActive] = useState(1)
  const [music, setMusicState] = useState(false)
  const [voice, setVoice] = useState(false)
  const [finaleKey, setFinaleKey] = useState(0)
  const reduced = useReducedMotion()
  const speechAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window
  const fullscreenAvailable = typeof document !== 'undefined' && Boolean(document.fullscreenEnabled)

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (intro) return
    const targets = document.querySelectorAll<HTMLElement>('[data-k]')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.k))
      })
    }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 })
    targets.forEach(target => observer.observe(target))
    return () => observer.disconnect()
  }, [intro])

  useEffect(() => {
    if (voice && speechAvailable) narrate(kandas[active - 1]?.beats.join(' ') ?? null)
    else stopNarration()
    return () => stopNarration()
  }, [active, voice, speechAvailable])

  useEffect(() => () => {
    setMusic(false)
    stopNarration()
  }, [])

  const toggleMusic = () => {
    const next = !music
    setMusic(next)
    setMusicState(next)
  }

  const toggleVoice = () => setVoice(current => !current)

  const beginStory = () => {
    setIntro(false)
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }))
  }

  const replayIntro = () => {
    stopNarration()
    setVoice(false)
    setIntro(true)
  }

  const replayFinale = () => {
    setFinaleKey(current => current + 1)
    requestAnimationFrame(() => go('finale'))
  }

  const toggleFullscreen = () => {
    if (!fullscreenAvailable) return
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined)
    else void document.documentElement.requestFullscreen?.().catch(() => undefined)
  }

  return (
    <>
      <AnimatePresence mode="wait">{intro && <Intro onDone={beginStory} />}</AnimatePresence>
      {!intro && <>
        <div className="reading-progress" style={{ width: `${(active / 7) * 100}%` }} aria-hidden="true" />
        <header className="site-header">
          <div className="brand-row">
            <a className="brand-mark" href="#k1" onClick={event => { event.preventDefault(); go('k1') }} aria-label="Shree Ramayana home">
              <span className="brand-diya" aria-hidden="true">✦</span>
              <span><strong className="deva">श्री रामायण</strong><small>The Return of Light</small></span>
            </a>
            <p className="header-note">A Diwali storytelling experience</p>
          </div>
          <nav className="chapter-nav" aria-label="Navigate the seven Kandas">
            {kandas.map(k => <button key={k.id} onClick={() => go(`k${k.id}`)} aria-label={`Go to ${k.en}`} aria-current={active === k.id ? 'step' : undefined} className={active === k.id ? 'chapter-tab is-active' : 'chapter-tab'}>
              <span>{String(k.id).padStart(2, '0')}</span><span className="tab-name">{k.hi}</span>
            </button>)}
          </nav>
        </header>

        <main>
          {kandas.map((k, index) => <Chapter key={k.id} k={k} onPrev={index > 0 ? () => go(`k${k.id - 1}`) : undefined} onNext={() => go(index === 6 ? 'finale' : `k${k.id + 1}`)} />)}
          <Finale key={finaleKey} />
        </main>

        <div className="utility-dock" role="group" aria-label="Story controls">
          <button onClick={toggleMusic} aria-label={music ? 'Turn ambient sound off' : 'Turn ambient sound on'} aria-pressed={music} title={music ? 'Ambient sound on' : 'Ambient sound off'}>{music ? <Music2 size={17} /> : <VolumeX size={17} />}</button>
          <button onClick={toggleVoice} disabled={!speechAvailable} aria-label={voice ? 'Stop narration' : 'Read this Kanda aloud'} aria-pressed={voice} title={speechAvailable ? (voice ? 'Stop narration' : 'Read aloud') : 'Speech is not supported in this browser'}>{voice ? <Pause size={17} /> : <Mic size={17} />}</button>
          <span className="dock-divider" aria-hidden="true" />
          <button onClick={replayIntro} aria-label="Replay introduction" title="Replay introduction"><RotateCcw size={17} /></button>
          <button onClick={replayFinale} aria-label="Go to the Diwali finale" title="Go to the Diwali finale"><Sparkles size={17} /></button>
          {fullscreenAvailable && <button onClick={toggleFullscreen} aria-label="Toggle fullscreen" title="Toggle fullscreen"><Maximize2 size={17} /></button>}
        </div>
        <button className="back-to-top" aria-label="Back to top" onClick={() => go('k1')}><ArrowUp size={17} /></button>
      </>}
    </>
  )
}
