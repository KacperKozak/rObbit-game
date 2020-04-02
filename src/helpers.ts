import { XY, Vector2 } from './types/types'

export const reverseVector = (vector: Vector2) => vector.map(v => v * -1) as Vector2

export const applyVector = ([x, y]: XY, [vx, vy]: Vector2): XY => [x + vx, y + vy]

export const samePosition = ([x1, y1]: XY, [x2, y2]: XY) => x1 === x2 && y1 === y2
