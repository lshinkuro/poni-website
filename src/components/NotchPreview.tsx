// Mirrors NotchView (Notch.swift): 720×300 island, tab capsule left, title + clock right.
import { AnimatePresence, motion } from 'framer-motion'
import {
  BatteryMedium, Braces, Clock, ClipboardList, Copy, Cpu, Flame, GitBranch, Gauge, HardDrive, Image as ImageIcon, Inbox, MemoryStick,
  Music, Pause, Pin, Plus, Radio, RotateCcw, Search, SkipBack, SkipForward, Sparkles, SquarePen, StickyNote, Timer, Trash2, Upload,
  ArrowDown, FileText, FileArchive, X, Hash, ClipboardPaste, AlignLeft, ArrowUpCircle, Target, Hand,
} from 'lucide-react'
import { NButton, NCard, Ring, Scaled } from './mock'
import { P, grad, theme, type Icon, type Theme } from './theme'

const notchTabs: { key: string; icon: Icon; title: string; color: string; t: Theme }[] = [
  { key: 'music', icon: Music, title: 'Musik', color: P.pink, t: theme.violet },
  { key: 'focus', icon: Timer, title: 'Fokus', color: P.orange, t: theme.amber },
  { key: 'ai', icon: Sparkles, title: 'AI', color: P.violet, t: theme.violet },
  { key: 'notes', icon: StickyNote, title: 'Catatan', color: P.yellow, t: theme.amber },
  { key: 'dev', icon: Braces, title: 'Dev Utils', color: P.sky, t: theme.electric },
  { key: 'clip', icon: ClipboardList, title: 'Clipboard', color: P.teal, t: theme.mint },
  { key: 'shelf', icon: Inbox, title: 'Shelf', color: P.blue, t: theme.electric },
  { key: 'git', icon: GitBranch, title: 'Git', color: P.indigo, t: theme.electric },
  { key: 'stats', icon: Gauge, title: 'Stats', color: P.green, t: theme.mint },
]

const ART = 'linear-gradient(135deg,#f472b6,#a855f7 50%,#f97316)'

