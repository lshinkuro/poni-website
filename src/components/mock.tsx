// Building blocks that mirror the app's SwiftUI components (UI.swift / Notch.swift).
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Icon, Theme } from './theme'

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

export function Ring({ value, color, label, caption, size, line }: { value: number; color: string; label: string; caption?: string; size: number; line: number }) {
  const r = (size - line) / 2, c = 2 * Math.PI * r
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeOpacity={0.18} strokeWidth={line} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={line} strokeLinecap="round" strokeDasharray={`${c * value} ${c}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-extrabold tabular-nums" style={{ fontSize: size * 0.2 }}>{label}</div>
        {caption && <div className="text-[10px] text-zinc-400">{caption}</div>}
      </div>
    </div>
  )
}

/** NCard: the notch's tinted card. */
export function NCard({ t, children, className = '', pad = 14 }: { t: Theme; children: ReactNode; className?: string; pad?: number }) {
  return (
    <div className={`rounded-[18px] ${className}`} style={{ padding: pad, background: `linear-gradient(135deg, ${t[0]}29, ${t[1]}14)` }}>
      {children}
    </div>
  )
}

export function NButton({ icon: I, title, tint, prominent }: { icon: Icon; title?: string; tint?: string; prominent?: boolean }) {
  return (
    <span
      className="inline-flex h-[26px] items-center gap-1.5 rounded-full px-2.5 text-[11px] font-bold"
      style={{ background: prominent ? tint : tint ? `${tint}33` : 'rgba(255,255,255,.1)', color: prominent ? '#fff' : tint ?? '#fff' }}
    >
      <I className="h-3 w-3" strokeWidth={2.6} />
      {title}
    </span>
  )
}

export function Switch({ on, color }: { on: boolean; color: string }) {
  return (
    <span className="relative inline-block h-[18px] w-8 shrink-0 rounded-full transition" style={{ background: on ? color : 'rgba(255,255,255,.18)' }}>
      <span className="absolute top-0.5 h-[14px] w-[14px] rounded-full bg-white shadow transition-all" style={{ left: on ? 16 : 2 }} />
    </span>
  )
}

export function IconBadge({ icon: I, color, size = 24 }: { icon: Icon; color: string; size?: number }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-[7px]" style={{ width: size, height: size, background: `${color}2e`, color }}>
      <I style={{ width: size * 0.55, height: size * 0.55 }} strokeWidth={2.4} />
    </span>
  )
}

