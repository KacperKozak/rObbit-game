import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { applyVector, asArray } from '../helpers'
import { createMap } from '../mocks/mapMock'
import { GameMap, Vector2 } from '../types/types'
import { Action } from 'redux'

export interface GameState {
    queueStared: boolean
    queue: Action[]
    map: GameMap
}

export interface GameStateAware {
    game: GameState
}

export const initialState: GameState = {
    queueStared: false,
    queue: [],
    map: createMap(),
}

const action = actionCreatorFactory('GAME')

export const enqueue = action<Action | Action[]>('ENQUEUE')
export const tryNextAction = action('TRY_NEXT_ACTION')
export const nextAction = action<Action>('NEXT_ACTION')
export const queueEnd = action('QUEUE_END')

export const move = action<{ targetId: string; vector: Vector2 }>('MOVE')
export const remove = action<string>('REMOVE')

export const gameReducer = reducerWithInitialState(initialState)
    .case(
        enqueue,
        (state, action): GameState => ({
            ...state,
            queue: [...state.queue, ...asArray(action)],
        }),
    )
    .case(
        nextAction,
        (state, action): GameState => ({
            ...state,
            queueStared: true,
            queue: state.queue.filter(a => a !== action),
        }),
    )
    .case(queueEnd, (state): GameState => ({ ...state, queueStared: false }))
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
