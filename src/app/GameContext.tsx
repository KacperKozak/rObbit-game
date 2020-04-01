import React, { createContext, ReactNode, useContext, useCallback, useReducer } from 'react'
import { createMap } from '../mocks/mapMock'
import { GameMap, Action, Vector2 } from '../types/types'

interface ContextState {
    map: GameMap
}

const initialState: ContextState = {
    map: createMap(),
}

export const GameStateContext = createContext<ContextState>(initialState)
export const GameDispatchContext = createContext<(action: Action) => void>(() => {
    throw new Error('[GameActionContext] Not initialized')
})

interface GameProviderProps {
    children: ReactNode
}

export const GameProvider = ({ children }: GameProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <GameDispatchContext.Provider value={dispatch}>
            <GameStateContext.Provider value={state}>{children}</GameStateContext.Provider>
        </GameDispatchContext.Provider>
    )
}

const reducer = (state: ContextState, action: Action): ContextState => {
    console.warn('[GameContext] Not handled action', action)
    return state
}

export const useGame = () => {
    const state = useContext(GameStateContext)
    const dispatch = useContext(GameDispatchContext)

    const move = useCallback((id: string, vector: Vector2) => {
        dispatch({ type: 'move', id, vector })
    }, [])

    return { ...state, move }
}
