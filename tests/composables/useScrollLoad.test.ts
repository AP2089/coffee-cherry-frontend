import { describe, expect, it, vi } from 'vitest'
import { isNearScrollTop, useScrollLoad } from '~/composables/useScrollLoad'

describe('useScrollLoad helpers', () => {
  it('detects near scroll top', () => {
    const element = {
      scrollTop: 0,
      clientHeight: 100,
      scrollHeight: 300,
    } as HTMLElement

    expect(isNearScrollTop(element)).toBe(true)

    element.scrollTop = 120
    expect(isNearScrollTop(element)).toBe(false)
  })

  it('does not load when canLoadMore is false', async () => {
    const load = vi.fn().mockResolvedValue(undefined)
    const element = {
      scrollTop: 0,
      clientHeight: 100,
      scrollHeight: 300,
    } as HTMLElement

    const scroll = useScrollLoad(() => element, load, {
      canLoadMore: () => false,
      isScrollTrigger: isNearScrollTop,
    })

    await scroll.tryLoad(true)

    expect(load).not.toHaveBeenCalled()
  })
})
