import { useDispatch, useSelector } from 'react-redux'
import { applyVector, findById, findByXY } from '../helpers'
import { GameStateAware, move, enqueue, rotate } from '../state/gameReducer'
import { Vector2 } from '../types/types'
import { isEqual } from 'lodash'
import { Action } from 'redux'

export const useGame = () => {
    const state = useSelector((state: GameStateAware) => state.game)
    const dispatch = useDispatch()

    const triggerMove = (targetId: string, vector: Vector2) => {
        if (state.queueStared) return

        const actions: Action[] = []
        const who = findById(state.objects, targetId)

        if (!who) {
            return console.warn(`Unknown target ${targetId}`)
        }

        if (!isEqual(who.rotation, vector)) {
            actions.push(rotate({ targetId, rotation: vector }))
        } else {
            actions.push(move({ targetId, vector }))
        }

        dispatch(enqueue(actions))
    }

    return { ...state, move: triggerMove }
}
