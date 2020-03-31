import { GameMap } from '../types/types'
import { grass, rock } from '../objects/base'

// prettier-ignore
const mapBitmap = [
    [1,1,1,1,1,1,1,],
    [1,0,0,0,0,0,1,],
    [1,0,0,1,1,0,1,],
    [1,0,0,1,0,0,1,],
    [1,1,1,1,1,1,1,],
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

    return {
        defaultPlayerPos: [1, 1, 0],
        props: [],
        tiles,
    }
}
