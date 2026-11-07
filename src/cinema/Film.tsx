import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Maximize, Mic, MicOff, Pause, Play, RotateCcw, SkipForward, Volume2, VolumeX } from 'lucide-react'
import './cinema.css'

const DURATION = 40
const cues = [
  [1, 7, 'Beyond this shore lies Lanka, and somewhere within it, Sita.'],
  [8, 13, 'The vanaras fell silent. Jambavan reminded Hanuman of the strength he carried.'],
  [14, 19, 'Hanuman faced the south, and drew one slow breath.'],
  [20, 27, 'The mountain trembled, and he rose.'],
  [28, 35, 'Below him, cloud and wave, and the long road of the sun.'],
  [36, 40, 'Ahead, the lights of Lanka.'],
] as const

function Opening({ onDone, reduced }: { onDone: () => void; reduced: boolean }) {
  const [lit, setLit] = useState(false)
  const [phase, setPhase] = useState(0)
  const timer = useRef<number[]>([])
  useEffect(() => () => timer.current.forEach(window.clearTimeout), [])
  const ignite = () => {
    if (lit) return
    setLit(true)
    if (reduced) { setPhase(3); onDone(); return }
    timer.current.push(window.setTimeout(() => setPhase(1), 1800))
    timer.current.push(window.setTimeout(() => setPhase(2), 6200))
    timer.current.push(window.setTimeout(() => setPhase(3), 10000))
    timer.current.push(window.setTimeout(onDone, 14500))
  }
  return <section className="film-opening">
    <div className="opening-sky" />
    <motion.div className="opening-aura" animate={{ opacity: lit ? 1 : 0, scale: lit ? 1.7 : .3 }} />
    <button className="opening-diya" onClick={ignite} aria-label="Light the diya" disabled={lit}>
      <svg viewBox="0 0 180 150" aria-hidden="true">
        <path d="M18 88 Q90 125 162 88 Q150 140 90 140 Q30 140 18 88" fill="#9a4d27" stroke="#e4a15b" strokeWidth="3"/>
        <path d="M18 88 Q90 70 162 88 Q90 108 18 88" fill="#d17a37"/>
        <motion.path d="M90 82 C45 43 91 2 91 2 C134 46 113 66 90 82Z" fill="#ffc45d" stroke="#fff0bd" strokeWidth="2" animate={lit ? { opacity: [1,.8,1], scaleY:[1,1.08,.94,1] } : { opacity:0, scaleY:0 }} transition={{ duration:1.4, repeat:Infinity }} style={{ transformOrigin:'50% 100%' }}/>
      </svg>
    </button>
    {!lit && <p className="opening-hint">Tap the diya to begin</p>}
    <AnimatePresence>
      {phase >= 1 && <motion.div className="opening-verses" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
        <p>असतो मा सद्गमय</p><p>तमसो मा ज्योतिर्गमय</p>
      </motion.div>}
    </AnimatePresence>
    {phase >= 2 && <motion.div className="ayodhya" initial={{ opacity:0, y:45 }} animate={{ opacity:1, y:0 }} transition={{ duration:3 }}>
      <div className="sunrise"/><div className="palace">{Array.from({length:9},(_,i)=><i key={i} style={{height:`${70+(i%3)*28}px`}} />)}</div>
    </motion.div>}
    {phase >= 3 && <motion.div className="opening-title" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
      <h1>श्री रामायण</h1><p>THE RETURN OF LIGHT</p>
    </motion.div>}
  </section>
}

