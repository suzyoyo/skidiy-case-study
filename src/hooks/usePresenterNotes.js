import { useEffect, useState } from 'react'

/**
 * 報告模式是否可用，由建置時的環境變數決定。
 * Vite 會在打包時把 import.meta.env.VITE_PRESENTER 直接替換成字面值，
 * 所以交作業用的建置裡，下面的 if 會變成 if (false)，
 * 整段 import 連同 presenterNotes.js 都會被搖掉，備註不會出現在產出檔案中。
 */
export const PRESENTER_ENABLED = import.meta.env.VITE_PRESENTER === '1'

export function usePresenterNotes() {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    if (!PRESENTER_ENABLED) return
    let alive = true
    import('../data/presenterNotes').then((m) => {
      if (alive) setNotes(m.presenterNotes)
    })
    return () => {
      alive = false
    }
  }, [])

  return notes
}
