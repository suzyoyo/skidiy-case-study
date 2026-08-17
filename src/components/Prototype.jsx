import { useState } from 'react'

/**
 * Figma 互動原型嵌入。
 *
 * 刻意做成「先顯示封面、點了才載入 iframe」：
 * Figma 的播放器很重，直接掛 iframe 會拖慢整頁；
 * 而且報告當下若網路不穩，至少畫面上還有靜態封面可以講，
 * 旁邊也一定附上直接開 Figma 的備援連結。
 */
export default function Prototype({ block }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="rounded-3xl bg-ink p-6 text-mist sm:p-10">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
        {block.eyebrow}
      </span>
      <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
        {block.heading}
      </h3>
      <p className="mt-3 max-w-prose leading-relaxed text-sage">{block.lede}</p>

      {block.steps && (
        <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2">
          {block.steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-accent">
                  →
                </span>
              )}
              <span className="rounded-full bg-teal-deep/70 px-3 py-1.5 text-sm">
                {s}
              </span>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-teal-deep/40">
        {loaded ? (
          <iframe
            title={block.title}
            src={block.embed}
            allowFullScreen
            loading="lazy"
            className="h-[540px] w-full border-0 bg-white"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="flex h-[540px] w-full flex-col items-center justify-center gap-4 transition-colors hover:bg-teal-deep/60"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl text-white">
              ▶
            </span>
            <span className="font-bold">載入互動原型</span>
            <span className="max-w-xs text-center text-sm leading-relaxed text-sage">
              需連線至 Figma，載入約需數秒
            </span>
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-teal-muted">{block.note}</p>
        <a
          href={block.link}
          target="_blank"
          rel="noreferrer noopener"
          className="shrink-0 rounded-full border border-white/25 px-4 py-1.5 text-xs font-bold text-mist hover:bg-white/10"
        >
          在 Figma 開啟 ↗
        </a>
      </div>
    </div>
  )
}
