import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import { gameReducer } from './gameReducer'
import { gameEpics } from './gameEpics'

const epicMiddleware = createEpicMiddleware()

const composeEnhancers = composeWithDevTools({
    name: 'App',
})

const rootReducer = combineReducers({
    game: gameReducer,
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)))

epicMiddleware.run(gameEpics as any)
