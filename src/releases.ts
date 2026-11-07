import { useEffect, useState } from 'react'
import { VERSION } from './data'

export type Release = { tag: string; date: string; notes: string; url: string; dmg?: string }

type GHRelease = {
  tag_name: string; published_at: string; body: string | null; html_url: string; draft: boolean; prerelease: boolean
  assets: { name: string; browser_download_url: string }[]
}

// One request per page view, shared by every component (GitHub allows 60/hour per visitor IP).
let cache: Promise<Release[]> | null = null

function fetchReleases() {
  cache ??= fetch('https://api.github.com/repos/lshinkuro/baterai-safer/releases?per_page=30')
    .then((r) => (r.ok ? r.json() : []))
    .then((list: GHRelease[]) =>
      list
        .filter((r) => !r.draft && !r.prerelease)
        .map((r) => ({
          tag: r.tag_name,
          date: r.published_at,
          notes: r.body ?? '',
          url: r.html_url,
          dmg: r.assets.find((a) => a.name.endsWith('.dmg'))?.browser_download_url,
        })),
    )
    .catch(() => [])
  return cache
}

/** null while loading, [] if GitHub can't be reached. */
export function useReleases() {
  const [releases, setReleases] = useState<Release[] | null>(null)
  useEffect(() => {
    fetchReleases().then(setReleases)
  }, [])
  return releases
}

/** Newest release that actually has a DMG, so the button never names a version it can't deliver. */
export function useLatestVersion() {
  const r = useReleases()
  return r?.find((x) => x.dmg)?.tag.replace(/^v/, '') ?? VERSION
}
