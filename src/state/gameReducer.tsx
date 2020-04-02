import { applyVector } from '../helpers'
import { createMap } from '../mocks/mapMock'
import { Action, GameMap } from '../types/types'
import { play } from '../audio/play'

export interface GameState {
    map: GameMap
}

export const initialState: GameState = {
    map: createMap(),
}

export const gameReducer = (state: GameState, action: Action): GameState => {
    console.log('[gameReducer] action', action, state)

    switch (action.type) {
        case 'move': {
            return {
                ...state,
                map: {
                    ...state.map,
                    props: state.map.props.map(prop => {
                        play('engineStart', 0.01)
                        if (prop.id !== action.targetId) return prop
                        return { ...prop, xy: applyVector(prop.xy, action.vector) }
                    }),
                },
            }
        }

        case 'remove': {
            return {
                ...state,
                map: {
                    ...state.map,
                    props: state.map.props.filter(prop => prop.id !== action.targetId),
                },
            }
        }
    }

    console.warn('[gameReducer] Not handled action', action)
    return state
}
