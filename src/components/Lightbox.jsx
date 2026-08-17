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

    // 鎖住背景捲動。這裡只改 overflow：先前試過 position: fixed 的做法，
    // 但在 StrictMode 的雙重掛載下會把捲動位置記成 0，關閉後畫面會跳回頂端。
    const body = document.body
    const prev = body.style.overflow
    body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      body.style.overflow = prev
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

      {/* 白底只加在圖片上，容器保持透明，
          短圖才不會在下方留一大片空白 */}
      <div className="flex min-h-0 flex-1 justify-center overflow-auto">
        <img
          src={src}
          alt={alt}
          onClick={(e) => e.stopPropagation()}
          className={`h-fit rounded-xl bg-white ${
            actualSize ? 'max-w-none' : 'w-full max-w-[1800px]'
          }`}
        />
      </div>

      <p className="mx-auto mt-2 shrink-0 text-xs text-teal-muted">
        點擊背景或按 Esc 關閉
      </p>
    </div>
  )
}
