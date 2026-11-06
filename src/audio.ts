let context: AudioContext | null = null
let master: GainNode | null = null
let oscillators: OscillatorNode[] = []

function startDrone() {
  if (context || typeof window === 'undefined' || !('AudioContext' in window)) return

  context = new AudioContext()
  master = context.createGain()
  master.gain.value = 0
  master.connect(context.destination)

  // A quiet, original synthesized drone; no external recording or autoplay.
  ;[110, 165, 220].forEach((frequency, index) => {
    const oscillator = context!.createOscillator()
    const voiceGain = context!.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    voiceGain.gain.value = [0.34, 0.13, 0.055][index]
    oscillator.connect(voiceGain).connect(master!)
    oscillator.start()
    oscillators.push(oscillator)
  })
}

export function setMusic(on: boolean) {
  try {
    if (on) {
      startDrone()
      if (!context || !master) return
      void context.resume().then(() => {
        master?.gain.setTargetAtTime(0.075, context!.currentTime, 0.8)
      }).catch(() => undefined)
    } else if (context && master) {
      master.gain.setTargetAtTime(0, context.currentTime, 0.25)
    }
  } catch {
    // Audio is an optional enhancement; the story remains fully usable without it.
  }
}

export function narrate(text: string | null) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  if (text) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 0.96
    window.speechSynthesis.speak(utterance)
  }
}

export function stopNarration() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
}
