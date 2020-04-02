import { sample, uniqueId } from 'lodash'
import React from 'react'
import { moveAction, removeAction } from '../state/actions'
import { PLAYER_ID } from '../types/consts'
import { ObjectDefinition, ObjectTypes, XY } from '../types/types'
import { TileFactory } from './models/Items'

export const tileTypeDefinitions: Partial<Record<ObjectTypes, ObjectDefinition>> = {
    [ObjectTypes.Grass]: {
        getId: () => uniqueId('grass'),
        canEnter: () => true,
        Component: () => <div style={{ width: 50, height: 50, backgroundColor: 'green' }} />,
        Component3d: TileFactory('green'),
    },

    [ObjectTypes.Ice]: {
        getId: () => uniqueId('ice'),
        canEnter: () => true,
        enter: ({ who, vector }) => [moveAction(who.id, vector)],
        Component: () => <div style={{ width: 50, height: 50, backgroundColor: 'lightblue' }} />,
        Component3d: TileFactory('lightblue'),
    },

    [ObjectTypes.Rock]: {
        getId: () => uniqueId('rock'),
        canEnter: () => false,
        Component: () => <div style={{ width: 50, height: 50, backgroundColor: 'gray' }} />,
        Component3d: TileFactory('gray'),
    },

    [ObjectTypes.Button]: {
        getId: () => uniqueId('rock'),
        canEnter: () => false,
        push: ({ state }) => {
            const randomProp = sample(state.map.objects.filter(p => p.id !== PLAYER_ID))
            if (!randomProp) return []
            return [removeAction(randomProp.id)]
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
        Component3d: TileFactory('darkgray'),
    },
}
