// Mirrors NotchView (Notch.swift): 720×300 island, tab capsule left, title + quick toggles right.
import { useId } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import {
  AlignLeft, ArrowDown, ArrowDownCircle, ArrowUp, ArrowUpCircle, BatteryCharging, BatteryMedium, Bell, BellOff, BookOpen, Braces, CalendarDays, Check, CheckCircle2, ChevronDown, ChevronRight,
  Clock, ClipboardList, ClipboardPaste, Copy, Cpu, Download, Eject, FileArchive, FileText, Flame, Gamepad2, Gauge, GitBranch, Hand, HardDrive, Hash, Heart, History, House,
  Image as ImageIcon, Inbox, LayoutGrid, Maximize2, MemoryStick, Mic, MoonStar, Music, Navigation, Paintbrush, Pause, Pencil, Pin, Pipette, Plus, Radio, RefreshCw, RotateCcw,
  Search, SkipBack, SkipForward, Sparkles, SquarePen, StickyNote, Target, Timer, Trash2, Volume2, X, Coffee, Video,
} from 'lucide-react'
import { Chip, NButton, NCard, Ring, Scaled, Segments, Switch } from './mock'
import { P, type Icon } from './theme'

const notchTabs: { key: string; icon: Icon; title: string }[] = [
  { key: 'home', icon: House, title: 'Home' },
  { key: 'music', icon: Music, title: 'Musik' },
  { key: 'focus', icon: Timer, title: 'Fokus' },
  { key: 'agenda', icon: CalendarDays, title: 'Rapat' },
  { key: 'ai', icon: Sparkles, title: 'AI' },
  { key: 'notes', icon: StickyNote, title: 'Catatan' },
  { key: 'dev', icon: Braces, title: 'Dev Utils' },
  { key: 'clip', icon: ClipboardList, title: 'Clipboard' },
  { key: 'shelf', icon: Inbox, title: 'Shelf' },
  { key: 'git', icon: GitBranch, title: 'Git' },
  { key: 'stats', icon: Gauge, title: 'Stats' },
  { key: 'ibadah', icon: MoonStar, title: 'Ibadah' },
  { key: 'more', icon: LayoutGrid, title: 'Lainnya' },
]

const ART = 'linear-gradient(135deg,#f472b6,#a855f7 50%,#f97316)'

function Equalizer() {
  return (
    <div className="flex h-3.5 items-center gap-[2px]">
      {[0, 1, 2, 3].map((i) => (
        <motion.span key={i} className="w-[3px] rounded-full bg-white/80" animate={{ height: [4, 14, 6, 12, 4] }} transition={{ duration: 1.1 + i * 0.2, repeat: Infinity }} />
      ))}
    </div>
  )
}

