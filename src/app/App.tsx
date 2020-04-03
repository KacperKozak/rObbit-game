import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../state/store'
import { GameInstance } from './GameInstance'

export const App = () => {
    return (
        <Provider store={store}>
            <GameInstance />
        </Provider>
    )
}
