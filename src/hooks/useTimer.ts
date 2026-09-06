import { useCallback, useEffect, useRef, useState } from 'react'

export function useTimer() {
  const [elapsedMs, setElapsedMs] = useState(0)
  const [running, setRunning] = useState(false)
  const startRef = useRef<number | null>(null)
  const accumulatedRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const tick = useCallback((now: number) => {
    if (startRef.current == null) return
    setElapsedMs(accumulatedRef.current + (now - startRef.current))
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const start = useCallback(() => {
    if (startRef.current != null) return
    startRef.current = performance.now()
    setRunning(true)
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const stop = useCallback((): number => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    let final = accumulatedRef.current
    if (startRef.current != null) {
      final = accumulatedRef.current + (performance.now() - startRef.current)
      accumulatedRef.current = final
      startRef.current = null
    }
    setElapsedMs(final)
    setRunning(false)
    return final
  }, [])

  const reset = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    startRef.current = null
    accumulatedRef.current = 0
    setElapsedMs(0)
    setRunning(false)
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { elapsedMs, running, start, stop, reset }
}
