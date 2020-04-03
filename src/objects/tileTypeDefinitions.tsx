import { uniqueId, sample } from 'lodash'
import React, { FC } from 'react'
import { ObjectDefinition, ObjectTypes } from '../types/types'
import { Button, Grass, Ground, Ice } from './models/Items'
import { remove, move } from '../state/gameReducer'
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
        getId: () => uniqueId('grass'),
        canEnter: () => true,
        Component: tileDebugComponent('green'),
        Component3d: Grass,
    },

    [ObjectTypes.Ice]: {
        name: 'Ice',
        getId: () => uniqueId('ice'),
        canEnter: () => true,
        enter: ({ who, vector }) => [move({ targetId: who.id, vector })],
        Component: tileDebugComponent('lightblue'),
        Component3d: Ice,
    },

    [ObjectTypes.RockFloor]: {
        name: 'Rock floor',
        getId: () => uniqueId('rock-floor'),
        canEnter: () => true,
        Component: tileDebugComponent('gray'),
        Component3d: Ground,
    },

    [ObjectTypes.Button]: {
        name: 'Button',
        getId: () => uniqueId('button'),
        canEnter: () => false,
        push: ({ state }) => {
            const randomProp = sample(state.objects.filter(p => p.id !== PLAYER_ID))
            if (!randomProp) return []
            return [remove(randomProp.id)]
        },
        Component: tileDebugComponent('blue'),
        Component3d: Button,
    },
}
