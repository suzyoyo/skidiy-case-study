import { useRef, useState } from 'react'

export default function RequirementTabs({ block }) {
  const { tabs, conclusion } = block
  const [activeKey, setActiveKey] = useState(tabs[0].key)
  const tabRefs = useRef({})
  const active = tabs.find((t) => t.key === activeKey) ?? tabs[0]

  // 左右方向鍵切換，符合 WAI-ARIA tabs 的鍵盤預期
  const onKeyDown = (e) => {
    const i = tabs.findIndex((t) => t.key === activeKey)
    let next = null
    if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length]
    if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length]
    if (!next) return
    e.preventDefault()
    setActiveKey(next.key)
    tabRefs.current[next.key]?.focus()
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="需求盤點"
        onKeyDown={onKeyDown}
        className="inline-flex rounded-full border border-sage bg-white/70 p-1"
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey
          return (
            <button
              key={tab.key}
              ref={(el) => (tabRefs.current[tab.key] = el)}
              role="tab"
              id={`tab-${tab.key}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.key}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveKey(tab.key)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                isActive
                  ? 'bg-teal-deep text-white'
                  : 'text-teal-muted hover:text-teal-deep'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active.key}`}
        aria-labelledby={`tab-${active.key}`}
        tabIndex={0}
        key={active.key}
        className="mt-6 animate-fade-up focus:outline-none"
      >
        <p className="mb-6 text-sm text-teal-muted">{active.caption}</p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {active.items.map((item) => (
            <li key={item.title} className="card flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-bold tabular-nums text-accent">
                  {item.no}
                </span>
                {item.tag && (
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-teal">
                    {item.tag}
                  </span>
                )}
              </div>
              <h4 className="font-bold leading-snug text-ink">{item.title}</h4>
              <p className="whitespace-pre-line text-sm leading-relaxed text-teal-muted">
                {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {conclusion && (
        <p className="mt-8 border-l-4 border-accent pl-4 font-bold text-ink">
          {conclusion}
        </p>
      )}
    </div>
  )
}
