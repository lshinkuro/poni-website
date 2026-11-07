// Mirrors Panel (App.swift): 400×620 menu bar window, header, tab bar, colored glow per tab.
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDownToLine, ArrowUpToLine, BarChart3, Battery, BatteryFull, Bolt, Command, Cpu, Eye, Flame, Gauge, Heart, Images, LayoutGrid, LineChart,
  Monitor, Moon, Plug, Power, RefreshCw, ShieldCheck, ShieldHalf, SlidersHorizontal, Smartphone, Sparkles, Thermometer, ToggleRight, Trash2, Activity,
  Zap, AppWindow, Coffee, Camera,
} from 'lucide-react'
import { IconBadge, Scaled, Switch } from './mock'
import { P, grad, theme, type Icon, type Theme } from './theme'

const panelTabs: { title: string; icon: Icon; t: Theme }[] = [
  { title: 'Baterai', icon: Zap, t: theme.mint },
  { title: 'Sistem', icon: Cpu, t: theme.electric },
  { title: 'Cleaner', icon: Sparkles, t: theme.coral },
  { title: 'Tools', icon: LayoutGrid, t: theme.violet },
]

function Card({ title, icon: I, children }: { title: string; icon: Icon; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[.06] bg-white/[.05] p-3.5">
      <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-zinc-400"><I className="h-3.5 w-3.5" />{title}</div>
      <div className="flex flex-col gap-2.5 text-[13px]">{children}</div>
    </div>
  )
}

function Row({ icon, color, label, on }: { icon: Icon; color: string; label: string; on: boolean }) {
  return (
    <div className="flex items-center gap-2.5"><IconBadge icon={icon} color={color} /><span className="flex-1">{label}</span><Switch on={on} color={color} /></div>
  )
}

function BatteryTab() {
  const pts = [92, 90, 86, 83, 80, 80, 80, 79, 80, 80, 80, 80]
  const path = pts.map((v, i) => `${(i / (pts.length - 1)) * 340},${70 - v * 0.65}`).join(' L')
  return (
    <>
      <div className="relative overflow-hidden rounded-[20px] p-4 text-white" style={{ background: grad(theme.electric) }}>
        <div className="flex items-center">
          <div className="flex-1">
            <span className="rounded-full bg-white/25 px-2 py-0.5 text-[11px] font-bold">Ditahan di batas</span>
            <div className="mt-1 flex items-baseline font-extrabold"><span className="text-[62px] leading-none">80</span><span className="text-[26px] opacity-75">%</span></div>
            <div className="mt-1 text-[13px] font-bold opacity-90">4.212 mAh tersimpan</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold opacity-75"><Plug className="h-3 w-3" />96W USB-C Power Adapter</div>
          </div>
          <div className="relative mr-2.5 h-[110px] w-14 rounded-xl border-[3px] border-white/80 p-1">
            <div className="absolute -top-2 left-1/2 h-1.5 w-5 -translate-x-1/2 rounded-t bg-white/80" />
            <div className="absolute inset-x-1 bottom-1 rounded-md bg-white" style={{ height: '78%' }} />
            <div className="absolute inset-x-0 border-t-2 border-dashed border-white/70" style={{ bottom: '80%' }} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {([[Heart, 'Kondisi', '98%', P.pink], [RefreshCw, 'Siklus', '142', P.blue], [Thermometer, 'Suhu', '31.4°', P.orange], [Bolt, 'Daya', '+0.0W', P.amber]] as const).map(([I, t, v, c]) => (
          <div key={t} className="rounded-xl bg-white/[.05] p-2">
            <I className="h-3.5 w-3.5" style={{ color: c }} />
            <div className="mt-1 text-[15px] font-extrabold">{v}</div>
            <div className="text-[10px] text-zinc-400">{t}</div>
          </div>
        ))}
      </div>
      <Card title="Riwayat" icon={LineChart}>
        <div className="flex gap-1.5 text-[11px]">
          <div className="flex flex-1 rounded-md bg-white/[.08] p-0.5">{['Baterai', 'Suhu', 'Daya'].map((x, i) => <span key={x} className={`flex-1 rounded py-0.5 text-center ${i === 0 ? 'bg-white/20' : 'text-zinc-400'}`}>{x}</span>)}</div>
          <div className="flex w-[110px] rounded-md bg-white/[.08] p-0.5">{['1j', '6j', '24j'].map((x, i) => <span key={x} className={`flex-1 rounded py-0.5 text-center ${i === 1 ? 'bg-white/20' : 'text-zinc-400'}`}>{x}</span>)}</div>
        </div>
        <svg viewBox="0 0 340 74" className="h-[74px] w-full">
          <defs><linearGradient id="hg" x1="0" x2="0" y1="0" y2="1"><stop stopColor={P.green} stopOpacity=".3" /><stop offset="1" stopColor={P.green} stopOpacity="0" /></linearGradient></defs>
          <path d={`M${path} L340,74 L0,74Z`} fill="url(#hg)" />
          <path d={`M${path}`} fill="none" stroke={P.green} strokeWidth="2" strokeLinecap="round" />
          <line x1="0" x2="340" y1={70 - 80 * 0.65} y2={70 - 80 * 0.65} stroke="#a1a1aa" strokeDasharray="4 3" />
          <text x="2" y={70 - 80 * 0.65 + 12} fill="#a1a1aa" fontSize="9">Batas 80%</text>
        </svg>
      </Card>
      <Card title="Pengisian" icon={BatteryFull}>
        <Row icon={Battery} color={P.green} label="Aktifkan limiter" on />
        <div className="flex items-center gap-2.5">
          <IconBadge icon={SlidersHorizontal} color={P.blue} /><span>Batas</span>
          <div className="relative h-1 flex-1 rounded-full bg-white/15"><div className="h-full w-0 rounded-full bg-blue-500" /><span className="absolute -top-1.5 left-0 h-4 w-4 rounded-full bg-white shadow" /></div>
          <span className="w-10 text-right font-semibold">80%</span>
        </div>
        <div className="text-[11px] text-zinc-400">macOS 27: memakai Charge Limit bawaan (80–100%)</div>
        <Row icon={ArrowUpToLine} color={P.teal} label="Top up ke 100% (sementara)" on={false} />
        <Row icon={ArrowDownToLine} color={P.violet} label="Auto discharge ke batas" on={false} />
      </Card>
      <Card title="Proteksi" icon={ShieldHalf}>
        <Row icon={Moon} color={P.indigo} label="Hentikan pengisian saat sleep" on />
        <div className="flex items-center gap-2.5"><IconBadge icon={Gauge} color={P.slate} /><span className="flex-1">Kalibrasi 100 → 10 → 100%</span><span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px]">Mulai</span></div>
      </Card>
    </>
  )
}

