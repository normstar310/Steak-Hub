export type Cut =
  | 'New York strip'
  | 'Ribeye'
  | 'Filet mignon'
  | 'Sirloin'
  | 'Porterhouse/T-bone'
  | 'Flank'
  | 'Skirt'
  | 'Flat iron'
  | 'Hanger'
  | 'Tri-tip'

export type Thickness = '0.75"' | '1"' | '1.25"' | '1.5"' | '2"'

export type Method = 'Charcoal' | 'Gas grill' | 'Cast-iron skillet'

export type Doneness =
  | 'Rare'
  | 'Medium-rare'
  | 'Medium'
  | 'Medium-well'
  | 'Well'

export interface CookSetup {
  cut: Cut
  thickness: Thickness
  method: Method
  doneness: Doneness | null
}

export interface CookLog {
  id: string
  cut: Cut
  thickness: Thickness
  method: Method
  doneness: Doneness | null
  durationMs: number
  savedAt: string
}

export interface CommunityAverage {
  cut: Cut
  thickness: Thickness
  method: Method
  avgSeconds: number
  sampleSize: number
}
