import type { CookLog } from '../types'
import { formatDate, formatDurationFriendly } from '../utils/format'

interface HistoryProps {
  logs: CookLog[]
  onRemove: (id: string) => void
  onClear: () => void
}

export function History({ logs, onRemove, onClear }: HistoryProps) {
  return (
    <section className="panel history-panel" aria-label="Cook history">
      <div className="panel-heading">
        <h2 className="panel-title">History</h2>
        {logs.length > 0 && (
          <button type="button" className="btn btn-text" onClick={onClear}>
            Clear all
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">No cooks yet</p>
          <p className="empty-body">
            Start the timer, cook your steak, then Save when you stop. Your
            personal history lives on this device.
          </p>
        </div>
      ) : (
        <ul className="history-list">
          {logs.map((log) => (
            <li key={log.id} className="history-item">
              <div className="history-main">
                <strong className="history-cut">{log.cut}</strong>
                <span className="history-meta">
                  {log.thickness} · {log.method}
                  {log.doneness ? ` · ${log.doneness}` : ''}
                </span>
                <span className="history-date">{formatDate(log.savedAt)}</span>
              </div>
              <div className="history-side">
                <span className="history-duration">
                  {formatDurationFriendly(log.durationMs)}
                </span>
                <button
                  type="button"
                  className="btn btn-text danger"
                  aria-label={`Delete cook of ${log.cut}`}
                  onClick={() => onRemove(log.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
