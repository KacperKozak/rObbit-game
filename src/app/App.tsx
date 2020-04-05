import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../state/store'
import { GameInstance } from './GameInstance'
import { Menu } from './Menu'

export const App = () => {
    return (
        <Provider store={store}>
            <GameInstance />
            <Menu />
        </Provider>
    )
}
