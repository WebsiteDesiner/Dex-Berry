import { useEffect, RefObject } from 'react'

export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: ((event: MouseEvent | TouchEvent) => void) | undefined
) {
  useEffect(() => {
    if (!handler) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current
      if (!el || el.contains((event?.target as Node) || null)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}