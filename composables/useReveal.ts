export function useReveal(options?: { threshold?: number }) {
  const threshold = options?.threshold ?? 0.12

  const observe = (el: Element | null) => {
    if (!import.meta.client || !el) return
    if (el.classList.contains('is-visible')) return
    if ((el as HTMLElement).dataset.revealObserved === '1') return

    ;(el as HTMLElement).dataset.revealObserved = '1'

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        })
      },
      {
        threshold,
        rootMargin: '0px',
      },
    )

    io.observe(el)
  }

  const revealRef = (el: Element | null) => {
    observe(el)
  }

  return { revealRef, observe }
}
