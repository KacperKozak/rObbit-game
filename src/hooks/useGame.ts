import { isEqual, uniqueId } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from 'redux'
import { play } from '../audio/play'
import { PROJECTILE_ELEVATION } from '../config'
import { findById } from '../helpers'
import {
    enqueue,
    equip,
    GameStateAware,
    grapple,
    loadMap,
    move,
    projectile,
    reset,
    rotate,
    unloadMap,
} from '../state/gameReducer'
import { PLAYER_ID } from '../types/consts'
import { MapData, ObjectInstance, ObjectTypes, Vector2 } from '../types/types'

export const useGame = () => {
    const state = useSelector((state: GameStateAware) => state.game)
    const dispatch = useDispatch()
    const player = findById(state.objects, PLAYER_ID)!

    if (!player) console.warn(`Player don't exists`)

    const triggerMove = (vector: Vector2) => {
        if (state.queueStared) return

        const actions: Action[] = []

        if (!player) {
            return console.warn(`Player don't exists`)
        }

        if (!isEqual(player.rotation, vector)) {
            // Hmm it's ok without enqueue?
            dispatch(rotate({ targetId: player.id, rotation: vector }))
        } else {
            actions.push(move({ targetId: player.id, vector }))
        }

        dispatch(enqueue(actions))
    }

    const triggerEquip = () => {
        if (state.queueStared) return
        dispatch(enqueue(equip({ targetId: player.id })))
    }

    const triggerGrapple = () => {
        if (state.queueStared) return

        if (!player.data.hasGrapple) {
            play('Alert_NO')
            return
        }

        dispatch(enqueue(grapple({ targetId: player.id })))
    }

    const triggerFire = () => {
        if (state.queueStared) return
        const { id, xy, rotation, elevation, data } = player

        if (!data.hasCannon) {
            play('Alert_NO')
            return
        }

        const instance: ObjectInstance = {
            type: ObjectTypes.RocketProjectile,
            id: uniqueId(),
            xy,
            rotation,
            elevation: elevation + PROJECTILE_ELEVATION,
            aIndex: 100,
            zIndex: 10,
            data,
        }

        dispatch(enqueue(projectile({ byId: id, instance })))
    }

    const triggerLoadMap = (map: MapData) => {
        dispatch(loadMap(map))
    }
    const triggerUnloadMap = () => {
        dispatch(unloadMap())
    }

    const triggerReset = () => {
        dispatch(reset())
    }

    return {
        ...state,
        player,

        loadMap: triggerLoadMap,
        unloadMap: triggerUnloadMap,
        reset: triggerReset,

        move: triggerMove,
        equip: triggerEquip,
        fire: triggerFire,
        grapple: triggerGrapple,
    }
}
