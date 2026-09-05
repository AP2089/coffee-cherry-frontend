import { describe, expect, it, vi } from 'vitest'
import { isNearScrollBottom, isNearScrollTop, useScrollLoad } from '~/composables/useScrollLoad'

describe('useScrollLoad helpers', () => {
  it('detects top and bottom scroll positions', () => {
    const element = {
      scrollTop: 0,
      clientHeight: 100,
      scrollHeight: 300,
    } as HTMLElement

    expect(isNearScrollTop(element)).toBe(true)
    expect(isNearScrollBottom(element)).toBe(false)
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
