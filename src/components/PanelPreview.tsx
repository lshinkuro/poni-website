// Mirrors Panel (App.swift): 400×620 menu bar window, header, tab bar, faint accent wash.
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity, AppWindow, ArrowDown, ArrowDownToLine, ArrowUp, ArrowUpToLine, BarChart3, BatteryFull, Bolt, Command, Contrast, Cpu, Eye, Gauge, Globe, HardDrive, Heart, Layers, LayoutGrid,
  LineChart, Link2, MemoryStick, Monitor, Moon, Palette, Plug, Power, RefreshCw, ScanText, ShieldHalf, SlidersHorizontal, Smartphone, Sparkles, Thermometer, ToggleRight, Trash2, Coffee, Camera, Check, Flame, Zap,
} from 'lucide-react'
import { IconBadge, Ring, Scaled, Segments, Switch } from './mock'
import { P, type Icon } from './theme'

const panelTabs: { title: string; icon: Icon }[] = [
  { title: 'Baterai', icon: Zap },
  { title: 'Sistem', icon: Cpu },
  { title: 'Cleaner', icon: Sparkles },
  { title: 'Tools', icon: LayoutGrid },
]

function Card({ title, icon: I, children }: { title: string; icon: Icon; children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] border border-white/[.08] bg-white/[.035] p-4">
      <div className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[.8px] text-zinc-400"><I className="h-2.5 w-2.5" strokeWidth={2.6} />{title}</div>
      <div className="flex flex-col gap-2.5 text-[13px]">{children}</div>
    </div>
  )
}

/** Near-black headline card with a faint glow in `tone`. */
function Hero({ tone = P.accent, children }: { tone?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[22px] border border-white/[.08] p-[18px] text-white shadow-[0_6px_12px_rgba(0,0,0,.18)]" style={{ background: `radial-gradient(260px circle at 100% 0, ${tone}42, transparent), linear-gradient(#232427, #0F1011)` }}>
      {children}
    </div>
  )
}

function Tile({ icon: I, title, value, fraction }: { icon: Icon; title: string; value: string; fraction: number }) {
  return (
    <div className="flex min-h-[84px] flex-col rounded-2xl border border-white/[.08] bg-white/[.035] p-3">
      <I className="h-[11px] w-[11px]" strokeWidth={2.6} style={{ color: P.accent }} />
      <div className="mt-auto text-[20px] font-semibold leading-tight tabular-nums">{value}</div>
      <div className="text-[9px] font-semibold uppercase tracking-[.4px] text-zinc-400">{title}</div>
      <div className="mt-1 h-[3px] rounded-full bg-white/[.08]"><div className="h-full rounded-full" style={{ width: `${fraction * 100}%`, background: P.accent }} /></div>
    </div>
  )
}

function Row({ icon, label, on }: { icon: Icon; label: string; on: boolean }) {
  return (
    <div className="flex items-center gap-2.5"><IconBadge icon={icon} on={on} /><span className="flex-1">{label}</span><Switch on={on} /></div>
  )
}

function ToggleTile({ icon: I, title, on }: { icon: Icon; title: string; on: boolean }) {
  return (
    <div className={`flex min-h-[84px] flex-col gap-2 rounded-[18px] p-3 ${on ? '' : 'border border-white/[.08] bg-white/[.035]'}`} style={on ? { background: P.accent, color: P.onAccent } : undefined}>
      <span className={`flex h-[30px] w-[30px] items-center justify-center rounded-full ${on ? 'bg-black/10' : 'bg-white/[.07]'}`}><I className="h-[13px] w-[13px]" strokeWidth={2.4} /></span>
      <div className="mt-auto text-[12px] font-semibold leading-tight">{title}<div className="mt-0.5 text-[10px] font-medium opacity-65">{on ? 'Aktif' : 'Mati'}</div></div>
    </div>
  )
}

function BatteryGlyph() {
  return (
    <div className="relative mr-3 h-[86px] w-12 shrink-0 rounded-[11px] border-2 border-white/80 p-1">
      <div className="absolute -top-[7px] left-1/2 h-1 w-4 -translate-x-1/2 rounded-t bg-white/80" />
      <div className="absolute inset-x-1 bottom-1 rounded-md" style={{ height: '74%', background: P.accent }} />
      <div className="absolute -inset-x-1 border-t border-dashed border-white/70" style={{ bottom: '80%' }} />
      <span className="absolute -right-[18px] text-[9px] font-semibold text-white/70" style={{ bottom: '74%' }}>80</span>
    </div>
  )
}

