import { asset } from '../lib/asset'

export default function StickyNav({
  sections,
  active,
  progress,
  presenterMode,
  showPresenterToggle,
  onTogglePresenter,
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="border-b border-sage/60 bg-mist/85 backdrop-blur-md">
        <nav className="section-shell flex h-16 items-center justify-between gap-4">
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            <img
              src={asset("/img/logo-skidiy.png")}
              alt="SKIDIY"
              width={373}
              height={93}
              className="h-6 w-auto"
            />
            <span className="hidden text-sm text-teal-muted sm:inline">
              官網改版
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {sections.map((s) => {
              const isActive = active === s.id
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex items-baseline gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-teal-deep text-white'
                        : 'text-teal-muted hover:bg-sage/60 hover:text-teal-deep'
                    }`}
                  >
                    <span
                      className={`text-[11px] font-semibold tabular-nums ${
                        isActive ? 'text-sage' : 'text-teal'
                      }`}
                    >
                      {s.index}
                    </span>
                    {s.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {showPresenterToggle && (
            <button
              type="button"
              onClick={onTogglePresenter}
              aria-pressed={presenterMode}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                presenterMode
                  ? 'border-accent bg-accent text-white'
                  : 'border-teal-muted/50 text-teal-deep hover:border-teal hover:bg-white'
              }`}
            >
              {presenterMode ? '● 報告模式' : '切換為報告模式'}
            </button>
          )}
        </nav>

        {/* 行動版章節列 */}
        <ul className="flex gap-1 overflow-x-auto px-6 pb-2 md:hidden">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`block whitespace-nowrap rounded-full px-3 py-1 text-xs transition-colors ${
                  active === s.id
                    ? 'bg-teal-deep text-white'
                    : 'text-teal-muted hover:bg-sage/60'
                }`}
              >
                {s.index} {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* 滾動進度條 */}
      <div className="h-1 w-full bg-sage/50">
        <div
          className="h-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${Math.min(progress, 1) * 100}%` }}
          role="progressbar"
          aria-label="閱讀進度"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </header>
  )
}
