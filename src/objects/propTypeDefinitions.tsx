import { uniqueId } from 'lodash'
import React from 'react'
import { remove, setObjectData, move } from '../state/gameReducer'
import { PLAYER_ID } from '../types/consts'
import { ObjectDefinition, ObjectTypes } from '../types/types'
import { Item, Player } from './models/Items'
import { play } from '../audio/play'

const propDebugComponent = (color: string) => ({ instance, children }: any) => {
    return (
        <div
            style={{
                margin: '20%',
                width: '60%',
                height: '60%',
                borderRadius: instance.type === ObjectTypes.Player ? 100 : 5,
                backgroundColor: color,
                color: 'black',
                opacity: 0.7,
            }}
        >
            <pre style={{ padding: 2, fontSize: 8 }}>{children}</pre>
        </div>
    )
}

export const propTypeDefinitions: Partial<Record<ObjectTypes, ObjectDefinition>> = {
    [ObjectTypes.Player]: {
        name: 'Player',
        height: 2,
        getId: () => PLAYER_ID,
        Component: propDebugComponent('white'),
        Component3d: Player,
    },

    [ObjectTypes.BigRock]: {
        name: 'Big rock',
        height: 0.5,
        getId: () => uniqueId('big-rock'),
        push: ({ self, vector }) => [move({ targetId: self.id, vector })],
        Component: propDebugComponent('brown'),
        Component3d: Item,
    },

    [ObjectTypes.Cannon]: {
        name: 'Cannon',
        height: 0,
        getId: () => uniqueId('cannon'),
        equip: ({ who, self }) => {
            play('equip3')
            return [setObjectData({ targetId: who.id, data: { gun: 'cannon' } }), remove(self.id)]
        },
        Component: propDebugComponent('red'),
        Component3d: Item,
    },
}