function BatteryTab() {
  const pts = [92, 90, 86, 83, 80, 80, 80, 79, 80, 80, 80, 80]
  const path = pts.map((v, i) => `${(i / (pts.length - 1)) * 340},${70 - v * 0.65}`).join(' L')
  return (
    <>
      <Hero>
        <div className="flex items-center">
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold"><span className="h-1.5 w-1.5 rounded-full" style={{ background: P.accent }} />Ditahan di batas</span>
            <div className="mt-1 flex items-baseline font-semibold"><span className="text-[56px] leading-none">80</span><span className="text-[22px]" style={{ color: P.accent }}>%</span></div>
            <div className="mt-1 text-[13px] font-semibold opacity-90">4.212 mAh tersimpan</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-medium opacity-65"><Plug className="h-3 w-3" />96W USB-C Power Adapter</div>
          </div>
          <BatteryGlyph />
        </div>
      </Hero>
      <div className="grid grid-cols-4 gap-2">
        <Tile icon={Heart} title="Kondisi" value="98%" fraction={0.98} />
        <Tile icon={RefreshCw} title="Siklus" value="142" fraction={0.14} />
        <Tile icon={Thermometer} title="Suhu" value="31.4°" fraction={0.52} />
        <Tile icon={Bolt} title="Daya" value="0 W" fraction={0} />
      </div>
      <Card title="Riwayat" icon={LineChart}>
        <div className="flex gap-1.5">
          <Segments items={['Baterai', 'Suhu', 'Daya']} active={0} className="flex-1" />
          <Segments items={['1j', '6j', '24j']} active={1} className="w-[120px]" />
        </div>
        <svg viewBox="0 0 340 74" className="h-[74px] w-full">
          <defs><linearGradient id="hg" x1="0" x2="0" y1="0" y2="1"><stop stopColor={P.accent} stopOpacity=".3" /><stop offset="1" stopColor={P.accent} stopOpacity="0" /></linearGradient></defs>
          <path d={`M${path} L340,74 L0,74Z`} fill="url(#hg)" />
          <path d={`M${path}`} fill="none" stroke={P.accent} strokeWidth="2" strokeLinecap="round" />
          <line x1="0" x2="340" y1={70 - 80 * 0.65} y2={70 - 80 * 0.65} stroke="#a1a1aa" strokeDasharray="4 3" />
          <text x="2" y={70 - 80 * 0.65 + 12} fill="#a1a1aa" fontSize="9">Batas 80%</text>
        </svg>
      </Card>
      <Card title="Pengisian" icon={BatteryFull}>
        <Row icon={BatteryFull} label="Aktifkan limiter" on />
        <div className="flex items-center gap-2.5">
          <IconBadge icon={SlidersHorizontal} /><span>Batas</span>
          <div className="relative h-1 flex-1 rounded-full bg-white/15"><span className="absolute -top-1.5 left-0 h-4 w-4 rounded-full bg-white shadow" /></div>
          <span className="w-10 text-right font-semibold">80%</span>
        </div>
        <div className="text-[11px] text-zinc-400">macOS 27: memakai Charge Limit bawaan (80–100%)</div>
        <Row icon={ArrowUpToLine} label="Top up ke 100% (sementara)" on={false} />
        <Row icon={ArrowDownToLine} label="Auto discharge ke batas" on={false} />
      </Card>
      <Card title="Proteksi" icon={ShieldHalf}>
        <Row icon={Moon} label="Hentikan pengisian saat sleep" on />
        <div className="flex items-center gap-2.5"><IconBadge icon={Gauge} /><span className="flex-1">Kalibrasi 100 → 10 → 100%</span></div>
      </Card>
    </>
  )
}

