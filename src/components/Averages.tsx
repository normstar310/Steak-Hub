import type { Cut, Thickness, Method } from '../types'
import { findCommunityAverage } from '../data/communityAverages'
import { formatDurationFriendly } from '../utils/format'

interface AveragesProps {
  cut: Cut
  thickness: Thickness
  method: Method
  myAvg: { avgMs: number; count: number } | null
}

export function Averages({ cut, thickness, method, myAvg }: AveragesProps) {
  const community = findCommunityAverage(cut, thickness, method)

  return (
    <section className="panel averages-panel" aria-label="Average cook times">
      <h2 className="panel-title">Averages</h2>
      <p className="averages-combo">
        {cut} · {thickness} · {method}
      </p>
      <div className="avg-cards">
        <article className="avg-card">
          <span className="avg-label">Community avg</span>
          <strong className="avg-value">
            {community
              ? formatDurationFriendly(community.avgSeconds * 1000)
              : '—'}
          </strong>
          <span className="avg-meta">
            {community
              ? `Based on ${community.sampleSize} cooks`
              : 'No community data'}
          </span>
        </article>
        <article className="avg-card my-avg">
          <span className="avg-label">My avg</span>
          <strong className="avg-value">
            {myAvg ? formatDurationFriendly(myAvg.avgMs) : '—'}
          </strong>
          <span className="avg-meta">
            {myAvg
              ? `From ${myAvg.count} of your cooks`
              : 'Log cooks to unlock your average'}
          </span>
        </article>
      </div>
    </section>
  )
}
