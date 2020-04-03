import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { gameEpics } from './gameEpics'
import { gameReducer } from './gameReducer'
import { soundEpics } from './soundEpics'

const epicMiddleware = createEpicMiddleware()

const composeEnhancers = composeWithDevTools({
    name: 'App',
})

const rootReducer = combineReducers({
    game: gameReducer,
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)))

epicMiddleware.run(combineEpics(soundEpics, gameEpics))
