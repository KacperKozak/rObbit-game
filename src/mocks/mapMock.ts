import { GameMap, AnyObject } from '../types/types'
import { grass, rock } from '../objects/baseObjects'
import { propObject, playerObject } from '../objects/propObjects'

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
                const fn = type ? rock : grass
                return fn([x, y, 0], [0, 0])
            }),
        )
        .flat()

    const props = propsBitmap
        .map((items, y) =>
            items.map((type, x) => {
                const fn = type === 1 ? playerObject : type === 2 ? propObject : undefined
                return fn && fn([x, y, 0], [0, 0])
            }),
        )
        .flat()
        .filter(p => p !== undefined) as AnyObject[]

    return {
        defaultPlayerPos: [1, 1, 0],
        props,
        tiles,
    }
}
