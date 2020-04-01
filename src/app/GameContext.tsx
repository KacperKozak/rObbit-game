import React, { createContext, ReactNode, useContext } from 'react'
import { createMap } from '../mocks/mapMock'
import { Game } from '../types/types'

const gameObjMock: Game = {
    map: createMap(),
}

export const GameContext = createContext<Game>(gameObjMock)

interface GameProviderProps {
    children: ReactNode
}

export const GameProvider = ({ children }: GameProviderProps) => {
    return <GameContext.Provider value={gameObjMock}>{children}</GameContext.Provider>
}

export const useGame = () => {
    const context = useContext(GameContext)
    return context
}
