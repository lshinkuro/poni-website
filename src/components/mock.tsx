// Building blocks that mirror the app's SwiftUI components (UI.swift / Notch.swift).
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { P, type Icon } from './theme'

/** Renders children at a fixed native size and scales them down to fit the container width. */
export function Scaled({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [s, setS] = useState(1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setS(Math.min(1, el.clientWidth / w)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [w])
  return (
    <div ref={ref} className="mx-auto w-full" style={{ maxWidth: w, height: h * s }}>
      <div style={{ width: w, height: h, transform: `scale(${s})`, transformOrigin: 'top left' }}>{children}</div>
    </div>
  )
}

export function Ring({ value, color = P.accent, label, caption, size, line }: { value: number; color?: string; label?: string; caption?: string; size: number; line: number }) {
  const r = (size - line) / 2, c = 2 * Math.PI * r
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeOpacity={0.18} strokeWidth={line} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={line} strokeLinecap="round" strokeDasharray={`${c * value} ${c}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <div className="font-semibold tabular-nums" style={{ fontSize: size * 0.2 }}>{label}</div>}
        {caption && <div className="text-[10px] font-medium text-zinc-400">{caption}</div>}
      </div>
    </div>
  )
}

/** NCard: the notch's quiet hairline card; `glow` is the faint wash on cards that lead a page. */
export function NCard({ children, className = '', pad = 12, glow }: { children: ReactNode; className?: string; pad?: number; glow?: boolean }) {
  return (
    <div
      className={`rounded-[18px] border border-white/[.07] ${className}`}
      style={{
        padding: pad,
        background: glow
          ? `linear-gradient(rgba(255,255,255,.06), transparent), radial-gradient(170px circle at 100% 0, ${P.accent}29, transparent), rgba(255,255,255,.045)`
          : 'rgba(255,255,255,.045)',
      }}
    >
      {children}
    </div>
  )
}

export function NButton({ icon: I, title, tint = '#fff', prominent }: { icon: Icon; title?: string; tint?: string; prominent?: boolean }) {
  return (
    <span
      className={`inline-flex h-7 min-w-7 shrink-0 items-center justify-center gap-[5px] rounded-full text-[11px] font-semibold ${title ? 'px-[11px]' : ''}`}
      style={{ background: prominent ? P.accent : 'rgba(255,255,255,.08)', color: prominent ? P.onAccent : tint }}
    >
      <I className="h-[11px] w-[11px]" strokeWidth={2.6} />
      {title}
    </span>
  )
}

export function Chip({ text, icon: I, color = '#a1a1aa' }: { text: string; icon?: Icon; color?: string }) {
  return (
    <span className="inline-flex items-center gap-[3px] rounded-full px-1.5 py-0.5 text-[10px] font-semibold" style={{ color, background: `${color}29` }}>
      {I && <I className="h-2.5 w-2.5" strokeWidth={2.6} />}{text}
    </span>
  )
}

/** Selected = accent fill with dark text, others gray. */
export function Segments({ items, active, className = '' }: { items: string[]; active: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 rounded-full bg-white/[.07] p-0.5 text-[11px] font-semibold ${className}`}>
      {items.map((x, i) => <span key={x} className="flex-1 whitespace-nowrap rounded-full px-2.5 py-1 text-center" style={i === active ? { background: P.accent, color: P.onAccent } : { color: '#a1a1aa' }}>{x}</span>)}
    </div>
  )
}

export function Switch({ on }: { on: boolean }) {
  return (
    <span className="relative inline-block h-[18px] w-8 shrink-0 rounded-full transition" style={{ background: on ? P.accent : 'rgba(255,255,255,.18)' }}>
      <span className="absolute top-0.5 h-[14px] w-[14px] rounded-full bg-white shadow transition-all" style={{ left: on ? 16 : 2 }} />
    </span>
  )
}

/** Neutral rounded square; takes the accent only when `on`. */
export function IconBadge({ icon: I, on, size = 24 }: { icon: Icon; on?: boolean; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size, borderRadius: size * 0.3, background: on ? `${P.accent}29` : 'rgba(255,255,255,.07)', color: on ? P.accent : 'rgba(255,255,255,.75)' }}
    >
      <I style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={2.2} />
    </span>
  )
}
