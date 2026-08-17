import { useEffect } from 'react'

/**
 * 點擊放大檢視。報告時入口設計的細節在縮圖上看不清楚，
 * 開啟後以接近原始尺寸呈現，超出畫面的部分可捲動。
 */
export default function Lightbox({ src, alt, caption, onClose }) {
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
      className="fixed inset-0 z-50 flex flex-col bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
    >
      <div className="mx-auto flex w-full max-w-[1600px] shrink-0 items-center justify-between gap-4 pb-4">
        <span className="text-sm font-bold text-mist">{caption}</span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/25 px-4 py-1.5 text-xs font-bold text-mist hover:bg-white/10"
        >
          關閉 ✕
        </button>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto w-full max-w-[1600px] flex-1 overflow-auto rounded-xl bg-white"
      >
        <img src={src} alt={alt} className="w-full" />
      </div>

      <p className="mx-auto mt-3 shrink-0 text-xs text-teal-muted">
        點擊背景或按 Esc 關閉
      </p>
    </div>
  )
}
