import { uniqueId, sample } from 'lodash'
import React from 'react'
import { ObjectDefinition, ObjectTypes } from '../types/types'
import { Button, Grass, Ground, Ice } from './models/Items'
import { remove, move } from '../state/gameReducer'
import { PLAYER_ID } from '../types/consts'

export const tileTypeDefinitions: Partial<Record<ObjectTypes, ObjectDefinition>> = {
    [ObjectTypes.Grass]: {
        name: 'Grass',
        getId: () => uniqueId('grass'),
        canEnter: () => true,
        Component: () => <div style={{ width: 50, height: 50, backgroundColor: 'green' }} />,
        Component3d: Grass,
    },

    [ObjectTypes.Ice]: {
        name: 'Ice',
        getId: () => uniqueId('ice'),
        canEnter: () => true,
        enter: ({ who, vector }) => [move({ targetId: who.id, vector })],
        Component: () => <div style={{ width: 50, height: 50, backgroundColor: 'lightblue' }} />,
        Component3d: Ice,
    },

    [ObjectTypes.Rock]: {
        name: 'Rock',
        getId: () => uniqueId('rock'),
        canEnter: () => false,
        Component: () => <div style={{ width: 50, height: 50, backgroundColor: 'gray' }} />,
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
        Component: () => (
            <div
                style={{
                    width: 50,
                    height: 50,
                    backgroundColor: 'gray',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <button style={{ fontSize: 10 }}>btn</button>
            </div>
        ),
        Component3d: Button,
    },
}
