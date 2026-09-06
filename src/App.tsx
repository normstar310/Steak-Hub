import { useCallback, useState } from 'react'
import { Header } from './components/Header'
import { Timer } from './components/Timer'
import { SetupPanel } from './components/SetupPanel'
import { Averages } from './components/Averages'
import { History } from './components/History'
import { SaveCookModal } from './components/SaveCookModal'
import { DEFAULT_SETUP } from './data/options'
import { useTimer } from './hooks/useTimer'
import { useCookHistory } from './hooks/useCookHistory'
import type { CookSetup } from './types'

export default function App() {
  const [setup, setSetup] = useState<CookSetup>(DEFAULT_SETUP)
  const [saveOpen, setSaveOpen] = useState(false)
  const [pendingMs, setPendingMs] = useState(0)

  const { elapsedMs, running, start, stop, reset } = useTimer()
  const { logs, addCook, removeCook, clearAll, myAverageMs } = useCookHistory()

  const myAvg = myAverageMs(setup.cut, setup.thickness, setup.method)

  const handleToggle = useCallback(() => {
    if (running) {
      const finalMs = stop()
      setPendingMs(finalMs)
      if (finalMs > 0) setSaveOpen(true)
    } else {
      start()
    }
  }, [running, start, stop])

  const handleSave = useCallback(
    (payload: CookSetup & { durationMs: number }) => {
      addCook({
        cut: payload.cut,
        thickness: payload.thickness,
        method: payload.method,
        doneness: payload.doneness,
        durationMs: payload.durationMs,
      })
      setSaveOpen(false)
      setSetup((s) => ({ ...s, doneness: payload.doneness }))
    },
    [addCook],
  )

  const handleSkip = useCallback(() => {
    setSaveOpen(false)
  }, [])

  const handleReset = useCallback(() => {
    reset()
    setSaveOpen(false)
    setPendingMs(0)
  }, [reset])

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Timer
          elapsedMs={elapsedMs}
          running={running}
          onToggle={handleToggle}
          onReset={handleReset}
        />
        <SetupPanel
          setup={setup}
          onChange={setSetup}
          disabled={running}
        />
        <Averages
          cut={setup.cut}
          thickness={setup.thickness}
          method={setup.method}
          myAvg={myAvg}
        />
        <History logs={logs} onRemove={removeCook} onClear={clearAll} />
      </main>
      <footer className="app-footer">
        <p>Works offline · History saved on this device</p>
      </footer>
      <SaveCookModal
        open={saveOpen}
        setup={setup}
        durationMs={pendingMs}
        onSave={handleSave}
        onSkip={handleSkip}
      />
    </div>
  )
}
