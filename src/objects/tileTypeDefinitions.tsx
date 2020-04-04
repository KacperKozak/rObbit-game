import { sample, uniqueId } from 'lodash'
import React from 'react'
import { play } from '../audio/play'
import { move, remove, setObjectData } from '../state/gameReducer'
import { PLAYER_ID } from '../types/consts'
import { ObjectDefinition, ObjectTypes } from '../types/types'
import { Button, Grass, Ground, Ice } from './models/Items'

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

    [ObjectTypes.Ice]: {
        name: 'Ice',
        height: () => 0,
        enter: ({ who, vector }) => [move({ targetId: who.id, vector })],
        Component: tileDebugComponent('lightblue'),
        Component3d: Ice,
    },

    [ObjectTypes.RockFloor]: {
        name: 'Rock floor',
        height: () => 0,
        push: ({ force, self }) => {
            if (force && force >= 50) return [remove(self.id)]
            return []
        },
        Component: tileDebugComponent('gray'),
        Component3d: Ground,
    },
}
