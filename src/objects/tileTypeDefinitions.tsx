import { uniqueId, sample } from 'lodash'
import React, { FC } from 'react'
import { ObjectDefinition, ObjectTypes } from '../types/types'
import { Button, Grass, Ground, Ice } from './models/Items'
import { remove, move, setObjectData } from '../state/gameReducer'
import { PLAYER_ID } from '../types/consts'
import { play } from '../audio/play'

const tileDebugComponent = (color: string) => (props: any) => (
    <div
        style={{ width: '100%', height: '100%', backgroundColor: color, fontSize: 9 }}
        {...props}
    />
)

export const tileTypeDefinitions: Partial<Record<ObjectTypes, ObjectDefinition>> = {
    [ObjectTypes.Grass]: {
        name: 'Grass',
        height: 0,
        getId: () => uniqueId('grass'),
        Component: tileDebugComponent('green'),
        Component3d: Grass,
    },

    [ObjectTypes.Ice]: {
        name: 'Ice',
        height: 0,
        getId: () => uniqueId('ice'),
        enter: ({ who, vector }) => [move({ targetId: who.id, vector })],
        Component: tileDebugComponent('lightblue'),
        Component3d: Ice,
    },

    [ObjectTypes.RockFloor]: {
        name: 'Rock floor',
        height: 0,
        getId: () => uniqueId('rock-floor'),
        Component: tileDebugComponent('gray'),
        Component3d: Ground,
    },

    [ObjectTypes.Button]: {
        name: 'Button',
        height: 0,
        getId: () => uniqueId('button'),
        push: ({ state, self }) => {
            const randomProp = sample(state.objects.filter(p => p.id !== PLAYER_ID))
            play('button')
            if (!randomProp) return []
            return [
                remove(randomProp.id),
                setObjectData({ targetId: self.id, data: { info: uniqueId('Ups!') } }),
            ]
        },
        Component: tileDebugComponent('blue'),
        Component3d: Button,
    },
}
