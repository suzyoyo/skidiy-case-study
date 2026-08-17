import { useEffect, useState } from 'react'

/** 回傳整頁滾動進度 0–1 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return progress
}

/**
 * 追蹤目前停留在視窗中的章節 id。
 * 以「離視窗上緣 35% 線最近且已通過」的章節為準，比 IntersectionObserver
 * 的門檻判定在長短不一的章節上更穩定。
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      // 捲到最底時強制點亮最後一節，避免短章節永遠點不到
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = ids[ids.length - 1]
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ids])

  return active
}

/** 元素進入視窗時加上淡入動畫 */
export function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]')
    if (!targets.length) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    // 只有真的要跑動畫時才把內容藏起來，避免 observer 沒觸發就整頁看不見
    const root = document.documentElement
    root.classList.add('reveal-ready')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      // 正的下緣 margin＝元素還在視窗下方就先觸發，
      // 避免報告時快速捲動出現整片空白區塊
      { rootMargin: '0px 0px 25% 0px', threshold: 0 }
    )

    targets.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])
}
