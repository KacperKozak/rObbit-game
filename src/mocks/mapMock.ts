import { GrassObject, RockObject, ButtonObject } from '../objects/baseObjects'
import { PlayerObject, PropObject } from '../objects/propObjects'
import { AnyObject, GameMap } from '../types/types'

const mapDict = {
    0: GrassObject,
    1: RockObject,
    2: ButtonObject,
}

// prettier-ignore
const mapBitmap = [
    [1,1,1,1,2,1,1,],
    [1,0,0,0,0,0,1,],
    [1,0,0,1,1,0,1,],
    [1,0,0,1,0,0,1,],
    [1,1,1,1,1,1,1,],
]

const propDict = {
    1: PlayerObject,
    2: PropObject,
}

// prettier-ignore
const propsBitmap = [
    [0,0,0,0,0,0,0,],
    [0,1,0,0,0,0,0,],
    [0,0,0,0,0,0,0,],
    [0,2,0,0,2,0,2,],
    [0,0,0,0,0,0,0,],
]

export const createMap = (): GameMap => {
    const tiles = mapBitmap
        .map((items, y) =>
            items.map((type, x) => {
                const Object = mapDict[type as keyof typeof mapDict]
                return Object && new Object([x, y], [0, 0])
            }),
        )
        .flat()

    const props = propsBitmap
        .map((items, y) =>
            items.map((type, x) => {
                const Object = propDict[type as keyof typeof propDict]
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
