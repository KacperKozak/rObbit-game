import React from 'react'
import { playEquip, play } from '../audio/play'
import { move, remove, setObjectData } from '../state/gameReducer'
import { ObjectDefinition, ObjectTypes } from '../types/types'
import { Cannon, Crossbow, Player, Rock } from './models/Items'

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
        Component: propDebugComponent('white'),
        Component3d: Player,
    },

    [ObjectTypes.BigRock]: {
        name: 'Big rock',
        height: 0.5,
        push: ({ self, vector }) => [move({ targetId: self.id, vector })],
        Component: propDebugComponent('brown'),
        Component3d: Rock,
    },

    [ObjectTypes.Cannon]: {
        name: 'Cannon',
        height: 0,
        equip: ({ who, self }) => {
            playEquip(0.8)
            return [setObjectData({ targetId: who.id, data: { gun: 'cannon' } }), remove(self.id)]
        },
        Component: propDebugComponent('red'),
        Component3d: Cannon,
    },
    [ObjectTypes.Crossbow]: {
        name: 'Crossbow',
        height: 0,
        equip: ({ who, self }) => {
            playEquip(0.8)
            return [setObjectData({ targetId: who.id, data: { gun: 'crossbow' } }), remove(self.id)]
        },
        Component: propDebugComponent('red'),
        Component3d: Crossbow,
    },

    [ObjectTypes.Projectile]: {
        name: 'Projectile',
        height: 0,
        projectileLaunch: () => {
            play('Bazooka')
            return []
        },
        projectileHit: ({ self }) => {
            play('Alert_YES') // TODO Boooooom!!!
            return [remove(self.id)]
        },
        Component: propDebugComponent('yellow'),
        Component3d: Rock,
    },
}
