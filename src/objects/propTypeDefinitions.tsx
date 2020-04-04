import React from 'react'
import { playEquip, play } from '../audio/play'
import { move, remove, setObjectData, tmpSpawn } from '../state/gameReducer'
import { ObjectDefinition, ObjectTypes } from '../types/types'
import { Cannon, Crossbow, Player, Rock, Rocket, Boom, Fence } from './models/Items'
import { reverseVector } from '../helpers'
import { uniqueId } from 'lodash'

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

    [ObjectTypes.Fence]: {
        name: 'Fence',
        height: 1.5,
        push: ({ force, self }) => {
            if (force && force >= 50) return [remove(self.id)]
            return []
        },
        Component: propDebugComponent('brown'),
        Component3d: Fence,
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

    [ObjectTypes.Boom]: {
        name: 'Boom',
        height: 0,
        Component: propDebugComponent('yellow'),
        Component3d: Boom,
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
        projectileLaunch: ({ who }) => {
            const isCannon = who.data?.gun === 'cannon'
            play(isCannon ? 'Bazooka' : 'Crossbow')
            return [
                move(
                    { targetId: who.id, vector: isCannon ? reverseVector(who.rotation) : [0, 0] },
                    { delay: 250 }, // delay remove from projectileHit
                ),
            ]
        },
        projectileHit: ({ self, what, who }) => {
            if (!what) {
                return [remove(self.id)]
            }

            if (self.data.gun === 'crossbow') {
                play('Alert_YES') // TODO Hit!
                return [remove(self.id)]
            }

            play('Alert_YES') // TODO Boom!
            return [
                remove(self.id),
                tmpSpawn({
                    instance: {
                        type: ObjectTypes.Boom,
                        id: uniqueId(),
                        xy: self.xy,
                        elevation: self.elevation,
                        rotation: self.rotation,
                        aIndex: 0,
                        zIndex: 20,
                        data: {},
                    },
                }),
            ]
        },
        Component: propDebugComponent('yellow'),
        Component3d: Rocket,
    },
}
