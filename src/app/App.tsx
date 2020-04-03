import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../state/store'
import { GameInstance } from './GameInstance'

export const App = () => {
    return (
        <Provider store={store}>
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
        </Provider>
    )
}
