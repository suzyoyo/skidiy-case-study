import { useCallback, useMemo, useState } from 'react'
import { deliverables, meta, resources, sections } from './data/content'
import StickyNav from './components/StickyNav'
import PresenterPanel from './components/PresenterPanel'
import Block from './components/blocks'
import {
  useActiveSection,
  useReveal,
  useScrollProgress,
} from './hooks/useScrollProgress'
import {
  PRESENTER_ENABLED,
  usePresenterNotes,
} from './hooks/usePresenterNotes'

export default function App() {
  const ids = useMemo(() => sections.map((s) => s.id), [])
  const progress = useScrollProgress()
  const activeId = useActiveSection(ids)
  const [presenterMode, setPresenterMode] = useState(false)
  const notes = usePresenterNotes()
  useReveal()

  const activeSection = sections.find((s) => s.id === activeId) ?? sections[0]
  const closePresenter = useCallback(() => setPresenterMode(false), [])

  return (
    <div
      className={`min-h-screen transition-[padding] duration-300 ${
        presenterMode ? 'lg:pr-[360px]' : ''
      }`}
    >
      <StickyNav
        sections={sections}
        active={activeId}
        progress={progress}
        presenterMode={presenterMode}
        showPresenterToggle={PRESENTER_ENABLED}
        onTogglePresenter={() => setPresenterMode((v) => !v)}
      />

      <main id="top">
        <Hero />
        <Deliverables />

        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-28 border-t border-sage/60 py-20 md:py-28"
          >
            <div className="section-shell">
              <div data-reveal className="reveal max-w-prose">
                <span className="eyebrow">
                  {section.index} — {section.label}
                </span>
                <h2 className="mt-3 text-3xl font-black leading-tight text-ink md:text-5xl">
                  {section.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-teal-muted md:text-lg">
                  {section.lede}
                </p>
              </div>

              <div className="mt-14 space-y-8">
                {section.blocks.map((block, i) => (
                  <div key={`${section.id}-${i}`} data-reveal className="reveal">
                    <Block block={block} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <Resources />

        <footer className="border-t border-sage/60 py-12">
          <div className="section-shell flex flex-wrap items-center justify-between gap-4 text-sm text-teal-muted">
            <span>{meta.author}</span>
            <a href="#top" className="hover:text-teal-deep">
              回到頂端 ↑
            </a>
          </div>
        </footer>
      </main>

      {PRESENTER_ENABLED && (
        <PresenterPanel
          open={presenterMode}
          section={activeSection}
          notes={notes?.[activeSection.id]}
          onClose={closePresenter}
        />
      )}
    </div>
  )
}

/**
 * 開頭的產出總覽。刻意只給清單與數量，不展開內容——
 * 讓聽眾先校準工作量，細節留給 03、04 兩章。
 */
function Deliverables() {
  return (
    <section className="border-b border-sage/60 bg-white/60 py-14">
      <div className="section-shell">
        <div data-reveal className="reveal flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <h2 className="text-xl font-black text-ink">{deliverables.label}</h2>
          <p className="text-sm text-teal-muted">{deliverables.note}</p>
        </div>

        <div data-reveal className="reveal mt-8 grid gap-8 md:grid-cols-3">
          {deliverables.groups.map((g) => (
            <div key={g.stage}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {g.stage}
              </span>
              <ul className="mt-4 space-y-4">
                {g.items.map((item) => (
                  <li key={item.name} className="border-l-2 border-sage pl-4">
                    <h3 className="font-bold text-teal-deep">{item.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-teal-muted">
                      {item.meta}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** 頁尾的 Figma 原始檔連結，讓想深看的人有路徑可以點。 */
function Resources() {
  return (
    <section className="border-t border-sage/60 bg-white/60 py-14">
      <div className="section-shell">
        <div data-reveal className="reveal flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <h2 className="text-xl font-black text-ink">{resources.label}</h2>
          <p className="text-sm text-teal-muted">{resources.note}</p>
        </div>

        <div data-reveal className="reveal mt-8 grid gap-8 md:grid-cols-3">
          {resources.groups.map((g) => (
            <div key={g.stage}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {g.stage}
              </span>
              <ul className="mt-4 space-y-2">
                {g.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-1.5 border-b border-sage py-1 font-bold text-teal-deep transition-colors hover:border-accent hover:text-accent"
                    >
                      {item.name}
                      <span
                        aria-hidden
                        className="text-teal-muted transition-colors group-hover:text-accent"
                      >
                        ↗
                      </span>
                      <span className="sr-only">（Figma，另開新視窗）</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-24 pt-36 text-mist md:pb-32 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-56 h-[620px] w-[620px] rounded-full bg-teal-deep/60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-40 top-24 h-20 w-20 rounded-full bg-accent"
      />
      <div className="section-shell relative">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-sage">
          {meta.project}
        </span>
        <div className="mt-6 border-l-4 border-accent pl-6">
          <h1 className="text-5xl font-black leading-[1.1] md:text-7xl">
            {meta.title}
          </h1>
          <p className="mt-4 text-xl font-bold md:text-2xl">{meta.subtitle}</p>
          <p className="mt-6 max-w-prose leading-relaxed text-sage">
            {meta.lede}
          </p>
        </div>

        <p className="mt-10 text-sm text-sage">{meta.tags.join('　・　')}</p>

        <div className="mt-10">
          <a
            href="#background"
            className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            開始閱讀 ↓
          </a>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-teal-muted/40 bg-teal-muted/40 sm:grid-cols-3 lg:grid-cols-5">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="flex h-full flex-col gap-1 bg-ink p-5 transition-colors hover:bg-teal-deep"
              >
                <span className="text-xs font-bold tabular-nums text-accent">
                  {s.index}
                </span>
                <span className="font-bold">{s.label}</span>
                <span className="text-xs leading-relaxed text-sage">
                  {s.eyebrow}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