function SystemTab() {
  const bars: [string, number, string, string][] = [['CPU', 0.18, P.blue, '18%'], ['Memori', 0.62, P.violet, '9,8 / 16 GB'], ['Disk', 0.54, P.pink, '210 GB bebas']]
  const procs: [string, string, string][] = [['Google Chrome Helper', '12,5%', '820 MB'], ['Xcode', '8,1%', '1,4 GB'], ['Slack', '3,2%', '460 MB'], ['Spotify', '1,9%', '310 MB'], ['Finder', '0,4%', '120 MB']]
  return (
    <>
      <Card title="Aktivitas live" icon={Activity}>
        {bars.map(([n, v, c, cap]) => (
          <div key={n}>
            <div className="mb-1 flex justify-between text-[12px]"><span className="font-semibold">{n}</span><span className="text-zinc-400">{cap}</span></div>
            <div className="h-2 rounded-full bg-white/10"><div className="h-full rounded-full" style={{ width: `${v * 100}%`, background: c }} /></div>
          </div>
        ))}
      </Card>
      <Card title="Proses terberat" icon={Flame}>
        {procs.map(([n, cpu, mem]) => (
          <div key={n} className="flex items-center gap-2 text-[12px]">
            <AppWindow className="h-4 w-4 text-zinc-400" /><span className="flex-1 truncate">{n}</span>
            <span className="w-12 text-right tabular-nums text-blue-400">{cpu}</span><span className="w-14 text-right tabular-nums text-zinc-400">{mem}</span>
            <span className="rounded bg-white/10 px-1.5 text-[10px]">Tutup</span>
          </div>
        ))}
      </Card>
    </>
  )
}

