import { XY, Vector2 } from './types/types'

export const reverse = (arr: number[]) => arr.map(a => a * -1)

export const applyVector = ([x, y]: XY, [vx, vy]: Vector2): XY => [x + vx, y + vy]
