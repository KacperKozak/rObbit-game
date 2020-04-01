import React from 'react'
import { GameProvider } from './GameContext'
import { GameInstance } from './GameInstance'

export const App = () => {
    return (
        <GameProvider>
            <div>
                <h1>alpha-mechanical</h1>
                <GameInstance />
            </div>
        </GameProvider>
    )
}