function CleanerTab() {
  const junk: [string, string, boolean][] = [['Cache aplikasi', '2,1 GB', true], ['Xcode DerivedData', '6,4 GB', true], ['iOS DeviceSupport', '3,8 GB', true], ['Cache npm', '1,2 GB', false], ['Log sistem', '340 MB', true], ['Trash', '820 MB', false]]
  return (
    <>
      <Card title="File sampah" icon={Trash2}>
        {junk.map(([n, s, on]) => (
          <div key={n} className="flex items-center gap-2.5 text-[12.5px]">
            <span className={`flex h-4 w-4 items-center justify-center rounded border text-[10px] ${on ? 'border-orange-500 bg-orange-500' : 'border-white/30'}`}>{on && '✓'}</span>
            <span className="flex-1">{n}</span><span className="tabular-nums text-zinc-400">{s}</span>
          </div>
        ))}
        <div className="mt-1 flex items-center justify-between"><span className="text-[12px] text-zinc-400">Terpilih 13,4 GB</span><span className="rounded-lg px-3 py-1 text-[12px] font-bold" style={{ background: grad(theme.coral) }}>Bersihkan</span></div>
      </Card>
      <Card title="Simulator iOS" icon={Smartphone}>
        {[['iPhone 15 Pro · iOS 17.5', '4,2 GB'], ['iPad Air · iOS 17.2', '3,1 GB']].map(([n, s]) => (
          <div key={n} className="flex items-center gap-2 text-[12.5px]"><span className="flex-1">{n}</span><span className="text-zinc-400">{s}</span><span className="rounded bg-white/10 px-1.5 text-[10px]">Hapus</span></div>
        ))}
      </Card>
      <Card title="Analisis disk" icon={BarChart3}>
        {[['Developer', 0.9, '48 GB'], ['Library', 0.55, '29 GB'], ['Movies', 0.3, '16 GB']].map(([n, v, s]) => (
          <div key={n as string} className="text-[12px]">
            <div className="mb-1 flex justify-between"><span>{n}</span><span className="text-zinc-400">{s}</span></div>
            <div className="h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-orange-500" style={{ width: `${(v as number) * 100}%` }} /></div>
          </div>
        ))}
      </Card>
    </>
  )
}

function ToolsTab() {
  const quick: [Icon, string, string, boolean][] = [[Coffee, 'Cegah sleep', P.amber, true], [Eye, 'File tersembunyi', P.blue, false], [Monitor, 'Ikon desktop', P.teal, true], [Moon, 'Dark mode', P.indigo, true], [Camera, 'Screenshot area', P.pink, false], [Power, 'Layar mati', P.slate, false]]
  return (
    <>
      <Card title="Aksi cepat" icon={Zap}>
        <div className="grid grid-cols-3 gap-2">
          {quick.map(([I, n, c, on]) => (
            <div key={n} className="flex flex-col items-center gap-1.5 rounded-xl p-2.5 text-center text-[11px] font-semibold" style={{ background: on ? `${c}33` : 'rgba(255,255,255,.05)' }}>
              <I className="h-5 w-5" style={{ color: c }} />{n}
            </div>
          ))}
        </div>
      </Card>
      <Card title="Fitur" icon={ToggleRight}>
        <Row icon={Images} color={P.pink} label="Notch" on />
        <Row icon={Sparkles} color={P.violet} label="Tab AI" on />
        <Row icon={Trash2} color={P.orange} label="Tab Cleaner" on />
        <Row icon={ShieldCheck} color={P.sky} label="Rapat di notch" on={false} />
      </Card>
      <Card title="Shortcut notch" icon={Command}>
        {[['Buka / tutup', '⌃⌥Space'], ['Catatan', '⌃⌥N'], ['Clipboard', '⌃⌥V'], ['Salin teks dari layar', '⌃⌥T']].map(([n, k]) => (
          <div key={n} className="flex justify-between text-[12.5px]"><span>{n}</span><kbd className="rounded bg-white/10 px-1.5 font-mono text-[11px]">{k}</kbd></div>
        ))}
      </Card>
    </>
  )
}

export default function PanelPreview({ tab, setTab }: { tab: number; setTab: (i: number) => void }) {
  const t = panelTabs[tab].t
  return (
    <Scaled w={400} h={620}>
      <div className="relative flex h-[620px] w-[400px] flex-col overflow-hidden rounded-[14px] border border-white/10 bg-[#1e1e20]/95 text-left text-white shadow-2xl">
        <motion.div className="pointer-events-none absolute inset-x-0 top-0 h-[330px]" animate={{ background: `radial-gradient(330px circle at 50% 0%, ${t[0]}66, ${t[1]}1f 50%, transparent 70%)` }} transition={{ duration: 0.4 }} />
        <div className="relative flex items-center gap-2.5 px-4 pt-3.5">
          <IconBadge icon={ShieldCheck} color={P.green} size={30} />
          <div className="flex-1">
            <div className="text-[15px] font-extrabold">Baterai Safer</div>
            <div className="text-[11px] font-medium text-zinc-400">80% · dicas</div>
          </div>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[.07]"><Power className="h-3 w-3" strokeWidth={3} /></span>
        </div>
        <div className="relative mx-3.5 mb-1 mt-3 flex gap-1 rounded-full bg-white/[.07] p-1">
          {panelTabs.map((x, i) => (
            <button key={x.title} onClick={() => setTab(i)} className="relative flex flex-1 items-center justify-center gap-1 py-1.5 text-[12px] font-bold">
              {i === tab && <motion.span layoutId="ptab" className="absolute inset-0 rounded-full" style={{ background: grad(x.t) }} transition={{ type: 'spring', duration: 0.35 }} />}
              <x.icon className="relative h-3 w-3" strokeWidth={2.8} /><span className="relative">{x.title}</span>
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
