import React, { createContext, ReactNode, useReducer } from 'react'
import { Action } from '../types/types'
import { GameState, initialState, gameReducer } from '../state/gameReducer'

export const GameStateContext = createContext<GameState>(initialState)
export const GameDispatchContext = createContext<(action: Action) => void>(() => {
    throw new Error('[GameActionContext] Not initialized')
})

interface GameProviderProps {
    children: ReactNode
}

export const GameProvider = ({ children }: GameProviderProps) => {
    const [state, dispatch] = useReducer(gameReducer, initialState)

    return (
        <GameDispatchContext.Provider value={dispatch}>
            <GameStateContext.Provider value={state}>{children}</GameStateContext.Provider>
        </GameDispatchContext.Provider>
    )
}
