import { useContext, useCallback } from 'react'
import { Vector2 } from '../types/types'
import { GameStateContext, GameDispatchContext } from '../app/GameContext'

export const useGame = () => {
    const state = useContext(GameStateContext)
    const dispatch = useContext(GameDispatchContext)

    const move = useCallback((id: string, vector: Vector2) => {
        dispatch({ type: 'move', id, vector })
    }, [])

    return { ...state, move }
}
