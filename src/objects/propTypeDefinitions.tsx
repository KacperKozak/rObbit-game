import React from 'react'
import { playEquip, play } from '../audio/play'
import { move, remove, setObjectData, tmpSpawn, win } from '../state/gameReducer'
import { ObjectDefinition, ObjectTypes } from '../types/types'
import {
    Cannon,
    Crossbow,
    Player,
    Rock,
    Rocket,
    Box,
    Boom,
    Fence,
    Arrow,
    Button,
    createTrigger,
} from './models/Items'
import { reverseVector } from '../helpers'
import { uniqueId, sample } from 'lodash'
import { PLAYER_ID } from '../types/consts'

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
        height: () => 2,
        Component: propDebugComponent('white'),
        Component3d: Player,
    },

    [ObjectTypes.BigRock]: {
        name: 'Big rock',
        height: () => 0.55,
        Component: propDebugComponent('gray'),
        Component3d: Rock,
    },
    [ObjectTypes.Box]: {
        name: 'Box',
        height: () => 1,
        push: ({ self, vector }) => [move({ targetId: self.id, vector })],
        Component: propDebugComponent('brown'),
        Component3d: Box,
    },

    [ObjectTypes.Fence]: {
        name: 'Fence',
        height: () => 1.5,
        push: ({ force, self }) => {
            if (force && force >= 50) return [remove(self.id)]
            return []
        },
        Component: propDebugComponent('brown'),
        Component3d: Fence,
    },

    [ObjectTypes.Button]: {
        name: 'Button',
        height: () => 2,
        push: ({ state, self }) => {
            play('button')
            if (!self.data.targetId) {
                console.warn('Missing Button data.targetId')
                return []
            }
            const toggle = !self.data.open
            return [
                setObjectData({ targetId: self.id, data: { open: toggle } }),
                setObjectData({ targetId: self.data.targetId, data: { open: toggle } }),
            ]
        },
        Component: propDebugComponent('blue'),
        Component3d: Fence,
    },

    [ObjectTypes.WinTrigger]: {
        name: 'WinTrigger',
        height: () => 0,
        enter: ({ who, state, self }) => {
            if (who.id === PLAYER_ID) {
                play('Engine_start')
                return [win()]
            }
            return []
        },
        Component: propDebugComponent('#ABC123'),
        Component3d: createTrigger('#ABC123'),
    },

    [ObjectTypes.Dor]: {
        name: 'Dor',
        height: instance => {
            return instance.data.open ? 0 : 1.5
        },
        push: ({ force, self }) => {
            if (force && force >= 50) return [remove(self.id)]
            return []
        },
        Component: propDebugComponent('purple'),
        Component3d: Fence,
    },

    [ObjectTypes.Cannon]: {
        name: 'Cannon',
        height: () => 0,
        equip: ({ who, self }) => {
            playEquip(0.8)
            return [setObjectData({ targetId: who.id, data: { hasCannon: true } }), remove(self.id)]
        },
        Component: propDebugComponent('red'),
        Component3d: Cannon,
    },

    [ObjectTypes.Boom]: {
        name: 'Boom',
        height: () => 0,
        Component: propDebugComponent('yellow'),
        Component3d: Boom,
    },

    [ObjectTypes.Crossbow]: {
        name: 'Crossbow',
        height: () => 0,
        equip: ({ who, self }) => {
            playEquip(0.8)
            return [
                setObjectData({ targetId: who.id, data: { hasGrapple: true } }),
                remove(self.id),
            ]
        },
        Component: propDebugComponent('red'),
        Component3d: Crossbow,
    },

    [ObjectTypes.RocketProjectile]: {
        name: 'RocketProjectile',
        height: () => 0,
        projectileLaunch: ({ who }) => {
            play('Bazooka')
            return [
                move(
                    { targetId: who.id, vector: reverseVector(who.rotation) },
                    { delay: 250 }, // delay remove from projectileHit
                ),
            ]
        },
        projectileHit: ({ self, what, who }) => {
            if (!what) {
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

    [ObjectTypes.CrossbowProjectile]: {
        name: 'Projectile',
        height: () => 0,
        projectileLaunch: ({ who }) => {
            play('Crossbow')
            return [
                move(
                    { targetId: who.id, vector: [0, 0] },
                    { delay: 250 }, // delay remove from projectileHit
                ),
            ]
        },
        projectileHit: ({ self, what, who }) => {
            if (what) {
                play('Alert_YES') // TODO Hit!
            }
            return [remove(self.id)]
        },
        Component: propDebugComponent('pink'),
        Component3d: Arrow,
    },
}
