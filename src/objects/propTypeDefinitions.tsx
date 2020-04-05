import { uniqueId } from 'lodash'
import { play, playEquip } from '../audio/play'
import { reverseVector } from '../helpers'
import { move, removeObject, setObjectData, tmpSpawn, win } from '../state/gameReducer'
import { PLAYER_ID } from '../types/consts'
import { ObjectDefinition, ObjectTypes } from '../types/types'
import {
    Arrow,
    Boom,
    Box,
    Button,
    Cannon,
    createTrigger,
    Crossbow,
    Door,
    Fence,
    Pipe,
    PipeDown,
    PipeElement,
    PipeLeft,
    PipePlace,
    PipeRight,
    PipeUp,
    Player,
    Rock,
    Rocket,
} from './models/Items'

export const propTypeDefinitions: Partial<Record<ObjectTypes, ObjectDefinition>> = {
    [ObjectTypes.Player]: {
        name: 'Player',
        height: () => 2,
        Component3d: Player,
    },

    [ObjectTypes.BigRock]: {
        name: 'Big rock',
        height: () => 0.55,
        Component3d: Rock,
    },
    [ObjectTypes.Pipe]: {
        name: 'Pipe',
        height: () => 0.75,
        Component3d: Pipe,
    },

    [ObjectTypes.PipeLeft]: {
        name: 'PipeLeft',
        height: () => 0.75,
        Component3d: PipeLeft,
    },
    [ObjectTypes.PipeRight]: {
        name: 'PipeRight',
        height: () => 0.75,
        Component3d: PipeRight,
    },
    [ObjectTypes.PipeUp]: {
        name: 'PipeUp',
        height: () => 0.75,
        Component3d: PipeUp,
    },
    [ObjectTypes.PipeDown]: {
        name: 'PipeDown',
        height: () => 0.75,
        Component3d: PipeDown,
    },
    [ObjectTypes.PipeElement]: {
        name: 'PipeElement',
        height: () => 0.75,
        push: ({ self, vector }) => [move({ targetId: self.id, vector })],
        Component3d: PipeElement,
    },
    [ObjectTypes.PipePlace]: {
        name: 'PipePlace',
        height: () => 0.14,
        enter: ({ who, state, self }) => {
            if (who.type === 'PipeElement') {
                play('Engine_start')
                return [win()]
            }
            return []
        },
        Component3d: PipePlace,
    },

    [ObjectTypes.Box]: {
        name: 'Box',
        height: () => 1,
        push: ({ self, vector }) => [move({ targetId: self.id, vector })],
        Component3d: Box,
    },

    [ObjectTypes.Fence]: {
        name: 'Fence',
        height: () => 1.5,
        push: ({ force, self }) => {
            if (force && force >= 50) return [removeObject(self.id)]
            return []
        },
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
            const toggle = !self.data.active
            return [
                setObjectData({ targetId: self.id, data: { active: toggle } }),
                setObjectData({ targetId: self.data.targetId, data: { open: toggle } }),
            ]
        },
        Component3d: Button,
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
        Component3d: createTrigger('#ABC123'),
    },

    [ObjectTypes.Door]: {
        name: 'Door',
        height: instance => (instance.data.open ? 0 : 1.5),
        Component3d: Door,
    },

    [ObjectTypes.Cannon]: {
        name: 'Cannon',
        height: () => 0,
        equip: ({ who, self }) => {
            playEquip(0.8)
            return [
                setObjectData({ targetId: who.id, data: { hasCannon: true } }),
                removeObject(self.id),
            ]
        },
        Component3d: Cannon,
    },

    [ObjectTypes.Boom]: {
        name: 'Boom',
        height: () => 0,
        Component3d: Boom,
    },

    [ObjectTypes.Crossbow]: {
        name: 'Crossbow',
        height: () => 0,
        equip: ({ who, self }) => {
            playEquip(0.8)
            return [
                setObjectData({ targetId: who.id, data: { hasGrapple: true } }),
                removeObject(self.id),
            ]
        },
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
                return [removeObject(self.id)]
            }

            play('Alert_YES') // TODO Boom!
            return [
                removeObject(self.id),
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
            return [removeObject(self.id)]
        },
        Component3d: Arrow,
    },
}
