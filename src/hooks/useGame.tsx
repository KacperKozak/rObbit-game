import { isEqual } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from 'redux'
import { findById } from '../helpers'
import { enqueue, equip, GameStateAware, move, rotate } from '../state/gameReducer'
import { PLAYER_ID } from '../types/consts'
import { Vector2 } from '../types/types'

const targetId = PLAYER_ID

export const useGame = () => {
    const state = useSelector((state: GameStateAware) => state.game)
    const dispatch = useDispatch()

    const triggerMove = (vector: Vector2) => {
        if (state.queueStared) return

        const actions: Action[] = []
        const who = findById(state.objects, PLAYER_ID)

        if (!who) {
            return console.warn(`Player don't exists [${PLAYER_ID}]`)
        }

        if (!isEqual(who.rotation, vector)) {
            actions.push(rotate({ targetId: PLAYER_ID, rotation: vector }))
        } else {
            actions.push(move({ targetId: PLAYER_ID, vector }))
        }

        dispatch(enqueue(actions))
    }

    const triggerEquip = () => {
        dispatch(enqueue(equip({ targetId: PLAYER_ID })))
    }

    return { ...state, move: triggerMove, equip: triggerEquip }
}
