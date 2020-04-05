import React from 'react'
import { limitVector } from '../helpers'
import { move, lose } from '../state/gameReducer'
import { ObjectDefinition, ObjectTypes } from '../types/types'
import { Button, Grass, Ground, Ice, Wall, Water } from './models/Items'
import { PLAYER_ID } from '../types/consts'

const tileDebugComponent = (color: string) => (props: any) => (
    <div
        style={{ width: '100%', height: '100%', backgroundColor: color, fontSize: 9 }}
        {...props}
    />
)

export const tileTypeDefinitions: Partial<Record<ObjectTypes, ObjectDefinition>> = {
    [ObjectTypes.Grass]: {
        name: 'Grass',
        height: () => 0,
        Component: tileDebugComponent('green'),
        Component3d: Grass,
    },
    [ObjectTypes.Water]: {
        name: 'Water',
        height: () => -1,
        Component: tileDebugComponent('green'),
        enter: ({ who }) => (who.id === PLAYER_ID ? [lose()] : []),

        Component3d: Water,
    },

    [ObjectTypes.Ice]: {
        name: 'Ice',
        height: () => 0,
        enter: ({ who, vector }) => [
            move({ targetId: who.id, vector: limitVector(vector, -1, 1) }),
        ],
        Component: tileDebugComponent('lightblue'),
        Component3d: Ice,
    },
    [ObjectTypes.RockFloor]: {
        name: 'Rock floor',
        height: () => 0,
        Component: tileDebugComponent('gray'),
        Component3d: Ground,
    },
    [ObjectTypes.Wall]: {
        name: 'Wall',
        height: () => 0,
        Component: tileDebugComponent('gray'),
        Component3d: Wall,
    },
}
