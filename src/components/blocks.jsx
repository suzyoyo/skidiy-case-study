import RequirementTabs from './RequirementTabs'
import { asset } from '../lib/asset'

// 每個 block 都是一個獨立的敘事單元；深色 block 用 Slab 包起來做視覺分段。
function Slab({ tone = 'light', children }) {
  const dark = tone === 'dark'
  return (
    <div
      className={`rounded-3xl p-6 sm:p-10 ${
        dark ? 'bg-ink text-mist' : 'bg-white/70 border border-sage/70'
      }`}
    >
      {children}
    </div>
  )
}

function Eyebrow({ children, dark }) {
  return (
    <span
      className={`text-xs font-bold uppercase tracking-[0.2em] ${
        dark ? 'text-accent' : 'text-teal'
      }`}
    >
      {children}
    </span>
  )
}

function Conclusion({ children, dark }) {
  return (
    <p
      className={`mt-8 border-l-4 border-accent pl-4 font-bold leading-relaxed ${
        dark ? 'text-mist' : 'text-ink'
      }`}
    >
      {children}
    </p>
  )
}

/* ── 01 背景：四個互相牽動的決定 ───────────────────────── */
function Decisions({ block }) {
  return (
    <Slab>
      <h3 className="font-bold text-ink">{block.heading}</h3>
      <ol className="mt-6 grid gap-4 sm:grid-cols-2">
        {block.items.map((item) => (
          <li
            key={item.no}
            className="flex items-start gap-4 rounded-2xl bg-mist p-5"
          >
            <span className="text-sm font-black tabular-nums text-accent">
              {item.no}
            </span>
            <span className="font-bold leading-snug text-teal-deep">
              {item.q}
            </span>
          </li>
        ))}
      </ol>
      <Conclusion>{block.footnote}</Conclusion>
    </Slab>
  )
}

