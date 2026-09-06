import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CookLog, Cut, Thickness, Method } from '../types'

const STORAGE_KEY = 'steak-hub-cook-history-v1'

function loadHistory(): CookLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CookLog[]
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function persist(logs: CookLog[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
  } catch {
    // Quota or private mode — ignore
  }
}

export function useCookHistory() {
  const [logs, setLogs] = useState<CookLog[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setLogs(loadHistory())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    persist(logs)
  }, [logs, hydrated])

  const addCook = useCallback((log: Omit<CookLog, 'id' | 'savedAt'>) => {
    const entry: CookLog = {
      ...log,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      savedAt: new Date().toISOString(),
    }
    setLogs((prev) => [entry, ...prev])
    return entry
  }, [])

  const removeCook = useCallback((id: string) => {
    setLogs((prev) => prev.filter((l) => l.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setLogs([])
  }, [])

  const myAverageMs = useCallback(
    (cut: Cut, thickness: Thickness, method: Method) => {
      const matches = logs.filter(
        (l) =>
          l.cut === cut && l.thickness === thickness && l.method === method,
      )
      if (matches.length === 0) return null
      const sum = matches.reduce((acc, l) => acc + l.durationMs, 0)
      return {
        avgMs: Math.round(sum / matches.length),
        count: matches.length,
      }
    },
    [logs],
  )

  const sorted = useMemo(
    () => [...logs].sort((a, b) => b.savedAt.localeCompare(a.savedAt)),
    [logs],
  )

  return {
    logs: sorted,
    hydrated,
    addCook,
    removeCook,
    clearAll,
    myAverageMs,
  }
}