function SystemTab() {
  const procs: [string, string, string][] = [['Google Chrome Helper', '12,5%', '820 MB'], ['Xcode', '8,1%', '1,4 GB'], ['Slack', '3,2%', '460 MB'], ['Spotify', '1,9%', '310 MB']]
  const net = [['Antarmuka', 'Wi-Fi · en0'], ['IPv4', '192.168.1.24'], ['Total sejak nyala', '↓ 2,5 GB  ↑ 471 MB']]
  return (
    <>
      <Hero>
        <div className="flex items-center justify-between text-[12px] font-semibold"><span className="flex items-center gap-1.5"><MemoryStick className="h-3.5 w-3.5" />Memori</span><span>61% terpakai</span></div>
        <div className="mt-1.5 flex items-baseline gap-1.5"><span className="text-[36px] font-semibold leading-none">6,2 GB</span><span className="text-[13px] font-medium opacity-70">tersisa</span></div>
        <div className="mt-3 h-2 rounded-full bg-white/10"><div className="h-full w-[61%] rounded-full bg-white/80" /></div>
        <div className="mt-2 text-[11px] font-medium opacity-70">Swap 0 B — memori aman</div>
      </Hero>
      <div className="grid grid-cols-2 gap-2">
        {([[Cpu, 'CPU', '10 core', 0.18, P.accent], [HardDrive, 'Disk', '76 GB sisa', 0.84, P.amber]] as const).map(([I, t, d, v, c]) => (
          <div key={t} className="flex items-center gap-3 rounded-2xl border border-white/[.08] bg-white/[.035] p-3">
            <Ring value={v} color={c} label={`${Math.round(v * 100)}%`} size={56} line={6} />
            <div><div className="flex items-center gap-1 text-[12px] font-semibold"><I className="h-3 w-3" />{t}</div><div className="text-[11px] text-zinc-400">{d}</div></div>
          </div>
        ))}
      </div>
      <Card title="Aktivitas live" icon={Activity}>
        <svg viewBox="0 0 340 52" className="h-[52px] w-full">
          <polyline points="0,40 40,36 80,42 120,28 160,34 200,20 240,30 280,24 340,32" fill="none" stroke={P.accent} strokeWidth="2" strokeLinecap="round" />
          <polyline points="0,16 340,14" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </Card>
      <Card title="Jaringan" icon={Globe}>
        <div className="flex gap-6"><div><div className="flex items-center gap-1 text-[11px]" style={{ color: P.accent }}><ArrowDown className="h-3 w-3" />Unduh</div><div className="text-[20px] font-semibold tabular-nums">13 KB/s</div></div><div><div className="flex items-center gap-1 text-[11px] text-zinc-400"><ArrowUp className="h-3 w-3" />Unggah</div><div className="text-[20px] font-semibold tabular-nums">9 KB/s</div></div></div>
        {net.map(([k, v]) => <div key={k} className="flex justify-between text-[12px]"><span className="text-zinc-400">{k}</span><span className="font-semibold tabular-nums">{v}</span></div>)}
      </Card>
      <Card title="Proses terberat" icon={Flame}>
        {procs.map(([n, cpu, mem]) => (
          <div key={n} className="flex items-center gap-2 text-[12px]">
            <AppWindow className="h-4 w-4 text-zinc-400" /><span className="flex-1 truncate">{n}</span>
            <span className="w-12 text-right tabular-nums">{cpu}</span><span className="w-14 text-right tabular-nums text-zinc-400">{mem}</span>
          </div>
        ))}
      </Card>
    </>
  )
}

function CleanerTab() {
  const junk: [Icon, string, string, boolean][] = [[Layers, 'Cache aplikasi', '2,1 GB', true], [BarChart3, 'Log', '340 MB', true], [Command, 'Xcode DerivedData', '6,4 GB', true], [Smartphone, 'iOS DeviceSupport', '3,8 GB', true], [Link2, 'Cache npm', '1,2 GB', false], [Trash2, 'Sampah (Trash)', '820 MB', false]]
  return (
    <>
      <Hero>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-1 text-[12px] font-semibold"><Sparkles className="h-3 w-3" />Bisa dibersihkan</div>
            <div className="mt-1 text-[36px] font-semibold leading-none">13,4 GB</div>
            <div className="mt-1.5 text-[12px] font-medium opacity-70">cache, log, dan sisa build</div>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><RefreshCw className="h-3.5 w-3.5" /></span>
        </div>
      </Hero>
      <Card title="File sampah" icon={Trash2}>
        {junk.map(([I, n, s, on]) => (
          <div key={n} className="flex items-center gap-2.5 text-[12px]">
            <IconBadge icon={I} on={on} /><span className="flex-1">{n}</span><span className="tabular-nums text-zinc-400">{s}</span><Switch on={on} />
          </div>
        ))}
      </Card>
      <Card title="Simulator iOS" icon={Smartphone}>
        {[['iPhone 15 Pro · iOS 17.5', '4,2 GB'], ['iPad Air · iOS 17.2', '3,1 GB']].map(([n, s]) => (
          <div key={n} className="flex items-center gap-2 text-[12px]"><span className="flex-1">{n}</span><span className="text-zinc-400">{s}</span></div>
        ))}
      </Card>
      <Card title="Analisis disk" icon={BarChart3}>
        {[['Developer', 0.9, '48 GB'], ['Library', 0.55, '29 GB']].map(([n, v, s]) => (
          <div key={n as string} className="text-[12px]">
            <div className="mb-1 flex justify-between"><span>{n}</span><span className="text-zinc-400">{s}</span></div>
            <div className="h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-white/50" style={{ width: `${(v as number) * 100}%` }} /></div>
          </div>
        ))}
      </Card>
    </>
  )
}

