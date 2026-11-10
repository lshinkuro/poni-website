import { useEffect, useState } from 'react'
import NotchPreview from './NotchPreview'
import PanelPreview from './PanelPreview'
import { BatteryCharging } from 'lucide-react'
import { menubar, notch } from '../data'

type Item = { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }

function List({ items, active, onPick, color }: { items: Item[]; active: number; onPick: (i: number) => void; color: string }) {
  return (
    <div className="flex flex-col gap-1">
      {items.map((x, i) => (
        <button
          key={x.title}
          onClick={() => onPick(i)}
          className={`flex gap-3 rounded-xl p-3 text-left transition ${i === active ? 'bg-white/[.07] ring-1 ring-white/10' : 'hover:bg-white/[.03]'}`}
        >
          <x.icon className={`mt-0.5 h-5 w-5 shrink-0 ${i === active ? color : 'text-zinc-500'}`} />
          <div>
            <div className={`font-semibold ${i === active ? 'text-white' : 'text-zinc-300'}`}>{x.title}</div>
            {i === active && <div className="mt-0.5 text-sm text-zinc-400">{x.desc}</div>}
          </div>
        </button>
      ))}
    </div>
  )
}

/** Auto-advances until the visitor picks a tab themselves. */
function useCycle(n: number, ms: number) {
  const [i, setI] = useState(0)
  const [manual, setManual] = useState(false)
  useEffect(() => {
    if (manual) return
    const t = setInterval(() => setI((v) => (v + 1) % n), ms)
    return () => clearInterval(t)
  }, [manual, n, ms])
  return [i, (v: number) => { setManual(true); setI(v) }] as const
}

export function HeroMac() {
  const [tab, setTab] = useCycle(notch.length, 3500)
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-br from-indigo-950 via-zinc-900 to-emerald-950 px-[6%] pb-[8%] shadow-2xl shadow-emerald-500/10">
        <div className="absolute inset-x-0 top-0 flex h-6 items-center justify-between px-4 text-[11px] text-zinc-300">
          <span className="font-semibold"> Finder</span>
          <span className="flex items-center gap-1.5"><BatteryCharging className="h-3.5 w-3.5 text-emerald-400" />80%</span>
        </div>
        <NotchPreview tab={tab} setTab={setTab} />
      </div>
      <div className="mx-auto h-3 w-[104%] -translate-x-[2%] rounded-b-2xl bg-gradient-to-b from-zinc-700 to-zinc-800" />
    </div>
  )
}

export function NotchTour() {
  const [tab, setTab] = useCycle(notch.length, 4500)
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[280px_1fr]">
      <List items={notch} active={tab} onPick={setTab} color="text-emerald-400" />
      <div className="order-first rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 px-4 pb-8 sm:px-8 lg:sticky lg:top-24 lg:order-none">
        <NotchPreview tab={tab} setTab={setTab} />
      </div>
    </div>
  )
}

export function PanelTour() {
  const [tab, setTab] = useCycle(menubar.length, 5000)
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_320px]">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-sky-950/60 via-zinc-900 to-violet-950/50 p-4 sm:p-8">
        <PanelPreview tab={tab} setTab={setTab} />
      </div>
      <List items={menubar} active={tab} onPick={setTab} color="text-emerald-400" />
    </div>
  )
}
