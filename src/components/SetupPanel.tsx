import type { CookSetup, Cut, Doneness } from '../types'
import {
  CUTS,
  THICKNESSES,
  METHODS,
  DONENESS_LEVELS,
} from '../data/options'

interface SetupPanelProps {
  setup: CookSetup
  onChange: (next: CookSetup) => void
  disabled?: boolean
}

export function SetupPanel({ setup, onChange, disabled }: SetupPanelProps) {
  return (
    <section className="panel setup-panel" aria-label="Cook setup">
      <h2 className="panel-title">Setup</h2>

      <label className="field">
        <span className="field-label">Cut</span>
        <select
          className="field-control"
          value={setup.cut}
          disabled={disabled}
          onChange={(e) =>
            onChange({ ...setup, cut: e.target.value as Cut })
          }
        >
          {CUTS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="chip-field" disabled={disabled}>
        <legend className="field-label">Thickness</legend>
        <div className="chip-row" role="group" aria-label="Thickness">
          {THICKNESSES.map((t) => (
            <button
              key={t}
              type="button"
              className={`chip ${setup.thickness === t ? 'is-active' : ''}`}
              aria-pressed={setup.thickness === t}
              onClick={() => onChange({ ...setup, thickness: t })}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="chip-field" disabled={disabled}>
        <legend className="field-label">Method</legend>
        <div className="chip-row" role="group" aria-label="Cooking method">
          {METHODS.map((m) => (
            <button
              key={m}
              type="button"
              className={`chip ${setup.method === m ? 'is-active' : ''}`}
              aria-pressed={setup.method === m}
              onClick={() => onChange({ ...setup, method: m })}
            >
              {m}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="chip-field" disabled={disabled}>
        <legend className="field-label">
          Doneness <span className="optional">(optional)</span>
        </legend>
        <div className="chip-row wrap" role="group" aria-label="Doneness">
          {DONENESS_LEVELS.map((d) => (
            <button
              key={d}
              type="button"
              className={`chip ${setup.doneness === d ? 'is-active' : ''}`}
              aria-pressed={setup.doneness === d}
              onClick={() =>
                onChange({
                  ...setup,
                  doneness: setup.doneness === d ? null : (d as Doneness),
                })
              }
            >
              {d}
            </button>
          ))}
        </div>
      </fieldset>
    </section>
  )
}