function ToolsTab() {
  const accents = ['#34D399', '#38BDF8', '#A78BFA', '#F472B6', '#A3E635']
  const quick: [Icon, string][] = [[Contrast, 'Gelap / Terang'], [Monitor, 'Matikan layar'], [Camera, 'Tangkapan layar'], [ScanText, 'Teks dari layar']]
  const chips = ['Sistem', 'Cleaner', 'Persen']
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <ToggleTile icon={AppWindow} title="Notch" on />
        <ToggleTile icon={Coffee} title="Tetap menyala" on={false} />
        <ToggleTile icon={Eye} title="File tersembunyi" on={false} />
        <ToggleTile icon={Monitor} title="Ikon desktop" on />
      </div>
      <Card title="Tampilan" icon={Palette}>
        <div className="flex gap-3">{accents.map((c, i) => <span key={c} className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: c, color: P.onAccent }}>{i === 0 && <Check className="h-3 w-3" strokeWidth={3} />}</span>)}</div>
        <div className="flex items-center gap-2.5 text-[11px] text-zinc-400">Kustom<div className="h-1.5 flex-1 rounded-full" style={{ background: 'linear-gradient(90deg,#f87171,#fbbf24,#34d399,#38bdf8,#a78bfa,#f472b6)' }} /></div>
        <div className="text-[11px] text-zinc-400">Warna aksen untuk tab aktif, tombol, toggle, dan grafik.</div>
      </Card>
      <Card title="Fitur" icon={ToggleRight}>
        <div className="text-[11px] text-zinc-400">Matikan yang tidak dipakai: tab-nya hilang dan proses latarnya berhenti.</div>
        <div className="text-[12px] font-semibold">Menu bar</div>
        <div className="flex gap-1.5">{chips.map((c) => <span key={c} className="flex flex-1 items-center justify-between rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: P.accent, color: P.onAccent }}>{c}<Check className="h-3 w-3" strokeWidth={3} /></span>)}</div>
      </Card>
      <Card title="Aksi cepat" icon={Zap}>
        <div className="grid grid-cols-2 gap-2">
          {quick.map(([I, n]) => <div key={n} className="flex items-center gap-2.5 rounded-2xl border border-white/[.08] bg-white/[.035] p-[9px] text-[12px] font-medium"><IconBadge icon={I} size={28} /><span className="truncate">{n}</span></div>)}
        </div>
      </Card>
    </>
  )
}

export default function PanelPreview({ tab, setTab }: { tab: number; setTab: (i: number) => void }) {
  return (
    <Scaled w={400} h={620}>
      <div className="relative flex h-[620px] w-[400px] flex-col overflow-hidden rounded-[14px] border border-white/10 bg-[#1e1e20]/95 text-left text-white shadow-2xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[330px]" style={{ background: `radial-gradient(330px circle at 50% 0%, ${P.accent}1a, transparent)` }} />
        <div className="relative flex items-center gap-2.5 px-4 pt-3.5">
          <img src="/icon.png" alt="" className="h-8 w-8" />
          <div className="flex-1">
            <div className="text-[15px] font-semibold">Poni</div>
            <div className="text-[11px] font-medium text-zinc-400">80% · dicas</div>
          </div>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[.07]"><Power className="h-[11px] w-[11px]" strokeWidth={2.8} /></span>
        </div>
        <div className="relative mx-3.5 mb-1 mt-3 flex gap-0.5 rounded-full border border-white/[.08] bg-white/5 p-[3px]">
          {panelTabs.map((x, i) => (
            <button key={x.title} onClick={() => setTab(i)} className="relative flex flex-1 items-center justify-center gap-[5px] py-1.5 text-[12px] font-medium" style={{ color: i === tab ? P.onAccent : '#a1a1aa' }}>
              {i === tab && <motion.span layoutId="ptab" className="absolute inset-0 rounded-full" style={{ background: P.accent }} transition={{ type: 'spring', duration: 0.32, bounce: 0.2 }} />}
              <x.icon className="relative h-2.5 w-2.5" strokeWidth={2.6} /><span className="relative">{x.title}</span>
            </button>
          ))}
        </div>
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex flex-col gap-3 p-4">
              {[<BatteryTab />, <SystemTab />, <CleanerTab />, <ToolsTab />][tab]}
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#1e1e20] to-transparent" />
        </div>
      </div>
    </Scaled>
  )
}
