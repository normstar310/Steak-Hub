import { formatDuration } from '../utils/format'

interface TimerProps {
  elapsedMs: number
  running: boolean
  onToggle: () => void
  onReset: () => void
}

export function Timer({ elapsedMs, running, onToggle, onReset }: TimerProps) {
  const display = formatDuration(elapsedMs)
  const isLong = display.length > 5

  return (
    <section className="timer-hero" aria-label="Cook timer">
      <div
        className={`timer-display ${running ? 'is-running' : ''} ${isLong ? 'is-long' : ''}`}
        role="timer"
        aria-live="polite"
        aria-atomic="true"
      >
        {display}
      </div>
      <div className="timer-actions">
        <button
          type="button"
          className={`btn btn-primary btn-huge ${running ? 'is-stop' : 'is-start'}`}
          onClick={onToggle}
        >
          {running ? 'Stop' : 'Start'}
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-reset"
          onClick={onReset}
          disabled={elapsedMs === 0 && !running}
        >
          Reset
        </button>
      </div>
      <p className="timer-hint">
        {running
          ? 'Cooking… tap Stop when you pull the steak.'
          : elapsedMs > 0
            ? 'Stopped. Save this cook or Reset to start fresh.'
            : 'Set up your steak, then hit Start.'}
      </p>
    </section>
  )
}
