import { useEffect, useState } from 'react'

/**
 * 報告模式面板：桌機從右側滑出，行動版從底部滑出。
 * 上方是全場配速表（不隨章節變動），下方備註跟著目前捲動到的章節走。
 */
export default function PresenterPanel({
  open,
  section,
  notes,
  runOfShow,
  activeId,
  onClose,
}) {
  const [showPlan, setShowPlan] = useState(true)
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <aside
      aria-hidden={!open}
      aria-label="講者備註"
      className={`fixed z-30 bg-ink text-mist shadow-2xl transition-transform duration-300 ease-out
        inset-x-0 bottom-0 max-h-[52vh] overflow-y-auto overscroll-contain rounded-t-2xl
        lg:inset-y-0 lg:left-auto lg:right-0 lg:max-h-none lg:w-[360px] lg:rounded-none lg:rounded-l-2xl
        ${open ? 'translate-y-0 lg:translate-x-0' : 'translate-y-full lg:translate-y-0 lg:translate-x-full'}`}
    >
      <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-white/10 bg-ink px-6 py-4 lg:pt-24">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            Presenter Notes
          </span>
          <p className="mt-0.5 text-sm font-bold">
            {section ? `${section.index} ${section.label}` : '—'}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/20 px-3 py-1 text-xs text-sage hover:bg-white/10"
        >
          關閉
        </button>
      </div>

      {runOfShow && (
        <div className="border-b border-white/10 bg-black/25 px-6 py-4">
          <button
            type="button"
            onClick={() => setShowPlan((v) => !v)}
            aria-expanded={showPlan}
            className="flex w-full items-center justify-between gap-2 text-left"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
              Run of Show ・ {runOfShow.total}
            </span>
            <span aria-hidden className="text-xs text-teal-muted">
              {showPlan ? '收合 ▲' : '展開 ▼'}
            </span>
          </button>

          {showPlan && (
            <div className="mt-4 space-y-5">
              <ol className="space-y-1">
                {runOfShow.cues.map((c) => {
                  const now = c.id && c.id === activeId
                  return (
                    <li
                      key={c.at}
                      className={`flex items-baseline gap-3 rounded px-2 py-1 text-xs ${
                        now ? 'bg-accent/20 text-mist' : 'text-sage'
                      }`}
                    >
                      <span className="shrink-0 font-bold tabular-nums text-teal">
                        {c.at}
                      </span>
                      <span className="flex-1">{c.label}</span>
                      <span className="shrink-0 tabular-nums text-teal-muted">
                        {c.mins}′
                      </span>
                    </li>
                  )
                })}
              </ol>

              <p className="rounded-lg border-l-2 border-accent bg-black/30 px-3 py-2 text-xs leading-relaxed text-mist">
                {runOfShow.warning}
              </p>

              <PlanList title="放慢的四個時刻" items={runOfShow.beats} />
              <PlanList
                title="互動點｜每 6–8 分鐘用一個"
                items={runOfShow.interactions}
              />
            </div>
          )}
        </div>
      )}

      <div className="px-6 py-5">
        <ul className="space-y-4">
          {(notes ?? []).map((note, i) => (
            <li key={note} className="flex gap-3 text-sm leading-relaxed">
              <span className="shrink-0 font-black tabular-nums text-teal">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sage">{note}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 border-t border-white/10 pt-4 text-xs leading-relaxed text-teal-muted">
          捲動頁面時，備註會自動跟著目前章節切換。按 Esc 可關閉。
        </p>
      </div>
    </aside>
  )
}

function PlanList({ title, items }) {
  return (
    <div>
      <span className="text-[11px] font-bold text-sage">{title}</span>
      <ul className="mt-2 space-y-1.5">
        {items.map((t) => (
          <li key={t} className="flex gap-2 text-xs leading-relaxed text-sage">
            <span aria-hidden className="text-teal-muted">
              ·
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}
