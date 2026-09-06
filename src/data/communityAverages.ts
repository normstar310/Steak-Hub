import type { CommunityAverage, Cut, Thickness, Method } from '../types'
import { CUTS, THICKNESSES, METHODS } from './options'

/** Base seconds for a 1" steak by cut (medium-rare-ish community norms). */
const BASE_BY_CUT: Record<Cut, number> = {
  'New York strip': 480,
  Ribeye: 510,
  'Filet mignon': 420,
  Sirloin: 450,
  'Porterhouse/T-bone': 540,
  Flank: 360,
  Skirt: 300,
  'Flat iron': 390,
  Hanger: 400,
  'Tri-tip': 720,
}

const THICKNESS_FACTOR: Record<Thickness, number> = {
  '0.75"': 0.75,
  '1"': 1,
  '1.25"': 1.2,
  '1.5"': 1.45,
  '2"': 1.9,
}

const METHOD_FACTOR: Record<Method, number> = {
  Charcoal: 1.05,
  'Gas grill': 1,
  'Cast-iron skillet': 0.92,
}

function hashCombo(cut: Cut, thickness: Thickness, method: Method): number {
  const s = `${cut}|${thickness}|${method}`
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

/** Seeded community averages for every cut × thickness × method combo. */
export const COMMUNITY_AVERAGES: CommunityAverage[] = (() => {
  const rows: CommunityAverage[] = []
  for (const cut of CUTS) {
    for (const thickness of THICKNESSES) {
      for (const method of METHODS) {
        const base =
          BASE_BY_CUT[cut] *
          THICKNESS_FACTOR[thickness] *
          METHOD_FACTOR[method]
        const jitter = ((hashCombo(cut, thickness, method) % 41) - 20) / 100
        const avgSeconds = Math.round(base * (1 + jitter))
        const sampleSize = 18 + (hashCombo(cut, thickness, method) % 80)
        rows.push({ cut, thickness, method, avgSeconds, sampleSize })
      }
    }
  }
  return rows
})()

export function findCommunityAverage(
  cut: Cut,
  thickness: Thickness,
  method: Method,
): CommunityAverage | undefined {
  return COMMUNITY_AVERAGES.find(
    (r) => r.cut === cut && r.thickness === thickness && r.method === method,
  )
}
