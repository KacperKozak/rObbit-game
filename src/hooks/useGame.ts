import { isEqual, uniqueId } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from 'redux'
import { play } from '../audio/play'
import { PROJECTILE_ELEVATION } from '../config'
import { findById } from '../helpers'
import { enqueue, equip, GameStateAware, move, projectile, rotate } from '../state/gameReducer'
import { PLAYER_ID } from '../types/consts'
import { ObjectInstance, ObjectTypes, Vector2 } from '../types/types'

const targetId = PLAYER_ID

export const useGame = () => {
    const state = useSelector((state: GameStateAware) => state.game)
    const dispatch = useDispatch()

    const triggerMove = (vector: Vector2) => {
        if (state.queueStared) return

        const actions: Action[] = []
        const who = findById(state.objects, targetId)

        if (!who) {
            return console.warn(`Player don't exists [${targetId}]`)
        }

        if (!isEqual(who.rotation, vector)) {
            actions.push(rotate({ targetId, rotation: vector }))
        } else {
            actions.push(move({ targetId, vector }))
        }

        dispatch(enqueue(actions))
    }

    const triggerEquip = () => {
        if (state.queueStared) return
        dispatch(enqueue(equip({ targetId })))
    }

    const triggerFire = () => {
        if (state.queueStared) return
        const { id, xy, rotation, elevation, data } = findById(state.objects, targetId)!

        if (!data?.gun) {
            play('Alert_NO')
            return
        }

        let instance: ObjectInstance

        if (data.gun === 'cannon') {
            instance = {
                type: ObjectTypes.RocketProjectile,
                id: uniqueId(),
                xy,
                rotation,
                elevation: elevation + PROJECTILE_ELEVATION,
                aIndex: 100,
                zIndex: 10,
                data,
            }
        } else {
            instance = {
                type: ObjectTypes.CrossbowProjectile,
                id: uniqueId(),
                xy,
                rotation,
                elevation: elevation + PROJECTILE_ELEVATION,
                aIndex: 100,
                zIndex: 10,
                data,
            }
        }

        dispatch(enqueue(projectile({ byId: id, instance })))
    }

    return { ...state, move: triggerMove, equip: triggerEquip, fire: triggerFire }
}
