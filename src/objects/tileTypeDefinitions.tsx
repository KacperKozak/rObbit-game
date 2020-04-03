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
        isGround: true,
        getId: () => uniqueId('grass'),
        canEnter: () => true,
        Component: tileDebugComponent('green'),
        Component3d: Grass,
    },

    [ObjectTypes.Ice]: {
        name: 'Ice',
        isGround: true,
        getId: () => uniqueId('ice'),
        canEnter: () => true,
        enter: ({ who, vector }) => [move({ targetId: who.id, vector })],
        Component: tileDebugComponent('lightblue'),
        Component3d: Ice,
    },

    [ObjectTypes.RockFloor]: {
        name: 'Rock floor',
        isGround: true,
        getId: () => uniqueId('rock-floor'),
        canEnter: () => true,
        Component: tileDebugComponent('gray'),
        Component3d: Ground,
    },

    [ObjectTypes.Button]: {
        name: 'Button',
        isGround: true,
        getId: () => uniqueId('button'),
        canEnter: () => false,
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
