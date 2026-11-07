import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ChevronDown, Download } from 'lucide-react'
import NotchDemo from './components/NotchDemo'
import CopyCommand from './components/CopyCommand'
import { DMG, INSTALL, REPO, VERSION, battery, faq, highlights, menubar, notch } from './data'

// lucide v1 dropped brand icons.
function Github({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

type Item ={ icon: React.ComponentType<{ className?: string }>; title: string; desc: string }

function Section({ id, eyebrow, title, sub, children }: { id?: string; eyebrow: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">{eyebrow}</div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h2>
        {sub && <p className="mt-4 text-lg text-zinc-400">{sub}</p>}
      </motion.div>
      {children}
    </section>
  )
}

function Grid({ items, cols = 'lg:grid-cols-4' }: { items: Item[]; cols?: string }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${cols}`}>
      {items.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-emerald-400/40 hover:bg-white/[0.05]"
        >
          <div className="mb-4 inline-flex rounded-xl bg-emerald-400/10 p-2.5 text-emerald-400 transition group-hover:bg-emerald-400/20">
            <f.icon className="h-5 w-5" />
          </div>
          <h3 className="font-semibold">{f.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
      {faq.map((f, i) => (
        <div key={f.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold"
          >
            {f.q}
            <ChevronDown className={`h-5 w-5 shrink-0 text-zinc-500 transition ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && <p className="px-6 pb-5 text-zinc-400">{f.a}</p>}
        </div>
      ))}
    </div>
  )
}

export default function App() {
  return (
    <div className="relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.18),transparent_60%)]" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2.5 font-bold">
            <img src="/icon.png" alt="" className="h-8 w-8" />
            Baterai Safer
          </a>
          <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="#baterai" className="hover:text-white">Baterai</a>
            <a href="#notch" className="hover:text-white">Notch</a>
            <a href="#install" className="hover:text-white">Install</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <a href={REPO} aria-label="GitHub" className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white">
              <Github className="h-5 w-5" />
            </a>
            <a href="#install" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300">
              Download
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <a href={`${REPO}/releases/tag/v${VERSION}`} className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> v{VERSION} · siap untuk macOS 27
            </a>
            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
              Jaga baterai MacBook{' '}
              <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">tetap sehat.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
              Charge limit, kalibrasi, dan top up dari menu bar. Bonus notch serbaguna untuk musik, fokus, catatan, clipboard, dan Git.
              Gratis dan open source.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={DMG} className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-7 py-3.5 font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-300">
                <Download className="h-5 w-5" /> Download gratis
              </a>
              <a href={REPO} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold transition hover:bg-white/5">
                <Github className="h-5 w-5" /> Lihat di GitHub
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
              {highlights.map((h) => (
                <span key={h.label} className="inline-flex items-center gap-1.5">
                  <h.icon className="h-4 w-4" /> {h.label}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-16">
            <NotchDemo />
            <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-zinc-500">
              <ArrowDown className="h-4 w-4" /> Klik ikon di notch untuk ganti tampilan
            </p>
          </motion.div>
        </section>

        <Section id="baterai" eyebrow="Baterai" title="Kontrol penuh atas pengisian." sub="Baterai lithium paling awet kalau tidak terus-terusan di 100%. Baterai Safer menahannya di batas yang kamu pilih.">
          <Grid items={battery} />
        </Section>

        <Section id="notch" eyebrow="Notch" title="Notch yang benar-benar berguna." sub="Arahkan kursor ke notch, atau ke tengah atas layar di Mac tanpa notch. Tiap tab bisa dimatikan kalau tidak dipakai.">
          <Grid items={notch} cols="lg:grid-cols-3" />
          <p className="mt-8 text-center text-sm text-zinc-500">
            Shortcut: <kbd className="font-mono text-zinc-300">⌃⌥Space</kbd> buka/tutup · <kbd className="font-mono text-zinc-300">⌃⌥T</kbd> salin teks dari layar (OCR) · rapat berikutnya muncul di samping kamera dengan tombol Join.
          </p>
        </Section>

        <Section eyebrow="Menu bar" title="Satu panel, empat tab.">
          <Grid items={menubar} />
        </Section>

        <Section id="install" eyebrow="Download" title="Install dalam satu menit." sub="Butuh Mac Apple Silicon dengan macOS 13 atau lebih baru.">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] p-6 text-center sm:flex-row sm:text-left">
              <img src="/icon.png" alt="" className="h-16 w-16" />
              <div className="flex-1">
                <div className="font-semibold">Download DMG</div>
                <p className="mt-1 text-sm text-zinc-400">
                  Seret ke Applications. Saat pertama dibuka, macOS akan memblokir karena aplikasi belum ditandatangani Apple: buka
                  System Settings → Privacy & Security → <span className="text-zinc-200">Open Anyway</span>.
                </p>
              </div>
              <a href={DMG} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-emerald-300">
                <Download className="h-5 w-5" /> v{VERSION}
              </a>
            </div>
            <div className="text-center text-sm text-zinc-500">atau lewat Homebrew (di-build di Mac kamu, update dengan brew upgrade)</div>
            <CopyCommand lines={INSTALL} />
            <ol className="grid gap-4 sm:grid-cols-3">
              {[
                ['1', 'Pasang aplikasinya', 'Lewat DMG, atau perintah Homebrew di atas.'],
                ['2', 'Klik ikon baterai', 'Ikon muncul di menu bar dan jalan otomatis saat login.'],
                ['3', 'Install helper…', 'Masukkan password admin sekali, batas langsung aktif.'],
              ].map(([n, t, d]) => (
                <li key={n} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 text-sm font-bold text-zinc-950">{n}</div>
                  <div className="font-semibold">{t}</div>
                  <div className="mt-1 text-sm text-zinc-400">{d}</div>
                </li>
              ))}
            </ol>
            <div className="flex flex-col items-center justify-center gap-3 text-sm sm:flex-row">
              <span className="text-zinc-500">Update:</span>
              <code className="rounded-lg bg-white/5 px-3 py-1.5 font-mono text-zinc-300">brew update && brew upgrade baterai-safer</code>
              <a href={`${REPO}/archive/refs/tags/v${VERSION}.zip`} className="text-emerald-400 hover:underline">Download source (.zip)</a>
            </div>
          </div>
        </Section>

        <Section id="faq" eyebrow="FAQ" title="Pertanyaan umum.">
          <Faq />
        </Section>

        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/15 to-teal-500/5 px-6 py-16 text-center">
            <img src="/icon.png" alt="" className="mx-auto mb-6 h-20 w-20" />
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Baterai sehat lebih lama. Gratis, selamanya.</h2>
            <a href={DMG} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-zinc-950 transition hover:bg-emerald-300">
              <Download className="h-5 w-5" /> Download v{VERSION}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} Baterai Safer · MIT License</span>
          <div className="flex gap-6">
            <a href={REPO} className="hover:text-white">GitHub</a>
            <a href={`${REPO}/issues`} className="hover:text-white">Laporkan bug</a>
          </div>
        </div>
        <p className="mx-auto max-w-6xl px-4 pb-8 text-center text-xs text-zinc-600 sm:px-6">
          Memakai API privat Apple yang bisa berubah di update macOS. Mac dan macOS adalah merek dagang Apple Inc.
        </p>
      </footer>
    </div>
  )
}
