import type { Kanda } from '../data/story'
import { motion, useReducedMotion } from 'motion/react'

export default function Scene({ k, sceneIndex = 0 }: { k: Kanda; sceneIndex?: number }) {
  const reduced = useReducedMotion()
  const id = `cinema-${k.id}`
  const drift = reduced ? undefined : { x: [0, -13, 0], y: [0, 5, 0] }
  const float = reduced ? undefined : { y: [0, -9, 0] }
  return (
    <svg className="scene-art cinematic-art" data-scene={sceneIndex} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${k.en} illustrated scene`}>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          {k.sky.map((color, i) => <stop key={color} offset={`${i * 50}%`} stopColor={color} />)}
        </linearGradient>
        <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#62402f"/><stop offset="1" stopColor="#100f20"/></linearGradient>
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#6bb0c2"/><stop offset="1" stopColor="#122c50"/></linearGradient>
        <radialGradient id={`${id}-sun`}><stop stopColor="#fff8d7"/><stop offset=".25" stopColor="#ffe0a0"/><stop offset="1" stopColor="#f5a34b" stopOpacity="0"/></radialGradient>
        <filter id={`${id}-glow`}><feGaussianBlur stdDeviation="18"/></filter>
      </defs>
      <rect width="1440" height="900" fill={`url(#${id}-sky)`} />
      <circle cx="1080" cy="230" r="185" fill={`url(#${id}-sun)`} opacity=".8"/>
      <circle cx="1080" cy="230" r="65" fill="#ffe8ad" opacity=".7"/>
      {Array.from({length:42},(_,i)=><motion.circle key={i} cx={(i*173+37)%1440} cy={(i*83+29)%460} r={i%4===0?2:1.2} fill="#fff5d9" animate={reduced?undefined:{opacity:[.15,.9,.15],scale:[.8,1.4,.8]}} transition={{duration:2.5+i%4,repeat:Infinity,delay:i*.07}}/>)}
      <motion.g animate={drift} transition={{duration:18,repeat:Infinity,ease:'easeInOut'}}>
        <path d="M0 440 Q180 360 350 430 T700 420 T1050 410 T1440 430 V900 H0Z" fill="#151a2d" opacity=".38"/>
        {k.motif==='palace' && <g fill="#281d31" stroke="#d8ad72" strokeWidth="5">
          <path d="M170 770V450H310V360H420V450H520V770Z M920 770V440H1050V350H1170V440H1280V770Z"/>
          <path d="M120 455Q345 165 570 455Z M865 445Q1100 130 1335 445Z"/>
          <path d="M510 770V540Q720 360 930 540V770Z" fill="#17182b"/>
          <path d="M625 770V630Q720 500 815 630V770Z" fill="#f1b75d" opacity=".5"/>
          {Array.from({length:9},(_,i)=><path key={i} d={`M${210+i*125} 770V${520+(i%2)*45}q34-80 68 0v250`} fill="#0d1224" stroke="#a77a53" strokeWidth="3"/>)}
          <path d="M720 500V380m-28 40 28-45 28 45" fill="none" stroke="#f3c879" strokeWidth="7"/>
        </g>}
        {k.motif==='forest' && <g>
          <path d="M0 570Q240 430 470 560T930 540T1440 550V900H0Z" fill="#112c29"/>
          {Array.from({length:17},(_,i)=><g key={i} transform={`translate(${i*92-30} 0)`} fill={i%2?'#0b2524':'#153c32'}>
            <path d="M0 850V420L-95 610 -25 580 -100 720 0 680 95 720 25 580 95 610 0 420Z"/>
            <path d="M-8 850H8V630H-8Z" fill="#4a3529"/>
          </g>)}
          <path d="M490 770Q710 520 930 770Z" fill="#382d2c" stroke="#c49a63" strokeWidth="5"/>
          <path d="M565 770V685Q710 565 855 685V770Z" fill="#111b25"/>
          <path d="M625 770V705Q710 625 795 705V770Z" fill="#e5a65c" opacity=".25"/>
        </g>}
        {k.motif==='hills' && <g>
          <path d="M0 690L190 440 330 620 570 310 760 650 970 390 1180 650 1350 450 1440 560V900H0Z" fill="#33253a"/>
          <path d="M0 745L260 560 420 700 700 500 940 720 1190 530 1440 690V900H0Z" fill="#1d2637"/>
          <path d="M0 805Q360 700 720 800T1440 780V900H0Z" fill="#182c2c"/>
          <g fill="#101a25"><path d="M180 730q-35-80 0-130 40 50 5 130m-28-45-35-25m55 20 35-35" stroke="#101a25" strokeWidth="18" strokeLinecap="round"/><path d="M310 740q-20-55 10-95 30 45 10 95m-8-40-35-20m45 20 32-24" stroke="#101a25" strokeWidth="15" strokeLinecap="round"/></g>
        </g>}
        {(k.motif==='ocean'||k.motif==='bridge') && <g>
          <path d="M0 530Q170 490 360 535T720 530T1080 525T1440 540V900H0Z" fill={`url(#${id}-water)`}/>
          {Array.from({length:11},(_,i)=><motion.path key={i} d={`M${i*150-40} ${610+i%3*44}q80-22 160 0t160 0`} fill="none" stroke="#b6e3df" strokeOpacity=".35" strokeWidth="5" animate={reduced?undefined:{x:[-30,25,-30]}} transition={{duration:6+i%3,repeat:Infinity,ease:'easeInOut'}}/>)}
          {k.motif==='bridge' && <g fill="#b89570" stroke="#f3d19c" strokeWidth="3">
            {Array.from({length:18},(_,i)=><ellipse key={i} cx={i*88-30} cy={590-Math.sin(i/17*Math.PI)*120} rx="54" ry="25" transform={`rotate(-8 ${i*88-30} ${590-Math.sin(i/17*Math.PI)*120})`}/>)}
            <path d="M0 585Q720 360 1440 585" fill="none" stroke="#ffe1a2" strokeWidth="7" strokeDasharray="16 18"/>
          </g>}
          {k.lanka && <g fill="#25182b" stroke="#e6b66e" strokeWidth="5">
            <path d="M1040 565V350L1100 250 1160 350V565Z M1165 565V300L1240 180 1315 300V565Z M1315 565V385L1370 295 1425 385V565Z"/>
            <path d="M1020 350H1180M1140 300H1340" fill="none"/>
            <path d="M1080 565V470Q1100 420 1120 470V565M1220 565V430Q1240 380 1260 430V565" fill="#eaa45a" opacity=".3"/>
          </g>}
        </g>}
        {k.id===1 && <g transform="translate(700 655)" fill="#f2c779" stroke="#fff0c3" strokeWidth="4"><path d="M-100 0Q0-90 100 0Q65 65-65 65Z"/><path d="M0-110Q-40-55 0-25Q40-55 0-110Z" fill="#fff0bc"/><circle cx="0" cy="14" r="17" fill="#f7d58c"/></g>}
        {k.id===2 && <g transform="translate(700 650)" fill="none" stroke="#e9bd76" strokeWidth="12" strokeLinecap="round"><path d="M-120 80Q-35-115 0-115Q35-115 120 80"/><path d="M-130 80H130"/></g>}
        {k.id===3 && <motion.g animate={float} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}} transform="translate(850 620)"><path d="M-85 5Q0-80 85 5Q30 90-85 5Z" fill="#d5a33e" stroke="#ffe2a0" strokeWidth="5"/><path d="M-15-15L10-75 38-14" fill="#d5a33e" stroke="#ffe2a0" strokeWidth="4"/><circle cx="45" cy="-2" r="5" fill="#2b1a20"/><path d="M-60 30L-85 95M35 35L55 95" stroke="#d5a33e" strokeWidth="10"/></motion.g>}
        {k.id===4 && <g transform="translate(760 565)" fill="#141b2a" stroke="#d2a36a" strokeWidth="7"><path d="M-55 10Q-110-80-75-115Q-20-100 0-20Q40-95 95-100Q125-30 45 20L20 100H-35Z"/><path d="M-10-15L-110-85M35-15L135-100" fill="none" strokeWidth="13" strokeLinecap="round"/><circle cx="0" cy="-125" r="28"/></g>}
        {k.id===5 && <motion.g animate={drift} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}} transform="translate(730 440)" fill="#171b2d" stroke="#f4c87b" strokeWidth="5"><path d="M-110 30Q-55-25 5 0L100-75 70 5 155 65 40 40-40 95Z"/><circle cx="-45" cy="-28" r="32"/><path d="M-40-55L-5-115 10-45" fill="#171b2d"/><path d="M-10 70L-55 155M45 45L90 120" fill="none" strokeWidth="12" strokeLinecap="round"/><path d="M-160 5L-230-60" fill="none" strokeWidth="12" strokeLinecap="round"/></motion.g>}
        {k.id===6 && <g fill="#201a2a" stroke="#e5b978" strokeWidth="5"><path d="M150 730V520H210V470H260V520H320V730M1100 730V490H1170V430H1225V490H1300V730"/><path d="M360 690Q720 400 1080 690" fill="none" stroke="#d9ad75" strokeWidth="18"/><path d="M400 680Q720 470 1040 680" fill="none" stroke="#e8c28b" strokeWidth="5" strokeDasharray="18 15"/></g>}
        {k.id===7 && <g transform="translate(720 570)" fill="#261c30" stroke="#eac17e" strokeWidth="5"><path d="M-420 210V-5H-310V-95H-205V-5H-80V210ZM80 210V-5H205V-95H310V-5H420V210Z"/><path d="M-95 210V40Q0-80 95 40V210Z"/><path d="M-300-5Q-255-170-205-5M205-5Q255-170 300-5" fill="none"/><path d="M-45 210V115Q0 65 45 115V210Z" fill="#f6c477" opacity=".55"/></g>}
      </motion.g>
      {k.id===5 && <motion.g animate={reduced?undefined:{x:['-20%','110%'],y:[0,-40,0]}} transition={{duration:15,repeat:Infinity,ease:'linear'}} fill="#171a2b" stroke="#e9c17b" strokeWidth="4"><path d="M0 0Q55-55 120 0Q65 45 0 0Z"/><circle cx="60" cy="-20" r="18"/><path d="M55-35L80-80 95-25" fill="#171a2b"/></motion.g>}
      <rect y="780" width="1440" height="120" fill={`url(#${id}-ground)`} opacity=".45"/>
      <motion.path d="M0 825Q360 780 720 825T1440 820" fill="none" stroke="#f4c77a" strokeOpacity=".2" strokeWidth="3" animate={reduced?undefined:{d:['M0 825Q360 780 720 825T1440 820','M0 830Q360 800 720 815T1440 825','M0 825Q360 780 720 825T1440 820']}} transition={{duration:8,repeat:Infinity}}/>
      <rect width="1440" height="900" fill="#07101e" opacity=".16"/>
    </svg>
  )
}
