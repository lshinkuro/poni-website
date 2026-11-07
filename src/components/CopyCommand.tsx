import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CopyCommand({ lines }: { lines: string[] }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard can be blocked (insecure context); the text is still selectable.
    }
  }
  return (
    <div className="relative rounded-2xl border border-white/10 bg-black/60 text-left">
      <button
        onClick={copy}
        aria-label="Salin perintah"
        className="absolute right-3 top-3 rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre className="overflow-x-auto p-5 pr-14 font-mono text-[13px] leading-7 text-zinc-300">
        {lines.map((l) => (
          <div key={l}>
            <span className="select-none text-emerald-400">$ </span>
            {l}
          </div>
        ))}
      </pre>
    </div>
  )
}