/* ── 01 背景：三個問題點 ────────────────────────────────── */
function ProblemPath({ block }) {
  return (
    <Slab tone="dark">
      <Eyebrow dark>{block.eyebrow}</Eyebrow>
      <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
        {block.heading}
      </h3>
      <ol className="mt-10 grid gap-6 md:grid-cols-3">
        {block.steps.map((s, i) => (
          <li key={s.title} className="relative pt-6">
            <span
              aria-hidden
              className={`absolute left-0 top-0 h-3 w-3 rounded-full ${
                i === 1 ? 'bg-accent' : 'bg-accent/70'
              }`}
            />
            <span
              aria-hidden
              className="absolute left-3 top-1.5 hidden h-px w-full bg-teal-muted/50 md:block"
            />
            <h4 className="font-bold">{s.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-sage">{s.desc}</p>
          </li>
        ))}
      </ol>
      <Conclusion dark>{block.conclusion}</Conclusion>
    </Slab>
  )
}

/* ── 通用：圖片區塊 ─────────────────────────────────────── */
function Figure({ block }) {
  const dark = block.tone === 'dark'
  return (
    <Slab tone={block.tone}>
      {block.eyebrow && <Eyebrow dark={dark}>{block.eyebrow}</Eyebrow>}
      <h3
        className={`mt-3 text-2xl font-black leading-tight md:text-3xl ${
          dark ? 'text-mist' : 'text-ink'
        }`}
      >
        {block.caption}
      </h3>
      {block.lede && (
        <p
          className={`mt-3 max-w-prose leading-relaxed ${
            dark ? 'text-sage' : 'text-teal-muted'
          }`}
        >
          {block.lede}
        </p>
      )}
      {block.scrollHint && (
        <p
          className={`mt-4 text-xs ${dark ? 'text-accent' : 'text-teal'}`}
        >
          ↕ {block.scrollHint}
        </p>
      )}
      {block.scroll ? (
        <div
          style={{ height: block.scroll }}
          className="mt-6 overflow-y-auto rounded-2xl border border-sage bg-white"
        >
          <img
            src={asset(block.src)}
            alt={block.alt}
            loading="lazy"
            width={block.width}
            height={block.height}
            className="w-full"
          />
        </div>
      ) : (
        <img
          src={asset(block.src)}
          alt={block.alt}
          loading="lazy"
          width={block.width}
          height={block.height}
          className="mt-8 w-full rounded-2xl"
        />
      )}
      {block.footnote && (
        <p
          className={`mt-5 text-sm leading-relaxed ${
            dark ? 'text-sage' : 'text-teal-muted'
          }`}
        >
          {block.footnote}
        </p>
      )}
    </Slab>
  )
}

/* ── 01 背景：原站證據截圖（每張各自標示頁面） ─────────── */
function Evidence({ block }) {
  return (
    <Slab tone="dark">
      <h3 className="text-2xl font-black leading-tight md:text-3xl">
        {block.caption}
      </h3>
      <p className="mt-3 max-w-prose leading-relaxed text-sage">{block.lede}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {block.items.map((item) => (
          <figure key={item.label}>
            <figcaption className="mb-3 flex items-center gap-3">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
                {item.label}
              </span>
            </figcaption>
            <img
              src={asset(item.src)}
              alt={item.alt}
              loading="lazy"
              className="w-full rounded-xl bg-white"
            />
            <p className="mt-3 text-sm leading-relaxed text-sage">
              {item.note}
            </p>
          </figure>
        ))}
      </div>
    </Slab>
  )
}

/* ── 03 研究：研究收斂三來源 ────────────────────────────── */
function Methods({ block }) {
  return (
    <Slab>
      <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <ul className="space-y-5">
          {block.items.map((m) => (
            <li key={m.name} className="border-l-2 border-sage pl-4">
              <h4 className="font-bold text-teal">{m.name}</h4>
              <p className="mt-1 text-sm leading-relaxed text-teal-muted">
                {m.desc}
              </p>
            </li>
          ))}
        </ul>
        <div className="mx-auto flex h-44 w-44 flex-col items-center justify-center rounded-full bg-teal-deep text-center text-mist md:h-52 md:w-52">
          <span className="text-xl font-black">{block.center.title}</span>
          <span className="mt-1 text-xs text-sage">{block.center.sub}</span>
        </div>
      </div>
      {block.severity && (
        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-sage bg-white/60 p-4">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-teal">
            {block.severity.label}
          </span>
          {block.severity.scale.map((s, i) => (
            <span
              key={s}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                i >= 3 ? 'bg-accent/15 text-accent' : 'bg-mist text-teal-muted'
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      )}
      <p className="mt-4 rounded-xl bg-mist p-4 text-sm leading-relaxed text-teal-deep">
        {block.limit}
      </p>
    </Slab>
  )
}

/* ── 03 研究：易用性檢視結果（含 S4 阻斷與 n=1 逐段觀察） ─ */
function Usability({ block }) {
  return (
    <Slab tone="dark">
      <Eyebrow dark>{block.eyebrow}</Eyebrow>
      <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
        {block.heading}
      </h3>
      <p className="mt-3 max-w-prose leading-relaxed text-sage">{block.lede}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {block.priorities.map((p) => (
          <li
            key={p}
            className="rounded-full bg-teal-deep px-3 py-1.5 text-sm text-sage"
          >
            {p}
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border-l-4 border-accent bg-black/25 p-6">
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
          {block.headline.tag}
        </span>
        <h4 className="mt-4 text-lg font-bold">{block.headline.title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-sage">
          {block.headline.desc}
        </p>
      </div>

      <p className="mt-10 text-xs font-bold uppercase tracking-[0.15em] text-sage">
        {block.timelineLabel}
      </p>
      <ol className="mt-4 space-y-4">
        {block.timeline.map((t) => (
          <li
            key={t.time}
            className="grid gap-3 rounded-2xl bg-teal-deep/60 p-5 sm:grid-cols-[110px_1fr]"
          >
            <span className="text-sm font-bold tabular-nums text-accent">
              {t.time}
            </span>
            <div>
              <h4 className="font-bold">{t.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-sage">{t.desc}</p>
              <p className="mt-3 border-l-2 border-accent pl-3 text-sm italic text-mist">
                「{t.quote}」
              </p>
            </div>
          </li>
        ))}
      </ol>

      <Conclusion dark>{block.conclusion}</Conclusion>
    </Slab>
  )
}

/* ── 03 研究：研究訊號 ──────────────────────────────────── */
function Signals({ block }) {
  return (
    <Slab tone="dark">
      <Eyebrow dark>{block.eyebrow}</Eyebrow>
      <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
        {block.heading}
      </h3>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-teal-deep/70 p-6">
          <span className="text-xs font-bold text-sage">
            {block.quote.label}
          </span>
          <p className="mt-4 text-xl font-bold leading-relaxed md:text-2xl">
            {block.quote.text}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-sage">
            {block.quote.sub}
          </p>
        </div>

        <div>
          <span className="text-xs font-bold text-sage">{block.listLabel}</span>
          <ul className="mt-4 space-y-5">
            {block.items.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span
                  aria-hidden
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent"
                />
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-sage">
                    {item.desc}
                  </p>
                  {item.implies && (
                    <p className="mt-2 text-sm leading-relaxed text-teal-muted">
                      <span className="font-bold text-accent">設計含義：</span>
                      {item.implies}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {block.artifact && <Artifact data={block.artifact} />}

      <Conclusion dark>{block.conclusion}</Conclusion>
    </Slab>
  )
}

/* 一手證據：客服信件節錄。刻意與彙整過的客服統計分開呈現。 */
function Artifact({ data }) {
  return (
    <div className="mt-10 rounded-2xl border border-white/15 bg-black/25 p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
          {data.label}
        </span>
        <span className="text-xs text-teal-muted">{data.meta}</span>
      </div>

      <div className="mt-5 space-y-3">
        {data.excerpts.map((q) => (
          <blockquote
            key={q}
            className="border-l-2 border-accent pl-4 text-sm leading-relaxed text-mist"
          >
            「{q}」
          </blockquote>
        ))}
      </div>

      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {data.reading.map((r) => (
          <li key={r.title} className="rounded-xl bg-teal-deep/60 p-4">
            <h5 className="text-sm font-bold">{r.title}</h5>
            <p className="mt-1.5 text-sm leading-relaxed text-sage">{r.desc}</p>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs leading-relaxed text-teal-muted">
        {data.caveat}
      </p>
    </div>
  )
}

/* ── 03 研究：競品分析 ──────────────────────────────────── */
function Competitors({ block }) {
  return (
    <Slab>
      <Eyebrow>{block.eyebrow}</Eyebrow>
      <h3 className="mt-3 text-2xl font-black leading-tight text-ink md:text-3xl">
        {block.heading}
      </h3>
      <p className="mt-3 max-w-prose leading-relaxed text-teal-muted">
        {block.lede}
      </p>
      {block.scenario && (
        <div className="mt-5 space-y-1.5 rounded-xl bg-mist p-4">
          {[].concat(block.scenario).map((line) => (
            <p key={line} className="text-sm leading-relaxed text-teal-deep">
              {line}
            </p>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {block.items.map((c) => (
          <div key={c.name} className="rounded-2xl bg-mist p-6">
            <h4 className="text-lg font-black text-ink">{c.name}</h4>
            <p className="mt-1 text-sm font-bold text-teal">{c.meta}</p>
            <p className="mt-4 leading-relaxed text-teal-deep">{c.summary}</p>
            <dl className="mt-4 space-y-2 text-sm leading-relaxed">
              <div>
                <dt className="inline font-bold text-teal-deep">優勢：</dt>
                <dd className="inline text-teal-muted">{c.pros}</dd>
              </div>
              <div>
                <dt className="inline font-bold text-accent">主要風險：</dt>
                <dd className="inline text-teal-muted">{c.risk}</dd>
              </div>
            </dl>
            <a
              href={`https://${c.url}`}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-teal underline decoration-sage underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {c.url}
              <span aria-hidden>↗</span>
              <span className="sr-only">（另開新視窗）</span>
            </a>
          </div>
        ))}
      </div>

      {block.walkthrough && <Walkthrough data={block.walkthrough} />}

      <div className="mt-10 flex flex-wrap items-center gap-5 rounded-2xl bg-accent/10 p-6">
        <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-accent text-center text-sm font-black leading-tight text-white">
          {block.opportunity.label}
        </span>
        <p className="font-bold leading-relaxed text-ink">
          {block.opportunity.text}
        </p>
      </div>

      {block.hmw && (
        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal">
            {block.hmw.label}
          </p>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {block.hmw.items.map((h, i) => (
              <li key={h.title} className="rounded-2xl bg-mist p-5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-black tabular-nums text-teal-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      h.rank === 'HIGH'
                        ? 'bg-accent text-white'
                        : 'bg-sage text-teal-deep'
                    }`}
                  >
                    {h.rank}
                  </span>
                </div>
                <h4 className="mt-2 font-bold text-ink">{h.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-teal-muted">
                  HMW：{h.q}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </Slab>
  )
}

/* 逐段走查表：橫向可捲，避免窄螢幕壓垮版面 */
const MARK = {
  ok: { glyph: '✓', cls: 'bg-teal text-white', label: '對新手友善' },
  warn: { glyph: '!', cls: 'bg-accent/20 text-accent', label: '形成阻力' },
  bad: { glyph: '✕', cls: 'bg-accent text-white', label: '缺失或中斷' },
  none: { glyph: '–', cls: 'bg-sage text-teal-muted', label: '未觀察' },
}

function Walkthrough({ data }) {
  return (
    <div className="mt-10">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal">
        {data.label}
      </p>
      <ul className="mt-3 flex flex-wrap gap-4 text-xs text-teal-muted">
        {data.legend.map((l) => (
          <li key={l.mark} className="flex items-center gap-1.5">
            <Mark mark={l.mark} />
            {l.text}
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-6">
        {data.rows.map((row) => (
          <div key={row.name} className="rounded-2xl bg-mist p-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h4 className="font-black text-ink">{row.name}</h4>
              <span
                className={`text-sm font-bold ${
                  row.tone === 'bad' ? 'text-accent' : 'text-teal'
                }`}
              >
                {row.verdict}
              </span>
            </div>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.stages.map((stage, i) => (
                <li key={stage} className="flex gap-3">
                  <Mark mark={row.marks[i]} />
                  <div>
                    <h5 className="text-sm font-bold text-teal-deep">
                      {stage}
                    </h5>
                    <p className="mt-0.5 text-sm leading-relaxed text-teal-muted">
                      {row.notes[i]}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  )
}

function Mark({ mark }) {
  const m = MARK[mark] ?? MARK.none
  return (
    <span
      title={m.label}
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${m.cls}`}
    >
      {m.glyph}
    </span>
  )
}

/* ── 03 研究：Persona ───────────────────────────────────── */
function Persona({ block }) {
  return (
    <Slab>
      <Eyebrow>{block.eyebrow}</Eyebrow>
      <h3 className="mt-3 text-3xl font-black text-ink md:text-4xl">
        {block.heading}
      </h3>
      {block.sub && (
        <p className="mt-2 max-w-prose leading-relaxed text-teal-muted">
          {block.sub}
        </p>
      )}

      <blockquote className="mt-6 border-l-4 border-accent pl-5">
        <p className="text-xl font-bold leading-relaxed text-teal-deep md:text-2xl">
          {block.quote}
        </p>
        {block.quoteSource && (
          <cite className="mt-2 block text-xs not-italic text-teal-muted">
            — {block.quoteSource}
          </cite>
        )}
      </blockquote>

      <p className="mt-5 text-sm text-teal-muted">{block.meta}</p>

      {block.jtbd && (
        <div className="mt-8 rounded-2xl bg-teal-deep p-6 text-mist">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
            核心任務 JTBD
          </span>
          <p className="mt-3 leading-relaxed">{block.jtbd}</p>
          {block.mental && (
            <p className="mt-4 text-sm text-sage">{block.mental}</p>
          )}
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[block.blockers, block.success].filter(Boolean).map((g, i) => (
          <div key={g.label} className="rounded-2xl bg-mist p-6">
            <span
              className={`text-sm font-bold ${
                i === 0 ? 'text-accent' : 'text-teal'
              }`}
            >
              {g.label}
            </span>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-teal-deep">
              {g.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="text-teal-muted">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-3">
        {block.needs.map((n) => (
          <li key={n.title}>
            <h4 className="font-black text-accent">{n.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-teal-deep">
              {n.desc}
            </p>
          </li>
        ))}
      </ul>

      {block.segments && (
        <div className="mt-12 border-t border-sage pt-8">
          <h4 className="font-bold text-ink">{block.segments.label}</h4>
          <p className="mt-2 text-sm leading-relaxed text-teal-muted">
            {block.segments.note}
          </p>
          {block.segments.converged && (
            <p className="mt-4 rounded-xl border-l-4 border-accent bg-mist p-4 text-sm font-bold leading-relaxed text-ink">
              {block.segments.converged}
            </p>
          )}
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {block.segments.items.map((s) => (
              <li key={s.tag} className="rounded-2xl border border-sage p-5">
                <h5 className="font-bold text-teal-deep">{s.tag}</h5>
                <p className="mt-1 text-xs text-accent">目的：{s.goal}</p>
                <p className="mt-3 text-sm leading-relaxed text-teal-muted">
                  推薦邏輯：{s.logic}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Slab>
  )
}

/* ── 04 設計：設計原則 ──────────────────────────────────── */
function Principles({ block }) {
  return (
    <Slab tone="dark">
      <Eyebrow dark>{block.eyebrow}</Eyebrow>
      <ol className="mt-8 grid gap-6 md:grid-cols-3">
        {block.items.map((p) => (
          <li key={p.no} className="rounded-2xl bg-teal-deep/70 p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-sm font-bold">
              {p.no}
            </span>
            <h4 className="mt-4 text-lg font-bold">{p.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-sage">{p.desc}</p>
          </li>
        ))}
      </ol>
      <Conclusion dark>{block.conclusion}</Conclusion>
    </Slab>
  )
}

/* ── 04 設計：MVP 範圍 ──────────────────────────────────── */
function Scope({ block }) {
  return (
    <Slab>
      <Eyebrow>{block.eyebrow}</Eyebrow>
      <h3 className="mt-3 text-2xl font-black leading-tight text-ink md:text-3xl">
        {block.heading}
      </h3>
      <p className="mt-3 max-w-prose leading-relaxed text-teal-muted">
        {block.lede}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr_auto_1fr] md:items-center">
        <div className="rounded-2xl bg-white p-6">
          <span className="text-sm font-bold text-teal">
            {block.inScope.label}
          </span>
          <ul className="mt-4 space-y-3">
            {block.inScope.items.map((i) => (
              <li key={i} className="flex gap-3 font-bold text-ink">
                <span aria-hidden className="text-accent">
                  ●
                </span>
                {i}
              </li>
            ))}
          </ul>
        </div>
        <span aria-hidden className="text-center text-2xl text-accent">
          →
        </span>
        <div className="rounded-2xl bg-teal-deep p-6 text-mist">
          <span className="text-sm font-bold text-sage">
            {block.outScope.label}
          </span>
          <ul className="mt-4 space-y-2">
            {block.outScope.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </div>

      {block.principles && (
        <div className="mt-8">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-teal">
            {block.principles.label}
          </span>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {block.principles.items.map((p) => (
              <li
                key={p}
                className="rounded-xl bg-mist px-4 py-3 text-sm leading-relaxed text-teal-deep"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Conclusion>{block.conclusion}</Conclusion>
    </Slab>
  )
}

/* ── 04 設計：新核心流程 ────────────────────────────────── */
function Flow({ block }) {
  return (
    <Slab tone="dark">
      <Eyebrow dark>{block.eyebrow}</Eyebrow>
      <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
        {block.heading}
      </h3>
      <ol className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {block.steps.map((s, i) => (
          <li key={s.no}>
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                i % 2 ? 'bg-accent text-white' : 'bg-teal text-white'
              }`}
            >
              {s.no}
            </span>
            <h4 className="mt-4 font-bold">{s.title}</h4>
            <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-sage">
              {s.desc}
            </p>
          </li>
        ))}
      </ol>
      <Conclusion dark>{block.conclusion}</Conclusion>
    </Slab>
  )
}

/* ── 04 設計：三入口 → Handoff Drawer → 訂課站 ─────────── */
function SystemFlow({ block }) {
  const [entries, drawer, booking] = block.lanes

  return (
    <Slab tone="dark">
      <Eyebrow dark>{block.eyebrow}</Eyebrow>
      <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
        {block.heading}
      </h3>
      <p className="mt-3 max-w-prose leading-relaxed text-sage">{block.lede}</p>

      <div className="mt-10 space-y-4">
        <Lane name={entries.name} role={entries.role}>
          <ul className="space-y-3">
            {entries.entries.map((e) => (
              <li key={e.label} className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-teal px-3 py-1 text-xs font-bold text-white">
                  {e.label}
                </span>
                {e.steps.map((s, i) => (
                  <span key={s} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden className="text-teal-muted">
                        →
                      </span>
                    )}
                    <span className="rounded-lg bg-teal-deep/70 px-3 py-1.5 text-sm">
                      {s}
                    </span>
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </Lane>

        <Arrow label="三個入口匯流" />

        <Lane name={drawer.name} role={drawer.role} accent>
          <p className="rounded-lg bg-black/30 px-3 py-2 text-sm">
            {drawer.decision.merge}
          </p>
          <p className="mt-4 text-sm font-bold text-accent">
            {drawer.decision.question}
          </p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <p className="rounded-lg bg-black/30 p-3 text-sm">
              <span className="font-bold text-accent">有　</span>
              {drawer.decision.yes}
            </p>
            <p className="rounded-lg bg-black/30 p-3 text-sm">
              <span className="font-bold text-teal">沒有　</span>
              {drawer.decision.no}
            </p>
          </div>
          <ul className="mt-3 flex flex-wrap items-center gap-2">
            {drawer.decision.then.map((t, i) => (
              <li key={t} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden className="text-teal-muted">
                    →
                  </span>
                )}
                <span className="rounded-lg bg-teal-deep/70 px-3 py-1.5 text-sm">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </Lane>

        <Arrow label="標準化 schema ＋ handoff ID" />

        <Lane name={booking.name} role={booking.role}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-teal-deep/70 px-3 py-1.5 text-sm">
              {booking.branch.first}
            </span>
            <span aria-hidden className="text-teal-muted">
              →
            </span>
            <span className="text-sm font-bold text-accent">
              {booking.branch.question}
            </span>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-black/30 p-3">
              <span className="text-xs font-bold text-teal">有</span>
              <p className="mt-1 text-sm">{booking.branch.yes.join(' → ')}</p>
            </div>
            <div className="rounded-lg bg-black/30 p-3">
              <span className="text-xs font-bold text-accent">沒有</span>
              <p className="mt-1 text-sm">{booking.branch.no.join(' → ')}</p>
            </div>
          </div>
        </Lane>
      </div>

      <Conclusion dark>{block.conclusion}</Conclusion>
    </Slab>
  )
}

function Lane({ name, role, accent, children }) {
  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 ${
        accent
          ? 'border-l-4 border-accent bg-teal-deep/80'
          : 'bg-teal-deep/50'
      }`}
    >
      <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="font-black">{name}</h4>
        <span className="text-xs text-sage">{role}</span>
      </div>
      {children}
    </div>
  )
}

function Arrow({ label }) {
  return (
    <div className="flex items-center gap-3 pl-6">
      <span aria-hidden className="text-xl text-accent">
        ↓
      </span>
      <span className="text-xs text-teal-muted">{label}</span>
    </div>
  )
}

/* ── 04 設計：首頁 V1 → V2 ─────────────────────────────── */
function Compare({ block }) {
  const Panel = ({ data, accent }) => (
    <div>
      <div
        className={`border-l-4 pl-4 ${accent ? 'border-accent' : 'border-teal'}`}
      >
        <span
          className={`text-sm font-black ${
            accent ? 'text-accent' : 'text-teal'
          }`}
        >
          {data.tag}｜{data.label}
        </span>
        <ul className="mt-2 space-y-1 font-bold text-ink">
          {data.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
      <div className="mt-5 h-[460px] overflow-y-auto rounded-2xl border border-sage bg-white">
        <img
          src={asset(data.src)}
          alt={data.alt}
          loading="lazy"
          width={data.width}
          height={data.height}
          className="w-full"
        />
      </div>
      {data.note && (
        <p className="mt-3 text-sm leading-relaxed text-teal-muted">
          {data.note}
        </p>
      )}
    </div>
  )

  return (
    <Slab>
      <Eyebrow>{block.eyebrow}</Eyebrow>
      <h3 className="mt-3 text-2xl font-black leading-tight text-ink md:text-3xl">
        {block.heading}
      </h3>
      <p className="mt-3 max-w-prose leading-relaxed text-teal-muted">
        {block.lede}
      </p>
      {block.scrollHint && (
        <p className="mt-4 text-xs text-teal">↕ {block.scrollHint}</p>
      )}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <Panel data={block.before} accent />
        <Panel data={block.after} />
      </div>
      <Conclusion>{block.conclusion}</Conclusion>
    </Slab>
  )
}

/* ── 04 設計：比較功能（購物車式浮動列） ────────────────── */
function CompareFeature({ block }) {
  return (
    <Slab tone="dark">
      <Eyebrow dark>{block.eyebrow}</Eyebrow>
      <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
        {block.heading}
      </h3>
      <p className="mt-3 max-w-prose leading-relaxed text-sage">{block.lede}</p>

      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {block.steps.map((s) => (
          <li key={s.no} className="rounded-2xl bg-teal-deep/60 p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              {s.no}
            </span>
            <h4 className="mt-4 font-bold">{s.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-sage">{s.desc}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 space-y-8">
        {block.figures.map((f) => (
          <figure key={f.label}>
            <figcaption className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
              {f.label}
            </figcaption>
            {f.scroll ? (
              <div
                style={{ height: f.scroll }}
                className="overflow-y-auto rounded-xl bg-white"
              >
                <img
                  src={asset(f.src)}
                  alt={f.alt}
                  loading="lazy"
                  width={f.width}
                  height={f.height}
                  className="w-full"
                />
              </div>
            ) : (
              <img
                src={asset(f.src)}
                alt={f.alt}
                loading="lazy"
                width={f.width}
                height={f.height}
                className="w-full rounded-xl bg-white"
              />
            )}
            {f.note && (
              <p className="mt-3 text-sm leading-relaxed text-sage">{f.note}</p>
            )}
          </figure>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border-l-4 border-accent bg-black/25 p-6">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
          {block.why.label}
        </span>
        <ul className="mt-3 space-y-2">
          {block.why.items.map((i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-sage">
              <span aria-hidden className="text-accent">
                —
              </span>
              {i}
            </li>
          ))}
        </ul>
      </div>
    </Slab>
  )
}

/* ── 04 設計：只到 wireframe 的頁面 ─────────────────────── */
function Wireframes({ block }) {
  return (
    <Slab>
      <Eyebrow>{block.eyebrow}</Eyebrow>
      <h3 className="mt-3 text-2xl font-black leading-tight text-ink md:text-3xl">
        {block.heading}
      </h3>
      <p className="mt-3 max-w-prose leading-relaxed text-teal-muted">
        {block.lede}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {block.items.map((item) => (
          <figure key={item.label}>
            <figcaption className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-teal-deep px-3 py-1 text-xs font-bold text-white">
                {item.label}
              </span>
              <span className="text-xs font-bold text-accent">
                {item.answers}
              </span>
            </figcaption>

            {/* wireframe 很長，固定高度並可獨立捲動；
                高度寫死而非 max-h，圖片還沒載入時才不會塌陷造成版面跳動 */}
            <div className="mt-4 h-[420px] overflow-y-auto rounded-xl border border-sage bg-white">
              <img
                src={asset(item.src)}
                alt={item.alt}
                loading="lazy"
                width={item.width}
                height={item.height}
                className="w-full"
              />
            </div>

            <ul className="mt-4 space-y-2">
              {item.points.map((p) => (
                <li
                  key={p}
                  className="flex gap-2 text-sm leading-relaxed text-teal-deep"
                >
                  <span aria-hidden className="text-accent">
                    —
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </figure>
        ))}
      </div>
    </Slab>
  )
}

/* ── 04 設計：驗證計畫 ──────────────────────────────────── */
function Validate({ block }) {
  return (
    <Slab>
      <Eyebrow>{block.eyebrow}</Eyebrow>
      <h3 className="mt-3 text-2xl font-black leading-tight text-ink md:text-3xl">
        {block.heading}
      </h3>
      <p className="mt-3 max-w-prose leading-relaxed text-teal-muted">
        {block.lede}
      </p>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {block.items.map((i) => (
          <li key={i.q} className="flex gap-3 rounded-2xl bg-mist p-5">
            <span aria-hidden className="mt-1.5 text-accent">
              ●
            </span>
            <div>
              <h4 className="font-bold text-teal">{i.q}</h4>
              <p className="mt-1 text-sm leading-relaxed text-teal-deep">
                {i.a}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <Conclusion>{block.metrics}</Conclusion>

      {block.funnel && (
        <div className="mt-10">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-teal">
            {block.funnel.label}
          </span>
          <ol className="mt-4 space-y-2">
            {block.funnel.items.map((f, i) => (
              <li
                key={f.stage}
                className="grid gap-1 rounded-xl bg-white/70 px-4 py-3 sm:grid-cols-[160px_1fr] sm:gap-4"
              >
                <span className="flex items-baseline gap-2 font-bold text-teal-deep">
                  <span className="text-xs tabular-nums text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {f.stage}
                </span>
                <span className="text-sm leading-relaxed text-teal-muted">
                  {f.desc}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

    </Slab>
  )
}

/* ── 05 未來展望：三階段規劃 ────────────────────────────── */
function Roadmap({ block }) {
  return (
    <Slab>
      <Eyebrow>{block.eyebrow}</Eyebrow>
      {block.heading && (
        <h3 className="mt-3 text-2xl font-black leading-tight text-ink md:text-3xl">
          {block.heading}
        </h3>
      )}

      <ol className="mt-8 space-y-5">
        {block.phases.map((p) => (
          <li
            key={p.no}
            className="grid gap-5 rounded-2xl bg-mist p-6 md:grid-cols-[auto_1fr]"
          >
            <div className="md:w-32">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-black text-white">
                {p.no}
              </span>
              <span className="mt-3 block text-xs font-bold text-teal">
                {p.when}
              </span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-ink">{p.title}</h4>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-teal-muted">
                {p.desc}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {p.items.map((i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm leading-relaxed text-teal-deep"
                  >
                    <span aria-hidden className="text-accent">
                      —
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-l-2 border-teal pl-3 text-sm font-bold text-teal-deep">
                {p.done}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <Conclusion>{block.conclusion}</Conclusion>
    </Slab>
  )
}

/* ── 05 未來展望：結論 ──────────────────────────────────── */
function ConclusionBlock({ block }) {
  return (
    <Slab tone="dark">
      <Eyebrow dark>{block.eyebrow}</Eyebrow>
      <h3 className="mt-3 whitespace-pre-line text-3xl font-black leading-tight md:text-4xl">
        {block.heading}
      </h3>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="border-l-4 border-accent pl-5">
          <span className="text-sm font-bold text-accent">
            {block.done.label}
          </span>
          <ul className="mt-3 space-y-2 font-bold">
            {block.done.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <div className="pl-5">
          <span className="text-sm font-bold text-sage">
            {block.next.label}
          </span>
          <ul className="mt-3 space-y-2 text-sage">
            {block.next.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </div>
      {block.conclusion && <Conclusion dark>{block.conclusion}</Conclusion>}
    </Slab>
  )
}

/* ── 04 設計：AI 協作 ───────────────────────────────────── */
function AiBlock({ block }) {
  return (
    <Slab tone="dark">
      <Eyebrow dark>{block.eyebrow}</Eyebrow>
      <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
        {block.heading}
      </h3>
      <p className="mt-3 max-w-prose leading-relaxed text-sage">{block.lede}</p>
      <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {block.steps.map((s) => {
          // 三種角色各給一組配色，讓「誰做的」在版面上一眼可辨
          const role = s.who === 'AI' ? 'ai' : s.who === '我' ? 'me' : 'both'
          const dot = { ai: 'bg-accent', me: 'bg-teal', both: 'bg-teal-muted' }[
            role
          ]
          const chip = {
            ai: 'bg-accent/20 text-accent',
            me: 'bg-white/10 text-sage',
            both: 'bg-white/10 text-mist',
          }[role]
          return (
            <li key={s.no}>
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${dot}`}
                >
                  {s.no}
                </span>
                {s.who && (
                  <span
                    className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${chip}`}
                  >
                    {s.who}
                  </span>
                )}
              </div>
              <h4 className="mt-4 font-bold">{s.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-sage">{s.desc}</p>
            </li>
          )
        })}
      </ol>
      <dl className="mt-10 space-y-3 rounded-2xl bg-black/25 p-6 text-sm">
        {block.scope.map((s) => (
          <div key={s.label} className="flex flex-wrap gap-x-4 gap-y-1">
            <dt className="font-bold text-accent">{s.label}</dt>
            <dd className="text-sage">{s.text}</dd>
          </div>
        ))}
      </dl>
    </Slab>
  )
}

const REGISTRY = {
  decisions: Decisions,
  'problem-path': ProblemPath,
  evidence: Evidence,
  figure: Figure,
  tabs: RequirementTabs,
  methods: Methods,
  usability: Usability,
  signals: Signals,
  competitors: Competitors,
  persona: Persona,
  principles: Principles,
  scope: Scope,
  flow: Flow,
  systemflow: SystemFlow,
  compare: Compare,
  compareFeature: CompareFeature,
  wireframes: Wireframes,
  validate: Validate,
  roadmap: Roadmap,
  conclusion: ConclusionBlock,
  ai: AiBlock,
}

export default function Block({ block }) {
  const Component = REGISTRY[block.type]
  if (!Component) return null
  return <Component block={block} />
}
