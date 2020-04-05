import React from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from '../state/store'
import { GameInstance } from './GameInstance'
import { Menu } from './Menu'
import { PersistGate } from 'redux-persist/integration/react'

export const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GameInstance />
                <Menu />
            </PersistGate>
        </Provider>
    )
}
