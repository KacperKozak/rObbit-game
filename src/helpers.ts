import { XY, Vector2 } from './types/types'
import { sample } from 'lodash'
import { UP, LEFT, RIGHT, DOWN } from './types/consts'

export const reverseVector = (vector: Vector2) => vector.map(v => v * -1) as Vector2

export const applyVector = ([x, y]: XY, [vx, vy]: Vector2): XY => [x + vx, y + vy]

export const samePosition = ([x1, y1]: XY, [x2, y2]: XY) => x1 === x2 && y1 === y2

export const findById = <T extends { id: string }>(props: T[], id: string) => {
    return props.find(prop => prop.id === id)
}

export const findByXY = <T extends { xy: XY }>(objects: T[], xy: XY) => {
    return objects.filter(tile => samePosition(tile.xy, xy))
}

export const asArray = <T>(item: T | T[]): T[] => (Array.isArray(item) ? item : [item])
export const arrMerge = <T>(a: T[], b: T | T[] = []): T[] => [...a, ...asArray(b)]

export const limit = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value))

export const limitVector = (vector: Vector2, min: number, max: number) =>
    vector.map(v => limit(v, min, max)) as Vector2

export const vectorDiff = (v1: Vector2, v2: Vector2) => v1.map((v, i) => v2[i] - v) as Vector2

export const createArray = (length: number): number[] =>
    Array.from({ length: length + 1 }, (v, i) => i)

export const randomRotation = () => {
    return sample([UP, LEFT, RIGHT, DOWN])!
}

export const shuffleArray = <T>(array: T[]): T[] => {
    const arr = array.slice()
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}
