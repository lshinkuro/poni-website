import { useState } from 'react'
import { Download, ExternalLink, FileArchive } from 'lucide-react'
import { REPO } from '../data'
import { useReleases, type Release } from '../releases'

// Release notes are short markdown: "**Heading**" lines and "- item" lists.
function Notes({ text }: { text: string }) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  const strip = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '$1')
  return (
    <div className="space-y-1.5 text-sm text-zinc-400">
      {lines.map((l, i) =>
        l.startsWith('- ') ? (
          <div key={i} className="flex gap-2"><span className="text-emerald-400">•</span><span>{strip(l.slice(2))}</span></div>
        ) : l.startsWith('**') ? (
          <div key={i} className="pt-2 font-semibold text-zinc-200">{strip(l)}</div>
        ) : (
          <p key={i}>{strip(l)}</p>
        ),
      )}
    </div>
  )
}

function Card({ r, latest }: { r: Release; latest: boolean }) {
  const date = new Date(r.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <div className={`rounded-2xl border p-6 ${latest ? 'border-emerald-400/30 bg-emerald-400/[0.05]' : 'border-white/10 bg-white/[0.03]'}`}>
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-xl font-bold">{r.tag}</h3>
        {latest && <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">Terbaru</span>}
        <span className="text-sm text-zinc-500">{date}</span>
        <div className="ml-auto flex flex-wrap gap-2">
          {r.dmg && (
            <a href={r.dmg} className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${latest ? 'bg-emerald-400 text-zinc-950 hover:bg-emerald-300' : 'border border-white/15 hover:bg-white/5'}`}>
              <Download className="h-4 w-4" /> DMG
            </a>
          )}
          <a href={`${REPO}/archive/refs/tags/${r.tag}.zip`} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold transition hover:bg-white/5">
            <FileArchive className="h-4 w-4" /> Source
          </a>
        </div>
      </div>
      {r.notes && <div className="mt-4"><Notes text={r.notes} /></div>}
    </div>
  )
}

export default function Releases() {
  const releases = useReleases()
  const [all, setAll] = useState(false)

  if (releases === null) {
    return <div className="mx-auto max-w-3xl space-y-4">{[0, 1].map((i) => <div key={i} className="h-32 animate-pulse rounded-2xl bg-white/[0.04]" />)}</div>
  }
  if (releases.length === 0) {
    return (
      <p className="text-center text-zinc-400">
        Daftar rilis tidak bisa dimuat. Lihat langsung di{' '}
        <a href={`${REPO}/releases`} className="text-emerald-400 hover:underline">GitHub Releases</a>.
      </p>
    )
  }
  const shown = all ? releases : releases.slice(0, 3)
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {shown.map((r, i) => <Card key={r.tag} r={r} latest={i === 0} />)}
      <div className="flex justify-center gap-6 pt-2 text-sm">
        {releases.length > 3 && (
          <button onClick={() => setAll(!all)} className="font-semibold text-emerald-400 hover:underline">
            {all ? 'Tampilkan lebih sedikit' : `Lihat semua ${releases.length} rilis`}
          </button>
        )}
        <a href={`${REPO}/releases`} className="inline-flex items-center gap-1 text-zinc-400 hover:text-white">
          GitHub Releases <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}
