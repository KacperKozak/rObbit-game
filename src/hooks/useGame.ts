import { isEqual } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from 'redux'
import { findById } from '../helpers'
import { enqueue, equip, GameStateAware, move, rotate, projectile } from '../state/gameReducer'
import { PLAYER_ID } from '../types/consts'
import { Vector2 } from '../types/types'
import { play } from '../audio/play'

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
        dispatch(enqueue(projectile({ byId: id, xy, vector: rotation, elevation })))
    }

    return { ...state, move: triggerMove, equip: triggerEquip, fire: triggerFire }
}
