import { useEffect, useId, useRef, useState } from 'react'
import type { CookSetup, Doneness } from '../types'
import { DONENESS_LEVELS } from '../data/options'
import { formatDurationFriendly } from '../utils/format'

interface SaveCookModalProps {
  open: boolean
  setup: CookSetup
  durationMs: number
  onSave: (payload: CookSetup & { durationMs: number }) => void
  onSkip: () => void
}

export function SaveCookModal({
  open,
  setup,
  durationMs,
  onSave,
  onSkip,
}: SaveCookModalProps) {
  const titleId = useId()
  const firstFocus = useRef<HTMLButtonElement>(null)
  const [doneness, setDoneness] = useState<Doneness | null>(setup.doneness)

  useEffect(() => {
    if (open) {
      setDoneness(setup.doneness)
      const t = window.setTimeout(() => firstFocus.current?.focus(), 50)
      return () => window.clearTimeout(t)
    }
  }, [open, setup.doneness])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onSkip()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onSkip])

  if (!open) return null

  return (
    <div className="modal-backdrop" role="presentation" onClick={onSkip}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className="modal-title">
          Save this cook?
        </h2>
        <p className="modal-duration">{formatDurationFriendly(durationMs)}</p>
        <dl className="modal-summary">
          <div>
            <dt>Cut</dt>
            <dd>{setup.cut}</dd>
          </div>
          <div>
            <dt>Thickness</dt>
            <dd>{setup.thickness}</dd>
          </div>
          <div>
            <dt>Method</dt>
            <dd>{setup.method}</dd>
          </div>
        </dl>

        <fieldset className="chip-field">
          <legend className="field-label">Doneness</legend>
          <div className="chip-row wrap">
            {DONENESS_LEVELS.map((d) => (
              <button
                key={d}
                type="button"
                className={`chip ${doneness === d ? 'is-active' : ''}`}
                aria-pressed={doneness === d}
                onClick={() => setDoneness(doneness === d ? null : d)}
              >
                {d}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="modal-actions">
          <button
            ref={firstFocus}
            type="button"
            className="btn btn-primary"
            onClick={() =>
              onSave({
                cut: setup.cut,
                thickness: setup.thickness,
                method: setup.method,
                doneness,
                durationMs,
              })
            }
          >
            Save cook
          </button>
          <button type="button" className="btn btn-ghost" onClick={onSkip}>
            Skip
          </button>
        </div>
      </div>
    </div>
  )
}
