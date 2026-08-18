import { useState } from 'react'
import Lightbox from './Lightbox'
import { asset } from '../lib/asset'

/**
 * 站上所有內容圖片的統一入口。
 *
 * scroll 有值時，圖片放在固定高度的捲動框裡（長頁面用），
 * 放大鈕獨立浮在右上角，才不會跟捲動手勢打架；
 * 沒有 scroll 時整張圖就是按鈕，點哪裡都能放大。
 */
export default function ZoomableImage({
  src,
  alt,
  width,
  height,
  caption,
  scroll,
  className = '',
  frame = 'border border-sage bg-white',
  overlay,
}) {
  const [open, setOpen] = useState(false)
  const url = asset(src)

  const img = (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      width={width}
      height={height}
      className={`h-auto w-full ${className}`}
    />
  )

  return (
    <>
      {scroll ? (
        <div className={`relative overflow-hidden rounded-2xl ${frame}`}>
          <div style={{ height: scroll }} className="overflow-y-auto">
            {img}
          </div>
          {overlay}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute right-3 top-3 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-bold text-mist transition-colors hover:bg-ink"
          >
            放大 ⤢
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`放大檢視${caption ? `：${caption}` : ''}`}
          className={`group relative block w-full overflow-hidden rounded-2xl ${frame}`}
        >
          {img}
          {overlay}
          <span className="absolute bottom-3 right-3 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-bold text-mist opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            點擊放大 ⤢
          </span>
        </button>
      )}

      {open && (
        <Lightbox
          src={url}
          alt={alt}
          caption={caption}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
