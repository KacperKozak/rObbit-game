import { useContext } from 'react'
import { GameDispatchContext, GameStateContext } from '../app/GameContext'
import { applyVector, samePosition } from '../helpers'
import { moveAction } from '../state/actions'
import { Action, Vector2, XY, ActionEvent } from '../types/types'
import { getDefinition } from '../objects/definitions'

export const useGame = () => {
    const state = useContext(GameStateContext)
    const dispatch = useContext(GameDispatchContext)

    const move = (targetId: string, vector: Vector2) => {
        const who = findById(state.map.objects, targetId)

        if (!who) {
            return console.warn(`Unknown target ${targetId}`)
        }

        const newXY = applyVector(who.xy, vector)
        const nextTile = findByXY(state.map.objects, newXY)

        if (!nextTile) return

        // const nextTileDef = getDefinition(nextTile.type)

        // if (!nextTileDef?.canEnter({ who, vector, state, self: nextTile })) {
        //     if (nextTileDef?.push) {
        //         const pushActions = nextTileDef.push({ who, vector, state, self: nextTile })
        //         pushActions.forEach(dispatch)
        //     }
        //     return
        // }

        const actions: Action[] = [moveAction(targetId, vector)]

        // const prevTile = findByXY(state.map.tiles, who.xy)
        // const prevTileDef = prevTile && getDefinition(prevTile.type)

        // if (prevTileDef?.leave) {
        //     actions.push(...prevTileDef.leave({ who, vector, state, self: prevTile! }))
        // }

        // if (nextTileDef?.enter) {
        //     actions.push(...nextTileDef.enter({ who, vector, state, self: nextTile }))
        // }

        // const prevProp = findByXY(state.map.props, who.xy)
        // const prevPropDef = prevProp && getDefinition(prevProp.type)
        // const nextProp = findByXY(state.map.props, newXY)
        // const nextPropDef = nextProp && getDefinition(nextProp.type)

        // if (prevPropDef?.leave) {
        //     actions.push(...prevPropDef.leave({ who, vector, state, self: prevProp! }))
        // }

        // if (nextPropDef?.enter) {
        //     actions.push(...nextPropDef.enter({ who, vector, state, self: nextProp! }))
        // }

        actions.forEach(dispatch)
    }

    return { ...state, move }
}

const findById = <T extends { id: string }>(props: T[], id: string) => {
    return props.find(prop => prop.id === id)
}

const findByXY = <T extends { xy: XY }>(objects: T[], xy: XY) => {
    return objects.find(tile => samePosition(tile.xy, xy))
}