function HomeTab() {
  const todos: [string, boolean][] = [['Kirim laporan Q3', false], ['Balas email klien', false], ['Beli kopi bubuk', true]]
  const card = (icon: Icon, title: string, n: number | null, body: React.ReactNode) => {
    const I = icon
    return (
      <NCard glow className="flex min-w-0 flex-1 flex-col gap-2.5">
        <div className="flex items-center gap-[5px] text-[10px] font-semibold tracking-[.8px] text-zinc-400">
          <I className="h-2.5 w-2.5" strokeWidth={2.6} />{title}<span className="flex-1" />{n && <span className="tabular-nums">{n}</span>}<ChevronRight className="h-2.5 w-2.5" strokeWidth={2.6} />
        </div>
        {body}
      </NCard>
    )
  }
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <span className="text-[15px] font-semibold">Selamat pagi</span><span className="text-[12px] text-zinc-400">Kamis, 12 November</span>
        <span className="ml-auto text-[11px] font-semibold">Atur</span>
      </div>
      <div className="flex min-h-0 flex-1 gap-2.5">
        {card(Music, 'MUSIK', null, (
          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-2">
              <div className="h-[52px] w-[52px] shrink-0 rounded-xl" style={{ background: ART }} />
              <div className="min-w-0 flex-1"><div className="truncate text-[12px] font-semibold">Senja di Kota</div><div className="truncate text-[11px] text-zinc-400">Contoh Artis</div></div>
              <Equalizer />
            </div>
            <div className="mt-auto h-1 rounded-full bg-white/[.18]"><div className="h-full w-[42%] rounded-full bg-white/80" /></div>
            <div className="mt-3 flex items-center justify-center gap-5"><SkipBack className="h-3.5 w-3.5 fill-white" /><Pause className="h-[18px] w-[18px] fill-white" /><SkipForward className="h-3.5 w-3.5 fill-white" /></div>
          </div>
        ))}
        {card(CalendarDays, 'KALENDER', 2, (
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2"><span className="text-[32px] font-semibold leading-none tabular-nums">12</span><span className="text-[12px] font-semibold" style={{ color: P.accent }}>Kamis</span></div>
            {[['09.00', 'Standup tim'], ['13.00', 'Review desain']].map(([t, n]) => <div key={n} className="truncate text-[11px]"><span className="tabular-nums text-zinc-400">{t}</span> {n}</div>)}
          </div>
        ))}
        {card(CheckCircle2, 'TODO', 2, (
          <div className="flex flex-1 flex-col gap-[7px]">
            {todos.map(([n, done]) => (
              <div key={n} className={`flex items-center gap-1.5 truncate text-[11px] ${done ? 'text-zinc-500 line-through' : ''}`}>
                <CheckCircle2 className="h-3 w-3 shrink-0" style={{ color: done ? P.accent : '#71717a' }} />{n}
              </div>
            ))}
            <div className="mt-auto flex items-center rounded-full bg-white/[.07] py-1 pl-2.5 pr-1 text-[11px] text-white/40"><span className="flex-1">Tugas baru</span><span className="flex h-[18px] w-[18px] items-center justify-center rounded-full" style={{ background: `${P.accent}66`, color: P.onAccent }}><Plus className="h-2.5 w-2.5" strokeWidth={3} /></span></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MusicTab() {
  return (
    <div className="flex h-full gap-[18px]">
      <div className="h-[150px] w-[150px] shrink-0 rounded-2xl shadow-[0_6px_14px_rgba(0,0,0,.6)]" style={{ background: ART }} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[18px] font-bold">Senja di Kota</div>
            <div className="text-[13px] text-white/60">Contoh Artis</div>
          </div>
          <Equalizer />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <div className="text-[15px] font-semibold">Lampu jalan menyala satu per satu</div>
          <div className="text-[12px] text-white/45">dan langkahku pulang tanpa ragu</div>
        </div>
        <div className="h-1 rounded-full bg-white/[.18]"><div className="h-full w-[42%] rounded-full bg-white" /></div>
        <div className="mt-1 flex justify-between text-[10px] font-medium tabular-nums text-white/50"><span>1:28</span><span>-2:04</span></div>
        <div className="mt-1.5 flex justify-center gap-[34px]">
          <SkipBack className="h-[17px] w-[17px] fill-white" /><Pause className="h-[26px] w-[26px] fill-white" /><SkipForward className="h-[17px] w-[17px] fill-white" />
        </div>
      </div>
    </div>
  )
}

function FocusTab() {
  const days = [['Sab', 50], ['Min', 25], ['Sen', 100], ['Sel', 75], ['Rab', 125], ['Kam', 50], ['Jum', 75]] as const
  return (
    <div className="flex h-full gap-3.5">
      <NCard className="flex w-[210px] flex-col items-center justify-center gap-3">
        <Ring value={0.97} label="24:17" caption="fokus 1/4" size={128} line={10} />
        <div className="flex gap-2"><NButton icon={RotateCcw} /><NButton icon={Pause} title="Jeda" prominent /><NButton icon={SkipForward} /></div>
      </NCard>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-1.5 rounded-full bg-white/[.09] px-3 py-[7px] text-[12px] font-semibold"><Target className="h-3.5 w-3.5" style={{ color: P.accent }} />Laporan Q3</div>
          <Segments items={['25m', '50m', '90m']} active={1} />
        </div>
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <Switch on />Blokir pengganggu <span className="font-normal text-zinc-400">5 aplikasi ▾</span>
          <span className="ml-auto"><Chip text="aktif" icon={Hand} color={P.accent} /></span>
        </div>
        <NCard pad={10} className="flex flex-1 flex-col">
          <div className="flex gap-2.5 text-[10px] font-semibold" style={{ color: P.accent }}>
            <span className="flex items-center gap-1"><Flame className="h-3 w-3" />6 hari</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />75 menit hari ini</span>
            <span className="ml-auto text-zinc-400">7 HARI</span>
          </div>
          <div className="mt-2 flex flex-1 items-end gap-3">
            {days.map(([d, m]) => (
              <div key={d} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded" style={{ height: m * 0.4, background: P.accent }} />
                <span className="text-[9px] text-zinc-400">{d}</span>
              </div>
            ))}
          </div>
        </NCard>
      </div>
    </div>
  )
}

function AITab() {
  return (
    <div className="flex h-full flex-col gap-2.5">
      <Segments items={['Chat', 'Pemakaian']} active={0} className="self-start" />
      <div className="flex flex-1 flex-col gap-2.5">
        <div className="self-end rounded-[14px] px-3 py-[7px] text-[12px] font-medium" style={{ background: `${P.accent}38` }}>Kenapa muncul error "Cannot find 'user' in scope"?</div>
        <div className="flex gap-2">
          <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full" style={{ background: `${P.accent}29`, color: P.accent }}><Sparkles className="h-2.5 w-2.5" strokeWidth={3} /></span>
          <p className="text-[12px] leading-relaxed text-white/90">
            Variabel <b>user</b> dideklarasikan di dalam blok <code className="font-mono">if let</code>, jadi tidak terlihat di luar blok itu. Pindahkan pemakaiannya ke dalam blok, atau gunakan <code className="font-mono">guard let</code> supaya tetap tersedia di sisa fungsi.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <NButton icon={Sparkles} title="Claude" tint="#fff" /><NButton icon={Paintbrush} title="Visual" />
        <div className="flex flex-1 items-center rounded-full border border-white/10 bg-white/[.09] py-1 pl-3 pr-1 text-[12px] text-white/40">
          <span className="flex-1">Tanya Claude…</span><ArrowUpCircle className="h-5 w-5 opacity-40" style={{ color: P.accent }} />
        </div>
        <NButton icon={History} /><NButton icon={SquarePen} /><NButton icon={Maximize2} />
      </div>
    </div>
  )
}

function NotesTab() {
  const notes = [['Belanja', 'baru saja'], ['Ide fitur', '2 jam lalu'], ['Rapat Senin', 'kemarin']]
  return (
    <div className="flex h-full gap-2.5">
      <div className="flex w-[170px] flex-col gap-1.5">
        <span><NButton icon={Plus} title="Baru" tint={P.accent} /></span>
        {notes.map(([n, w], i) => (
          <div key={n} className="rounded-[10px] px-[9px] py-1.5" style={i === 0 ? { background: P.accent, color: P.onAccent } : { background: 'rgba(255,255,255,.05)' }}>
            <div className="text-[11px] font-semibold">{n}</div>
            <div className={`text-[9px] ${i === 0 ? 'opacity-70' : 'text-zinc-400'}`}>{w}</div>
          </div>
        ))}
      </div>
      <NCard pad={10} className="flex flex-1 flex-col">
        <div className="flex-1 whitespace-pre-line text-[12px] leading-relaxed">{'# Belanja\n- susu\n- roti tawar\n- kopi bubuk\n- baterai AA'}</div>
        <div className="flex items-center gap-1.5">
          <span className="flex-1 text-[10px] text-white/50">Tersinkron ke Apple Notes</span>
          <NButton icon={Sparkles} title="Rapikan dengan AI" tint={P.accent} /><NButton icon={Copy} /><NButton icon={Trash2} tint={P.red} />
        </div>
      </NCard>
    </div>
  )
}

function DevTab() {
  const res: [string, string, boolean?][] = [
    ['JWT header', '{\n  "alg" : "HS256"\n}'],
    ['JWT payload', '{\n  "exp" : 1000000000,\n  "sub" : "budi"\n}'],
    ['JWT exp — SUDAH KEDALUWARSA', '2001-09-09T01:46:40Z', true],
  ]
  return (
    <div className="flex h-full gap-2.5">
      <div className="flex w-[290px] flex-col gap-1.5">
        <NCard pad={8} className="flex-1 break-all font-mono text-[11px] text-white/90">eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJidWRpIiwiZXhwIjoxMDAwMDAwMDAwfQ.sig</NCard>
        <div className="flex gap-1.5"><NButton icon={ClipboardPaste} title="Tempel" tint={P.accent} /><NButton icon={Clock} /><NButton icon={Hash} /><span className="flex-1" /><NButton icon={X} /></div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 overflow-hidden">
        {res.map(([title, out, warn]) => (
          <div key={title} className="rounded-[10px] bg-white/[.045] p-[9px]">
            <div className="flex justify-between text-[10px] font-semibold" style={{ color: warn ? P.amber : '#a1a1aa' }}><span>{title}</span><span className="font-bold text-white/70">Salin</span></div>
            <pre className="mt-1 whitespace-pre-wrap font-mono text-[11px]">{out}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}

function ClipTab() {
  const rows: [string, boolean, boolean][] = [
    ['npm run build && npm run preview', false, true], ['Screenshot 2026-11-07 · teks terbaca', true, false],
    ['https://github.com/lshinkuro/poni', false, false], ['{"status":"ok","items":12}', false, false], ['Rapat jam 3 di ruang Merapi', false, false],
  ]
  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex gap-2">
        <div className="flex flex-1 items-center gap-1.5 rounded-full border border-white/10 bg-white/[.09] px-3 py-[7px] text-[12px] text-white/40"><Search className="h-3.5 w-3.5" />Cari, termasuk teks di dalam gambar</div>
        <NButton icon={Trash2} title="Bersihkan" />
      </div>
      <div className="flex flex-col gap-[5px]">
        {rows.map(([txt, img, pin]) => (
          <div key={txt} className="flex items-center gap-2.5 rounded-[10px] bg-white/[.04] px-2 py-1">
            <span className="flex h-[30px] w-10 items-center justify-center rounded-md" style={{ background: img ? 'linear-gradient(135deg,#334155,#0f766e)' : `${P.accent}26`, color: P.accent }}>
              {img ? <ImageIcon className="h-3.5 w-3.5 text-white/70" /> : <AlignLeft className="h-3 w-3" strokeWidth={3} />}
            </span>
            <span className="flex-1 truncate text-[12px]">{img ? 'Gambar' : txt}{img && <span className="block text-[9px] text-zinc-400">Gambar · teks terbaca</span>}</span>
            {pin && <Pin className="h-3 w-3" style={{ color: P.accent, fill: P.accent }} />}
          </div>
        ))}
      </div>
    </div>
  )
}

function ShelfTab() {
  const files: [Icon, string, string][] = [[FileText, 'Laporan-Q3.pdf', '#ef4444'], [ImageIcon, 'desain-final.png', '#3b82f6'], [FileArchive, 'build-0.6.3.zip', '#a3a3a3'], [FileText, 'kontrak.docx', '#2563eb']]
  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex flex-1 items-center gap-2.5">
        {files.map(([I, n, c]) => (
          <div key={n} className="flex flex-col items-center gap-1.5 rounded-[10px] bg-white/[.06] p-1.5">
            <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/90" style={{ color: c }}><I className="h-7 w-7" /></span>
            <span className="w-[84px] text-center text-[10px] font-medium leading-tight">{n}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="flex-1 text-[10px] text-zinc-400">4 file · seret keluar untuk memindahkan</span>
        <NButton icon={X} title="Kosongkan" /><NButton icon={Radio} title="AirDrop" prominent />
      </div>
    </div>
  )
}

function GitTab() {
  const repos: [string, string, number, number, number][] = [['poni', 'main', 2, 1, 0], ['website', 'main', 0, 0, 0], ['mobile-app', 'feature/login', 5, 0, 3]]
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <Segments items={['Repo 3', 'Pull Request 4']} active={0} />
        <span className="flex-1" /><NButton icon={RefreshCw} /><NButton icon={Plus} title="Tambah repo" /><NButton icon={Maximize2} />
      </div>
      {repos.map(([n, b, c, up, down]) => (
        <div key={n} className="flex items-center gap-2.5 rounded-[10px] bg-white/[.06] px-2.5 py-2">
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px]" style={{ background: `${P.accent}2e`, color: P.accent }}><GitBranch className="h-4 w-4" /></span>
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-semibold">{n}</div>
            <div className="mt-0.5 flex gap-1">
              <Chip text={b} icon={GitBranch} color={P.accent} />
              <Chip text={c ? `${c} berubah` : 'bersih'} icon={c ? Pencil : Check} color={c ? P.amber : P.green} />
              {up > 0 && <Chip text={`${up}`} icon={ArrowUp} color={P.green} />}
              {down > 0 && <Chip text={`${down}`} icon={ArrowDown} color={P.accent} />}
            </div>
          </div>
          {c > 0 && <NButton icon={CheckCircle2} title="Commit" tint={P.green} />}
          <NButton icon={RefreshCw} /><NButton icon={ArrowDown} /><NButton icon={ArrowUp} />
        </div>
      ))}
    </div>
  )
}

function StatsTab() {
  // Rings take their color from the value, like the Battery tab.
  const s: [string, Icon, number, string, string][] = [
    ['Baterai', BatteryMedium, 0.8, P.accent, 'dicas'], ['CPU', Cpu, 0.15, P.accent, '10 core'],
    ['Memori', MemoryStick, 0.61, P.accent, '6,2 GB sisa'], ['Disk', HardDrive, 0.84, P.amber, '76 GB bebas'],
  ]
  return (
    <div className="flex h-full gap-2.5">
      {s.map(([title, I, v, c, cap]) => (
        <NCard key={title} className="flex flex-1 flex-col items-center justify-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400"><I className="h-3.5 w-3.5" />{title}</span>
          <Ring value={v} color={c} label={`${Math.round(v * 100)}%`} size={92} line={9} />
          <span className="text-[10px] font-medium text-white/70">{cap}</span>
        </NCard>
      ))}
    </div>
  )
}

function AgendaTab() {
  const days = Array.from({ length: 36 }, (_, i) => i - 5) // Nov 2026 starts on a Sunday: 6 blanks in a Monday-first grid
  const dots: Record<number, number> = { 3: 1, 9: 2, 10: 1, 12: 3, 17: 1, 24: 2 }
  // Event colors come from the user's calendars.
  const events: [string, string, string, string, string | null, boolean][] = [
    ['09.00', '30m', 'Standup tim', '#0ea5e9', 'berlangsung', true],
    ['13.00', '1j', 'Review desain', '#a855f7', '25m lagi', true],
    ['15.30', '45m', '1:1 dengan Budi', '#22c55e', null, false],
  ]
  return (
    <div className="flex h-full gap-3">
      <NCard pad={10} className="w-[250px] shrink-0">
        <div className="mb-1 flex items-center gap-1 text-[13px] font-semibold">November 2026<ChevronDown className="h-2.5 w-2.5 text-zinc-400" /><span className="ml-auto rounded-full px-[7px] py-[3px] text-[10px] font-bold" style={{ color: P.accent, background: `${P.accent}26` }}>Hari ini</span></div>
        <div className="grid grid-cols-7 gap-0.5 text-center">
          {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((d, i) => <div key={i} className="text-[9px] font-semibold text-white/35">{d}</div>)}
          {days.map((d) => (
            <div key={d} className={`flex h-[24px] flex-col items-center justify-center rounded-md text-[11px] font-medium ${d < 12 ? 'text-white/35' : ''}`} style={d === 12 ? { background: P.accent, color: P.onAccent, fontWeight: 700 } : undefined}>
              {d >= 1 && d <= 30 ? d : ''}
              <span className="flex h-[3.5px] gap-0.5">{Array.from({ length: dots[d] ?? 0 }, (_, i) => <span key={i} className="h-[3.5px] w-[3.5px] rounded-full" style={{ background: d === 12 ? P.onAccent : P.accent }} />)}</span>
            </div>
          ))}
        </div>
      </NCard>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <span className="text-[30px] font-semibold leading-none" style={{ color: P.accent }}>12</span>
          <div><div className="text-[13px] font-semibold">Kamis</div><div className="text-[10px] text-zinc-400">3 acara</div></div>
          <span className="ml-auto"><NButton icon={Plus} title="Tambah" prominent /></span>
        </div>
        {events.map(([t, d, title, c, st, bell]) => (
          <div key={title} className="flex items-center gap-2.5 rounded-[10px] bg-white/[.06] px-2.5 py-2">
            <div className="w-[44px] text-right"><div className="text-[13px] font-semibold tabular-nums">{t}</div><div className="text-[9px] text-zinc-400">{d}</div></div>
            <span className="h-8 w-[3px] rounded-full" style={{ background: c }} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12px] font-semibold">{title}</div>
              <div className="mt-0.5 flex gap-1">
                {st && <Chip text={st} color={st === 'berlangsung' ? P.green : P.accent} />}
                {bell && <Chip text="10m" icon={Bell} />}
              </div>
            </div>
            {st === 'berlangsung' && <NButton icon={Video} title="Join" prominent />}
          </div>
        ))}
      </div>
    </div>
  )
}

function IbadahTab() {
  const times: [string, string, boolean][] = [['Imsak', '04.02', false], ['Subuh', '04.12', true], ['Terbit', '05.28', false], ['Dzuhur', '11.39', true], ['Ashar', '14.59', true], ['Maghrib', '17.50', true], ['Isya', '19.03', true]]
  return (
    <div className="flex h-full gap-3">
      <NCard className="flex w-[230px] shrink-0 flex-col">
        <div className="text-[10px] font-semibold tracking-[.8px] text-zinc-400">SHOLAT BERIKUTNYA</div>
        <div className="mt-2 flex items-baseline gap-2"><span className="text-[24px] font-semibold leading-none">Dzuhur</span><span className="text-[15px] font-medium tabular-nums" style={{ color: P.accent }}>11.39</span></div>
        <div className="mt-1.5 text-[12px] text-zinc-400">2j 29m lagi</div>
        <div className="mt-auto flex flex-col items-start gap-2">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/80"><Navigation className="h-3 w-3 fill-white/80" />Jakarta Selatan<ChevronDown className="h-2.5 w-2.5" /></span>
          <NButton icon={BookOpen} title="Baca Al-Qur'an" prominent />
        </div>
      </NCard>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Segments items={['Jadwal', 'Ramadan', 'Zakat']} active={0} className="self-start" />
        {times.map(([n, t, bell], i) => {
          const next = n === 'Dzuhur', B = bell ? Bell : BellOff
          return (
            <div key={n} className={`flex h-[23px] items-center rounded-full px-3 text-[12px] font-semibold ${i < 3 ? 'text-white/40' : ''}`} style={next ? { background: P.accent, color: P.onAccent } : undefined}>
              <span className="flex-1">{n}</span><span className="tabular-nums">{t}</span>
              <B className="ml-4 h-3 w-3" style={{ color: next ? P.onAccent : bell ? P.accent : '#71717a', fill: bell ? 'currentColor' : 'none' }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MoreTab() {
  const tools: [Icon, string, string][] = [
    [BatteryCharging, 'Notif baterai penuh', 'Kabari saat sampai batas'],
    [Pipette, 'Pemilih warna', 'Ambil warna dari layar'],
    [Coffee, 'Tetap menyala', 'Cegah Mac tidur sementara'],
    [Download, 'Download', 'Kabari saat download selesai'],
    [Eject, 'Lepas USB', 'Lepas flashdisk dengan aman'],
    [BookOpen, 'Belajar Bahasa', 'Kuis & ngobrol dengan AI'],
    [CheckCircle2, 'Todo', 'Daftar tugas harian'],
    [Gamepad2, 'Gabut', 'Ular, kartu, X-O, catur, hangman, sudoku'],
    [Heart, 'Self-care', 'Skor harian, istirahat terpandu, mood'],
    [ArrowDownCircle, 'Pembaruan', 'Cek dan pasang versi baru'],
  ]
  return (
    <div className="grid h-full grid-cols-5 grid-rows-2 gap-2.5">
      {tools.map(([I, t, d]) => (
        <div key={t} className="flex flex-col gap-1.5 rounded-2xl border border-white/[.07] bg-white/[.045] p-2.5">
          <span className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-white/[.08] text-white/90"><I className="h-3.5 w-3.5" strokeWidth={2.4} /></span>
          <div className="mt-0.5 text-[11px] font-semibold leading-tight">{t}</div>
          <div className="line-clamp-2 text-[10px] leading-snug text-zinc-400">{d}</div>
        </div>
      ))}
    </div>
  )
}

const bodies = [HomeTab, MusicTab, FocusTab, AgendaTab, AITab, NotesTab, DevTab, ClipTab, ShelfTab, GitTab, StatsTab, IbadahTab, MoreTab]

/** The expanded island at native size (720×300), scaled to fit. */
export default function NotchPreview({ tab, setTab }: { tab: number; setTab: (i: number) => void }) {
  const cur = notchTabs[tab], Body = bodies[tab], group = useId()
  return (
    <Scaled w={720} h={300}>
      <div className="relative h-[300px] w-[720px] overflow-hidden rounded-b-[26px] bg-black text-left text-white shadow-[0_8px_36px_rgba(0,0,0,.55)] ring-1 ring-white/[.08]">
        {cur.key === 'music' && <div className="absolute inset-0 opacity-45 blur-[60px] saturate-150" style={{ background: ART }} />}
        <div className="relative flex h-8 items-center px-[18px] pt-1">
          {/* The page shows this preview twice; without a group the two pills fight over one layoutId. */}
          <LayoutGroup id={group}>
          <div className="flex gap-px rounded-full bg-white/[.07] p-0.5">
            {notchTabs.map((x, i) => (
              <button key={x.key} onClick={() => setTab(i)} title={x.title} aria-label={x.title} className="relative flex h-[22px] w-[17px] items-center justify-center">
                {i === tab && <motion.span layoutId="ntab" className="absolute inset-0 rounded-full" style={{ background: P.accent }} transition={{ type: 'spring', duration: 0.32, bounce: 0.2 }} />}
                <x.icon className="relative h-[11px] w-[11px]" strokeWidth={2.6} style={{ color: i === tab ? P.onAccent : '#8e8e93' }} />
              </button>
            ))}
          </div>
          </LayoutGroup>
          {/* camera housing */}
          <div className="mx-auto h-8 w-[190px]" />
          <div className="flex items-center gap-2 text-[12px] font-bold">
            {cur.title}
            <span className="flex items-center gap-2 text-[#8e8e93]"><Volume2 className="h-3 w-3" strokeWidth={2.6} /><Mic className="h-3 w-3" strokeWidth={2.6} /><Pin className="h-3 w-3" strokeWidth={2.6} /></span>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="relative h-[268px] px-[18px] pb-4 pt-2.5">
            <Body />
          </motion.div>
        </AnimatePresence>
      </div>
    </Scaled>
  )
}
