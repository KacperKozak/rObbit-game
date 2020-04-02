import { useCallback, useContext, useRef } from 'react'
import { GameDispatchContext, GameStateContext } from '../app/GameContext'
import { applyVector, samePosition } from '../helpers'
import { moveAction } from '../state/actions'
import { Action, AnyObject, BaseObject, Vector2, XY } from '../types/types'

export const useGame = () => {
    const state = useContext(GameStateContext)
    const dispatch = useContext(GameDispatchContext)

    const actionsRef = useRef<Action[]>([])

    const move = (targetId: string, vector: Vector2) => {
        const target = findPropById(state.map.props, targetId)

        if (!target) {
            return console.warn(`Unknown target ${targetId}`)
        }

        const newXY = applyVector(target.xy, vector)
        const nextTile = findTileByXY(state.map.tiles, newXY)
        const prevTile = findTileByXY(state.map.tiles, target.xy)

        const actions: Action[] = [moveAction(targetId, vector)]

        if (nextTile?.enter) {
            actions.push(...nextTile.enter(target, vector))
        }

        if (prevTile?.leave) {
            actions.push(...prevTile.leave(target, vector))
        }

        actions.forEach(dispatch)
    }

    return { ...state, move }
}

const findPropById = (props: AnyObject[], id: string) => {
    return props.find(prop => prop.id === id)
}

const findTileByXY = (tiles: BaseObject[], xy: XY) => {
    return tiles.find(tile => samePosition(tile.xy, xy))
}
