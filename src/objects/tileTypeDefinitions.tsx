import { uniqueId } from 'lodash'
import React from 'react'
import { ObjectDefinition, ObjectTypes } from '../types/types'
import { Button, Grass, Ground, Ice } from './models/Items'

export const tileTypeDefinitions: Partial<Record<ObjectTypes, ObjectDefinition>> = {
    [ObjectTypes.Grass]: {
        getId: () => uniqueId('grass'),
        canEnter: () => true,
        Component: () => <div style={{ width: 50, height: 50, backgroundColor: 'green' }} />,
        Component3d: Grass,
    },

    [ObjectTypes.Ice]: {
        getId: () => uniqueId('ice'),
        canEnter: () => true,
        enter: ({ who, vector }) => [], // TODO [moveAction(who.id, vector)]
        Component: () => <div style={{ width: 50, height: 50, backgroundColor: 'lightblue' }} />,
        Component3d: Ice,
    },

    [ObjectTypes.Rock]: {
        getId: () => uniqueId('rock'),
        canEnter: () => false,
        Component: () => <div style={{ width: 50, height: 50, backgroundColor: 'gray' }} />,
        Component3d: Ground,
    },

    [ObjectTypes.Button]: {
        getId: () => uniqueId('rock'),
        canEnter: () => false,
        push: ({ state }) => {
            return []
            // TODO
            // const randomProp = sample(state.map.objects.filter(p => p.id !== PLAYER_ID))
            // if (!randomProp) return []
            // return [removeAction(randomProp.id)]
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
