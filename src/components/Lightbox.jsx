import { useEffect, useState } from 'react'

/**
 * 點擊放大檢視。
 * 站上的圖多半在雙欄版面裡被縮到原始尺寸的三到五成，細節看不清楚；
 * 這裡預設先「符合寬度」讓人看全貌，需要時再切到「實際大小」逐處檢視。
 */
export default function Lightbox({ src, alt, caption, onClose }) {
  const [actualSize, setActualSize] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    // 開啟時鎖住背景捲動，避免放大檢視與頁面同時滾動
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={caption || alt}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col bg-ink/95 p-4 backdrop-blur-sm sm:p-6"
    >
      <div className="mx-auto flex w-full max-w-[1800px] shrink-0 flex-wrap items-center justify-between gap-3 pb-3">
        <span className="text-sm font-bold text-mist">{caption}</span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setActualSize((v) => !v)
            }}
            className="rounded-full border border-white/25 px-4 py-1.5 text-xs font-bold text-mist hover:bg-white/10"
          >
            {actualSize ? '符合寬度' : '實際大小 ⤢'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/25 px-4 py-1.5 text-xs font-bold text-mist hover:bg-white/10"
          >
            關閉 ✕
          </button>
        </div>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto w-full max-w-[1800px] flex-1 overflow-auto rounded-xl bg-white"
      >
        <img
          src={src}
          alt={alt}
          className={actualSize ? 'max-w-none' : 'w-full'}
        />
      </div>

      <p className="mx-auto mt-2 shrink-0 text-xs text-teal-muted">
        點擊背景或按 Esc 關閉
      </p>
    </div>
  )
}
