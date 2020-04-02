import { GrassObject, RockObject } from '../objects/baseObjects'
import { PlayerObject, PropObject } from '../objects/propObjects'
import { AnyObject, GameMap } from '../types/types'

// prettier-ignore
const mapBitmap = [
    [1,1,1,1,1,1,1,],
    [1,0,0,0,0,0,1,],
    [1,0,0,1,1,0,1,],
    [1,0,0,1,0,0,1,],
    [1,1,1,1,1,1,1,],
]

// prettier-ignore
const propsBitmap = [
    [0,0,0,0,0,0,0,],
    [0,1,0,0,0,0,0,],
    [0,0,0,0,0,0,0,],
    [0,2,0,0,0,0,0,],
    [0,0,0,0,0,0,0,],
]

export const createMap = (): GameMap => {
    const tiles = mapBitmap
        .map((items, y) =>
            items.map((type, x) => {
                const Object = type ? RockObject : GrassObject
                return new Object([x, y], [0, 0])
            }),
        )
        .flat()

    const props = propsBitmap
        .map((items, y) =>
            items.map((type, x) => {
                const Object = type === 1 ? PlayerObject : type === 2 ? PropObject : undefined
                return Object && new Object([x, y], [0, 0])
            }),
        )
        .flat()
        .filter(p => p !== undefined) as AnyObject[]

    return {
        props,
        tiles,
    }
}
