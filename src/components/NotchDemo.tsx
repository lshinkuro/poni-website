import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BatteryCharging, Music, Timer, Clipboard } from 'lucide-react'

const scenes = [
  { key: 'battery', icon: BatteryCharging, label: 'Baterai' },
  { key: 'music', icon: Music, label: 'Musik' },
  { key: 'focus', icon: Timer, label: 'Fokus' },
  { key: 'clip', icon: Clipboard, label: 'Clipboard' },
] as const

type Key = (typeof scenes)[number]['key']

function Scene({ k }: { k: Key }) {
  if (k === 'battery')
    return (
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12">
          <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="4" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="#34d399" strokeWidth="4" strokeDasharray="75.4 94.2" strokeLinecap="round" />
          </svg>
          <BatteryCharging className="absolute inset-0 m-auto h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <div className="text-sm font-semibold">80% · Batas tercapai</div>
          <div className="text-xs text-zinc-400">Jalan pakai charger · 31 °C · kesehatan 98%</div>
        </div>
      </div>
    )
  if (k === 'music')
    return (
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-orange-400" />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">Lagu favoritmu</div>
          <div className="text-xs text-zinc-400">♪ lirik berjalan di sini…</div>
          <div className="mt-2 h-1 w-40 overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full bg-white" initial={{ width: '20%' }} animate={{ width: '70%' }} transition={{ duration: 3.5, ease: 'linear' }} />
          </div>
        </div>
      </div>
    )
  if (k === 'focus')
    return (
      <div className="flex items-center gap-4">
        <div className="font-mono text-3xl font-medium tabular-nums">24:17</div>
        <div>
          <div className="text-sm font-semibold">Sesi fokus</div>
          <div className="text-xs text-zinc-400">🔥 streak 6 hari</div>
        </div>
      </div>
    )
  return (
    <div className="w-full space-y-1.5 text-xs">
      {['npm run build', '{"user":"budi","role":"admin"}', 'https://github.com/lshinkuro'].map((t) => (
        <div key={t} className="truncate rounded-lg bg-white/5 px-3 py-1.5 font-mono text-zinc-300">{t}</div>
      ))}
    </div>
  )
}

export default function NotchDemo() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % scenes.length), 4000)
    return () => clearInterval(t)
  }, [])
  const k = scenes[i].key

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      {/* Mac screen */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-br from-indigo-950 via-zinc-900 to-emerald-950 shadow-2xl shadow-emerald-500/10">
        <div className="absolute inset-x-0 top-0 flex h-7 items-center justify-between bg-black/30 px-4 text-[11px] text-zinc-300 backdrop-blur">
          <span className="font-semibold"> Finder</span>
          <span className="flex items-center gap-2">
            <BatteryCharging className="h-3.5 w-3.5 text-emerald-400" /> 80%
          </span>
        </div>
        {/* Notch island */}
        <motion.div
          layout
          className="absolute left-1/2 top-0 -translate-x-1/2 overflow-hidden rounded-b-[26px] bg-black px-5 pb-4 pt-8 text-white shadow-xl"
          style={{ width: 'min(88%, 420px)' }}
        >
          <div className="mb-3 flex gap-1.5">
            {scenes.map((s, j) => (
              <button
                key={s.key}
                onClick={() => setI(j)}
                aria-label={s.label}
                className={`rounded-full p-1.5 transition ${j === i ? 'bg-white/15 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <s.icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
              transition={{ duration: 0.25 }}
              className="flex min-h-[56px] items-center"
            >
              <Scene k={k} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="mx-auto h-3 w-[104%] -translate-x-[2%] rounded-b-2xl bg-gradient-to-b from-zinc-700 to-zinc-800" />
    </div>
  )
}