export default function Film() {
  const reduced = useReducedMotion() ?? false
  const [stage,setStage] = useState<'open'|'leap'>('open')
  const [time,setTime] = useState(0)
  const [paused,setPaused] = useState(false)
  const [sound,setSound] = useState(false)
  const [voice,setVoice] = useState(false)
  const [full,setFull] = useState(false)
  const [ended,setEnded] = useState(false)
  const last = useRef(0)
  const audio = useRef<AudioContext|null>(null)
  useEffect(() => {
    if (stage !== 'leap' || paused || ended) return
    let raf = 0
    const tick = (now:number) => {
      if (!last.current) last.current = now
      const dt = Math.min(.08,(now-last.current)/1000)
      last.current = now
      setTime(t => {
        const next = Math.min(DURATION,t+dt)
        if (next >= DURATION) setEnded(true)
        return next
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); last.current = 0 }
  },[stage,paused,ended])
  const cue = cues.find(([a,b])=>time>=a && time<b)?.[2] ?? ''
  useEffect(() => {
    if (!voice || !cue || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(cue); u.rate=.88; window.speechSynthesis.speak(u)
    return () => window.speechSynthesis.cancel()
  },[voice,cue])
  useEffect(() => { if (paused && 'speechSynthesis' in window) window.speechSynthesis.pause(); else if ('speechSynthesis' in window) window.speechSynthesis.resume() },[paused])
  useEffect(() => () => { audio.current?.close(); if ('speechSynthesis' in window) window.speechSynthesis.cancel() },[])
  const toggleSound = () => {
    if (sound) { void audio.current?.suspend(); setSound(false); return }
    const ctx = audio.current ?? new AudioContext()
    audio.current = ctx
    const master = ctx.createGain(); master.gain.value=.035; master.connect(ctx.destination)
    const osc = ctx.createOscillator(); osc.frequency.value=98; osc.connect(master); osc.start()
    void ctx.resume(); setSound(true)
  }
  const toggleFull = () => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void document.documentElement.requestFullscreen?.().catch(()=>undefined)
    setFull(!document.fullscreenElement)
  }
  const replay = () => { setTime(0); setEnded(false); setPaused(false); last.current=0 }
  return <main className="cine">
    {stage==='open' ? <>
      <Opening reduced={reduced} onDone={()=>setStage('leap')}/>
      <button className="film-skip" onClick={()=>setStage('leap')}><SkipForward size={18}/> Skip intro</button>
    </> : <>
      <div className="leap-sky"/>
      <div className="distant-sun"/>
      <div className="far-cloud cloud-a"/><div className="far-cloud cloud-b"/>
      <div className="lanka"><span/><span/><span/><span/><b>लंका</b></div>
      <div className="ocean ocean-back"/><div className="ocean ocean-front"/>
      <div className="shore"/>
      <motion.div className="hanuman" animate={reduced ? {x:time>19? '45vw':'0vw',y:time>19?'-20vh':'0vh'} : {x:time<19?'0vw':`${Math.min(58,(time-19)*2.8)}vw`,y:time<19?0:`${-Math.sin(Math.min(1,(time-19)/21)*Math.PI)*22- Math.min(14,(time-19)*.45)}vh`,rotate:time<19?0:-8}} transition={{duration:reduced?0:.25,ease:'linear'}}>
        <svg viewBox="0 0 220 270" aria-label="Hanuman preparing to leap" role="img">
          <path d="M110 122 Q40 120 35 54 Q90 85 111 105" fill="none" stroke="#f6a34e" strokeWidth="13" strokeLinecap="round"/>
          <path d="M98 105 Q60 75 66 25 L110 72 L145 22 Q151 78 119 110Z" fill="#c87835" stroke="#f8c17b" strokeWidth="4"/>
          <circle cx="111" cy="77" r="30" fill="#bd6c39" stroke="#f6bd78" strokeWidth="4"/>
          <path d="M89 74 Q110 46 135 72 L130 93 Q108 111 91 91Z" fill="#7c382b"/>
          <path d="M93 76 Q110 68 128 77" stroke="#fff0c7" strokeWidth="4" fill="none"/>
          <path d="M105 108 L90 185 L53 226 M111 112 L145 180 L184 206 M99 130 L48 145 L28 118 M121 130 L169 111 L193 76" stroke="#bd6c39" strokeWidth="19" strokeLinecap="round" fill="none"/>
          <path d="M92 180 L137 187 L161 238 M91 182 L65 218 L42 244" stroke="#bd6c39" strokeWidth="20" strokeLinecap="round" fill="none"/>
          <path d="M181 64 L200 25" stroke="#e5b45e" strokeWidth="7" strokeLinecap="round"/>
        </svg>
      </motion.div>
      <div className="film-caption" aria-live="polite">{cue}</div>
      <div className="film-progress"><i style={{width:`${time/DURATION*100}%`}}/></div>
      <div className="film-controls">
        <button onClick={()=>setPaused(!paused)} aria-label={paused?'Play':'Pause'}>{paused?<Play/>:<Pause/>}</button>
        <button onClick={toggleSound} aria-label={sound?'Mute':'Enable sound'}>{sound?<Volume2/>:<VolumeX/>}</button>
        <button onClick={()=>setVoice(!voice)} aria-label={voice?'Disable narration':'Enable narration'}>{voice?<Mic/>:<MicOff/>}</button>
        <button onClick={toggleFull} aria-label="Toggle fullscreen">{full?<Maximize/>:<Maximize/>}</button>
      </div>
      <AnimatePresence>{ended && <motion.div className="film-ending" initial={{opacity:0}} animate={{opacity:1}}>
        <h2>सुन्दर काण्ड</h2><p>The journey across the ocean begins.</p><button onClick={replay}><RotateCcw/> Replay</button>
      </motion.div>}</AnimatePresence>
    </>}
  </main>
}
