import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { gameEpics } from './gameEpics'
import { gameReducer } from './gameReducer'
import { localReducer } from './localReducer'
import { soundEpics } from './soundEpics'

const epicMiddleware = createEpicMiddleware()

const composeEnhancers = composeWithDevTools({
    name: 'App',
})

const rootReducer = combineReducers({
    game: gameReducer,
    local: persistReducer({ key: 'local', storage }, localReducer),
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)))
export const persistor = persistStore(store)

epicMiddleware.run(combineEpics(soundEpics, gameEpics))
