import { createMap } from '../mocks/mapMock'
import { GameMap, Action } from '../types/types'

export interface GameState {
    map: GameMap
}

export const initialState: GameState = {
    map: createMap(),
}

export const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'move': {
            return {
                ...state,
                map: {
                    ...state.map,
                    props: state.map.props.map(prop => {
                        if (prop.id === action.id) return prop
                        return prop
                    }),
                },
            }
        }
    }
    console.warn('[GameContext] Not handled action', action)
    return state
}
