import { applyVector } from '../helpers'
import { createMap } from '../mocks/mapMock'
import { Action, GameMap, MoveAction, Vector2 } from '../types/types'
import { play } from '../audio/play'
import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

export interface GameState {
    map: GameMap
}

export interface GameStateAware {
    game: GameState
}

export const initialState: GameState = {
    map: createMap(),
}

const action = actionCreatorFactory('GAME')

interface MovePayload {
    targetId: string
    vector: Vector2
}

export const move = action<MovePayload>('MOVE')
export const remove = action<string>('REMOVE')

export const gameReducer = reducerWithInitialState(initialState)
    .case(
        move,
        (state, { targetId, vector }): GameState => ({
            ...state,
            map: {
                ...state.map,
                objects: state.map.objects.map(prop => {
                    if (prop.id !== targetId) return prop
                    return { ...prop, xy: applyVector(prop.xy, vector) }
                }),
            },
        }),
    )
    .case(
        remove,
        (state, targetId): GameState => ({
            ...state,
            map: {
                ...state.map,
                objects: state.map.objects.filter(prop => prop.id !== targetId),
            },
        }),
    )
