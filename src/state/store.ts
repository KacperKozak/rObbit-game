import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import { gameReducer } from './gameReducer'

const epicMiddleware = createEpicMiddleware()

const composeEnhancers = composeWithDevTools({
    name: 'App',
})

const rootReducer = combineReducers({
    game: gameReducer,
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)))

// epicMiddleware.run(rootEpic)
