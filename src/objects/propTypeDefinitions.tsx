import { uniqueId } from 'lodash'
import React from 'react'
import { remove, setObjectData } from '../state/gameReducer'
import { PLAYER_ID } from '../types/consts'
import { ObjectDefinition, ObjectTypes } from '../types/types'
import { Item, Player } from './models/Items'

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
        getId: () => PLAYER_ID,
        canEnter: () => true,
        Component: propDebugComponent('white'),
        Component3d: Player,
    },
    [ObjectTypes.BigRock]: {
        name: 'Big rock',
        getId: () => uniqueId('big-rock'),
        canEnter: () => false,
        push: ({ self }) => [
            setObjectData({ targetId: self.id, data: { info: uniqueId('Too big! ') } }),
        ],
        Component: propDebugComponent('brown'),
        Component3d: Item,
    },
    [ObjectTypes.Cannon]: {
        name: 'Cannon',
        getId: () => uniqueId('cannon'),
        canEnter: () => true,
        equip: ({ who, self }) => [
            setObjectData({ targetId: who.id, data: { gun: 'cannon' } }),
            remove(self.id),
        ],
        Component: propDebugComponent('red'),
        Component3d: Item,
    },
}
