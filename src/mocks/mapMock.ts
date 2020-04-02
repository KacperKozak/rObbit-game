import { tileTypeDefinitions } from '../objects/tileTypeDefinitions'
import { propTypeDefinitions } from '../objects/propTypeDefinitions'
import { GameMap, ObjectInstance, ObjectTypes } from '../types/types'

const tileDict = {
    0: ObjectTypes.Grass,
    1: ObjectTypes.Rock,
    2: ObjectTypes.Button,
    3: ObjectTypes.Ice,
}

// prettier-ignore
const mapBitmap = [
    [1,1,1,1,2,1,1,],
    [1,0,0,3,0,0,1,],
    [1,0,0,1,1,0,1,],
    [1,0,0,1,0,0,1,],
    [1,1,1,1,1,1,1,],
]

const propDict = {
    1: ObjectTypes.Player,
    2: ObjectTypes.TestProp,
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
    const tiles: ObjectInstance[] = mapBitmap.flatMap((items, y) =>
        items.map((typeNumber, x) => {
            const type = tileDict[typeNumber as keyof typeof tileDict]
            return {
                type,
                xy: [x, y],
                id: tileTypeDefinitions[type]!.getId(),
            }
        }),
    )

    const props = propsBitmap
        .flatMap((items, y) =>
            items.map((typeNumber, x) => {
                const type = propDict[typeNumber as keyof typeof propDict]
                if (!type) return
                return {
                    type,
                    xy: [x, y],
                    id: propTypeDefinitions[type]!.getId(),
                }
            }),
        )
        .filter(a => a) as ObjectInstance[]

    return { objects: [...props, ...tiles] }
}