function MusicTab() {
  return (
    <div className="flex h-full gap-[18px]">
      <div className="h-[150px] w-[150px] shrink-0 rounded-2xl shadow-[0_6px_14px_rgba(0,0,0,.6)]" style={{ background: ART }} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[17px] font-bold">Senja di Kota</div>
            <div className="text-[13px] text-white/60">Contoh Artis</div>
          </div>
          <div className="flex h-4 items-end gap-[2px]">
            {[0, 1, 2, 3].map((i) => (
              <motion.span key={i} className="w-[3px] rounded-full bg-white/80" animate={{ height: [4, 14, 6, 12, 4] }} transition={{ duration: 1.1 + i * 0.2, repeat: Infinity }} />
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <div className="text-[15px] font-semibold">Lampu jalan menyala satu per satu</div>
          <div className="text-[12px] text-white/45">dan langkahku pulang tanpa ragu</div>
        </div>
        <div className="h-1 rounded-full bg-white/20"><div className="h-full w-[42%] rounded-full bg-white" /></div>
        <div className="mt-1 flex justify-between text-[10px] font-medium tabular-nums text-white/50"><span>1:28</span><span>-2:04</span></div>
        <div className="mt-1.5 flex justify-center gap-[34px]">
          <SkipBack className="h-[17px] w-[17px] fill-white" /><Pause className="h-[26px] w-[26px] fill-white" /><SkipForward className="h-[17px] w-[17px] fill-white" />
        </div>
      </div>
    </div>
  )
}

function FocusTab({ t }: { t: Theme }) {
  const days = [['Sab', 50], ['Min', 25], ['Sen', 100], ['Sel', 75], ['Rab', 125], ['Kam', 50], ['Jum', 75]] as const
  return (
    <div className="flex h-full gap-3.5">
      <NCard t={t} className="flex w-[210px] flex-col items-center justify-center gap-3">
        <Ring value={0.97} color="#f97316" label="24:17" caption="fokus" size={128} line={10} />
        <div className="flex gap-2"><NButton icon={RotateCcw} /><NButton icon={Pause} title="Jeda" tint={P.orange} prominent /><NButton icon={SkipForward} /></div>
      </NCard>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-1.5 rounded-full bg-white/[.09] px-3 py-[7px] text-[12px] font-semibold"><Target className="h-3.5 w-3.5 text-orange-500" />Laporan Q3</div>
          <div className="flex items-center gap-0.5 rounded-full bg-white/[.07] p-0.5 text-[11px] font-bold opacity-50">
            {['25m', '50m', '90m'].map((m) => <span key={m} className={`rounded-full px-2 py-1 ${m === '50m' ? 'bg-orange-500/90' : 'text-zinc-400'}`}>{m}</span>)}
            <span className="px-1 text-zinc-400">⇅</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11.5px] font-semibold">
          <span className="relative inline-block h-[14px] w-[24px] rounded-full bg-orange-500"><span className="absolute right-0.5 top-0.5 h-[10px] w-[10px] rounded-full bg-white" /></span>
          Blokir pengganggu <span className="font-normal text-zinc-400">5 aplikasi ▾</span>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-orange-500/15 px-1.5 py-0.5 text-[9.5px] text-orange-500"><Hand className="h-2.5 w-2.5" />aktif</span>
        </div>
        <NCard t={t} pad={10} className="flex flex-1 flex-col">
          <div className="flex gap-2.5 text-[10px] font-bold">
            <span className="flex items-center gap-1 text-orange-500"><Flame className="h-3 w-3" />6 hari</span>
            <span className="flex items-center gap-1 text-blue-500"><Clock className="h-3 w-3" />75 menit hari ini</span>
            <span className="ml-auto text-zinc-400">7 HARI</span>
          </div>
          <div className="mt-2 flex flex-1 items-end gap-3">
            {days.map(([d, m]) => (
              <div key={d} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded bg-gradient-to-b from-orange-400 to-orange-600" style={{ height: m * 0.4 }} />
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
      <div className="flex flex-1 flex-col gap-3">
        <div className="self-end rounded-[14px] bg-gradient-to-r from-purple-500 to-indigo-500 px-3 py-[7px] text-[12px] font-medium">Kenapa muncul error "Cannot find 'user' in scope"?</div>
        <div className="flex gap-2">
          <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400"><Sparkles className="h-2.5 w-2.5" strokeWidth={3} /></span>
          <p className="text-[12px] leading-relaxed text-white/90">
            Variabel <b>user</b> dideklarasikan di dalam blok <code className="font-mono">if let</code>, jadi tidak terlihat di luar blok itu. Pindahkan pemakaiannya ke dalam blok, atau gunakan <code className="font-mono">guard let</code> supaya tetap tersedia di sisa fungsi.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-md bg-white/10 px-2 py-1 text-[11px]">Claude Code ▾</span>
        <div className="flex flex-1 items-center rounded-full border border-white/10 bg-white/[.09] py-1 pl-3 pr-1 text-[12px] text-white/40">
          <span className="flex-1">Tanya Claude Code…</span><ArrowUpCircle className="h-5 w-5 text-purple-500 opacity-40" />
        </div>
        <NButton icon={SquarePen} />
      </div>
    </div>
  )
}

function NotesTab({ t }: { t: Theme }) {
  const notes = [['Belanja', 'baru saja'], ['Ide fitur', '2 jam lalu'], ['Rapat Senin', 'kemarin']]
  return (
    <div className="flex h-full gap-2.5">
      <div className="flex w-[170px] flex-col gap-1.5">
        <NButton icon={Plus} title="Baru" tint={P.yellow} />
        {notes.map(([n, w], i) => (
          <div key={n} className="rounded-[10px] px-[9px] py-1.5" style={{ background: i === 0 ? grad(t) : 'rgba(255,255,255,.05)' }}>
            <div className="text-[11.5px] font-bold">{n}</div>
            <div className={`text-[9.5px] ${i === 0 ? 'text-white/80' : 'text-zinc-400'}`}>{w}</div>
          </div>
        ))}
      </div>
      <NCard t={t} pad={10} className="flex flex-1 flex-col">
        <div className="flex-1 whitespace-pre-line text-[12.5px] leading-relaxed">{'# Belanja\n- susu\n- roti tawar\n- kopi bubuk\n- baterai AA'}</div>
        <div className="flex items-center gap-1.5">
          <span className="flex-1 text-[10px] text-white/50">52 karakter</span>
          <NButton icon={Sparkles} title="Rapikan dengan AI" tint={P.violet} /><NButton icon={Copy} /><NButton icon={Trash2} tint={P.red} />
        </div>
      </NCard>
    </div>
  )
}

function DevTab({ t }: { t: Theme }) {
  const res = [
    ['JWT header', '{\n  "alg" : "HS256"\n}', P.blue],
    ['JWT payload', '{\n  "exp" : 1000000000,\n  "sub" : "budi"\n}', P.pink],
    ['JWT exp — SUDAH KEDALUWARSA', '2001-09-09T01:46:40Z', P.amber],
  ]
  return (
    <div className="flex h-full gap-2.5">
      <div className="flex w-[290px] flex-col gap-1.5">
        <NCard t={t} pad={8} className="flex-1 break-all font-mono text-[11.5px] text-white/90">eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJidWRpIiwiZXhwIjoxMDAwMDAwMDAwfQ.sig</NCard>
        <div className="flex gap-1.5"><NButton icon={ClipboardPaste} title="Tempel" tint={P.sky} /><NButton icon={Clock} /><NButton icon={Hash} /><span className="flex-1" /><NButton icon={X} /></div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 overflow-hidden">
        {res.map(([title, out, c]) => (
          <div key={title} className="rounded-xl p-[9px]" style={{ background: `${c}21` }}>
            <div className="flex justify-between text-[10.5px] font-extrabold" style={{ color: c }}><span>{title}</span><span className="text-white/70">Salin</span></div>
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
    ['https://github.com/lshinkuro/baterai-safer', false, false], ['{"status":"ok","items":12}', false, false], ['Rapat jam 3 di ruang Merapi', false, false],
  ]
  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex gap-2">
        <div className="flex flex-1 items-center gap-1.5 rounded-full border border-white/10 bg-white/[.09] px-3 py-[7px] text-[12px] text-white/40"><Search className="h-3.5 w-3.5" />Cari, termasuk teks di dalam gambar</div>
        <NButton icon={Trash2} title="Bersihkan" />
      </div>
      <div className="flex flex-col gap-[5px]">
        {rows.map(([txt, img, pin]) => (
          <div key={txt} className="flex items-center gap-2.5 rounded-lg bg-white/[.04] px-2 py-1">
            <span className="flex h-[30px] w-10 items-center justify-center rounded-md" style={{ background: img ? 'linear-gradient(135deg,#334155,#0f766e)' : '#14b8a626', color: P.teal }}>
              {img ? <ImageIcon className="h-3.5 w-3.5 text-white/70" /> : <AlignLeft className="h-3 w-3" strokeWidth={3} />}
            </span>
            <span className="flex-1 truncate text-[12px]">{img ? 'Gambar' : txt}{img && <span className="block text-[9.5px] text-zinc-400">Gambar · teks terbaca</span>}</span>
            {pin && <Pin className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
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
          <div key={n} className="flex flex-col items-center gap-1.5 rounded-xl bg-white/[.06] p-1.5">
            <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/90" style={{ color: c }}><I className="h-7 w-7" /></span>
            <span className="w-[84px] text-center text-[10px] font-medium leading-tight">{n}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="flex-1 text-[10.5px] text-zinc-400">4 file · seret keluar untuk memindahkan</span>
        <NButton icon={X} title="Kosongkan" /><NButton icon={Radio} title="AirDrop" tint={P.blue} prominent />
      </div>
    </div>
  )
}

function GitTab() {
  const repos: [string, string, string, string][] = [['baterai-safer', 'main', '2 perubahan', '↑1'], ['website', 'main', 'bersih', ''], ['mobile-app', 'feature/login', '5 perubahan', '↓3']]
  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5 rounded-full bg-white/[.07] p-0.5 text-[11px] font-bold">
          <span className="rounded-full bg-indigo-500/35 px-3 py-1 ring-1 ring-indigo-500">Repo 3</span><span className="px-3 py-1 text-zinc-400">Pull Request 4</span>
        </div>
        <span className="flex-1" /><NButton icon={RotateCcw} />
      </div>
      {repos.map(([n, b, c, ab]) => (
        <div key={n} className="flex items-center gap-2.5 rounded-xl bg-white/[.06] px-2.5 py-2">
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-indigo-500/20 text-indigo-400"><GitBranch className="h-4 w-4" /></span>
          <div className="flex-1">
            <div className="text-[12.5px] font-bold">{n}</div>
            <div className="text-[10.5px] text-zinc-400">{b} · {c} {ab && <span className="text-sky-400">{ab}</span>}</div>
          </div>
          <NButton icon={ArrowDown} title="Pull" /><NButton icon={Upload} title="Push" />
          {c !== 'bersih' && <NButton icon={Sparkles} title="Commit" tint={P.indigo} prominent />}
        </div>
      ))}
    </div>
  )
}

function StatsTab({ t }: { t: Theme }) {
  const s: [string, Icon, number, string, string][] = [
    ['Baterai', BatteryMedium, 0.8, P.green, 'dicas'], ['CPU', Cpu, 0.15, P.blue, '10 core'],
    ['Memori', MemoryStick, 0.61, P.violet, '6,2 GB sisa'], ['Disk', HardDrive, 0.54, P.pink, '210 GB bebas'],
  ]
  return (
    <div className="flex h-full gap-2.5">
      {s.map(([title, I, v, c, cap]) => (
        <NCard key={title} t={t} className="flex flex-1 flex-col items-center justify-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-bold text-zinc-400"><I className="h-3.5 w-3.5" />{title}</span>
          <Ring value={v} color={c} label={`${Math.round(v * 100)}%`} size={92} line={9} />
          <span className="text-[10.5px] font-medium text-white/70">{cap}</span>
        </NCard>
      ))}
    </div>
  )
}

function NotchBody({ tab }: { tab: number }) {
  const t = notchTabs[tab].t
  return [<MusicTab />, <FocusTab t={t} />, <AITab />, <NotesTab t={t} />, <DevTab t={t} />, <ClipTab />, <ShelfTab />, <GitTab />, <StatsTab t={t} />][tab]
}

/** The expanded island at native size (720×300), scaled to fit. */
export default function NotchPreview({ tab, setTab }: { tab: number; setTab: (i: number) => void }) {
  const cur = notchTabs[tab]
  return (
    <Scaled w={720} h={300}>
      <div className="relative h-[300px] w-[720px] overflow-hidden rounded-b-[26px] bg-black text-left text-white shadow-[0_8px_36px_rgba(0,0,0,.55)] ring-1 ring-white/[.08]">
        {cur.key === 'music' && <div className="absolute inset-0 opacity-45 blur-[60px] saturate-150" style={{ background: ART }} />}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ background: `radial-gradient(300px circle at 50% 0%, ${cur.color}47, transparent)` }}
          transition={{ duration: 0.4 }}
        />
        <div className="relative flex h-8 items-center px-[18px] pt-1">
          <div className="flex gap-px rounded-full bg-white/[.07] p-0.5">
            {notchTabs.map((x, i) => (
              <button key={x.key} onClick={() => setTab(i)} title={x.title} aria-label={x.title} className="relative flex h-[22px] w-[26px] items-center justify-center">
                {i === tab && <motion.span layoutId="ntab" className="absolute inset-0 rounded-full" style={{ background: grad(x.t), boxShadow: `0 0 10px ${x.color}99` }} transition={{ type: 'spring', duration: 0.35 }} />}
                <x.icon className="relative h-3 w-3" strokeWidth={2.8} style={{ color: i === tab ? '#fff' : `${x.color}bf` }} />
              </button>
            ))}
          </div>
          {/* camera housing */}
          <div className="mx-auto h-8 w-[190px]" />
          <div className="flex items-center gap-2 text-[12px] font-bold">
            {cur.title}
            <span className="flex items-center gap-1 text-white/80"><BatteryMedium className="h-3.5 w-3.5 text-green-400" />80% <span className="font-medium text-white/60">18.44</span></span>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="relative h-[252px] px-[18px] pb-4 pt-2.5">
            <NotchBody tab={tab} />
          </motion.div>
        </AnimatePresence>
      </div>
    </Scaled>
  )
}
