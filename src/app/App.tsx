import React from 'react'
import { GameProvider } from './GameContext'
import { GameInstance } from './GameInstance'

export const App = () => {
    return (
        <GameProvider>
            <div>
                <h1
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        width: '300px',
                        background: 'rgba(0,0,0,0.2)',
                        margin: '0 auto',
                        borderRadius: '0 0 15px 15px',
                    }}
                >
                    alpha-mechanical
                </h1>
                <GameInstance />
            </div>
        </GameProvider>
    )
}
