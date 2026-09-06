import type { Cut, Thickness, Method, Doneness } from '../types'

export const CUTS: Cut[] = [
  'New York strip',
  'Ribeye',
  'Filet mignon',
  'Sirloin',
  'Porterhouse/T-bone',
  'Flank',
  'Skirt',
  'Flat iron',
  'Hanger',
  'Tri-tip',
]

export const THICKNESSES: Thickness[] = ['0.75"', '1"', '1.25"', '1.5"', '2"']

export const METHODS: Method[] = ['Charcoal', 'Gas grill', 'Cast-iron skillet']

export const DONENESS_LEVELS: Doneness[] = [
  'Rare',
  'Medium-rare',
  'Medium',
  'Medium-well',
  'Well',
]

export const DEFAULT_SETUP = {
  cut: 'Ribeye' as Cut,
  thickness: '1.25"' as Thickness,
  method: 'Cast-iron skillet' as Method,
  doneness: 'Medium-rare' as Doneness,
}
