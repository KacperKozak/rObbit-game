import { useCallback, useContext, useRef } from 'react'
import { GameDispatchContext, GameStateContext } from '../app/GameContext'
import { applyVector, samePosition } from '../helpers'
import { moveAction } from '../state/actions'
import { Action, AnyObject, BaseObject, Vector2, XY } from '../types/types'

export const useGame = () => {
    const state = useContext(GameStateContext)
    const dispatch = useContext(GameDispatchContext)

    const move = (targetId: string, vector: Vector2) => {
        const target = findById(state.map.props, targetId)

        if (!target) {
            return console.warn(`Unknown target ${targetId}`)
        }

        const newXY = applyVector(target.xy, vector)

        const prevTile = findByXY(state.map.tiles, target.xy)
        const nextTile = findByXY(state.map.tiles, newXY)

        if (!nextTile?.canEnter(target, vector, state)) {
            if (nextTile?.push) {
                const pushActions = nextTile.push(target, vector, state)
                pushActions.forEach(dispatch)
            }
            return
        }

        const actions: Action[] = [moveAction(targetId, vector)]

        if (prevTile?.leave) {
            actions.push(...prevTile.leave(target, vector, state))
        }

        if (nextTile?.enter) {
            actions.push(...nextTile.enter(target, vector, state))
        }

        const prevProp = findByXY(state.map.props, target.xy)
        const nextProp = findByXY(state.map.props, newXY)

        if (prevProp?.leave) {
            actions.push(...prevProp.leave(target, vector, state))
        }

        if (nextProp?.enter) {
            actions.push(...nextProp.enter(target, vector, state))
        }

        actions.forEach(dispatch)
    }

    return { ...state, move }
}

const findById = (props: BaseObject[], id: string) => {
    return props.find(prop => prop.id === id)
}

const findByXY = (objects: BaseObject[], xy: XY) => {
    return objects.find(tile => samePosition(tile.xy, xy))
}
