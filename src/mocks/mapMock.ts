import { sample, uniqueId } from 'lodash'
import { findByXY } from '../helpers'
import { DOWN, LEFT, RIGHT, UP, PLAYER_ID } from '../types/consts'
import { ObjectInstance, ObjectTypes } from '../types/types'

const tileDict = {
    0: ObjectTypes.Grass,
    1: ObjectTypes.RockFloor,
    2: ObjectTypes.Button,
    3: ObjectTypes.Ice,
}

// prettier-ignore
const mapBitmap = [
    [1,1,1,1,2,1,1,],
    [1,0,3,3,0,0,1,],
    [1,0,0,1,1,0,1,],
    [1,0,0,1,0,0,1,],
    [1,1,1,1,1,1,1,],
]

const propDict = {
    1: ObjectTypes.Player,
    2: ObjectTypes.BigRock,
    3: ObjectTypes.Cannon,
    4: ObjectTypes.Crossbow,
    5: ObjectTypes.Fence,
}

// prettier-ignore
const propsBitmap = [
    [0,0,0,4,0,0,0,],
    [0,1,0,0,0,0,0,],
    [0,3,0,0,0,0,0,],
    [0,2,5,5,0,0,2,],
    [0,0,0,0,0,0,0,],
]

// TODO?
const randomRotation = () => {
    return sample([UP, LEFT, RIGHT, DOWN])!
}

export const createMap = (): ObjectInstance[] => {
    const tiles: ObjectInstance[] = mapBitmap.flatMap((items, y) =>
        items.map((typeNumber, x) => {
            const type = tileDict[typeNumber as keyof typeof tileDict]
            return {
                type,
                xy: [x, y],
                id: uniqueId(type),
                elevation: Math.random() / 1.5,
                rotation: randomRotation(),
                zIndex: 1,
                aIndex: 100,
                data: {},
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
                    id: type === ObjectTypes.Player ? PLAYER_ID : uniqueId(type),
                    elevation: findByXY(tiles, [x, y])[0]?.elevation || 0,
                    rotation: [0, 0],
                    zIndex: 2,
                    aIndex: 10,
                    data: {},
                }
            }),
        )
        .filter(a => a) as ObjectInstance[]

    return [...props, ...tiles]
}
