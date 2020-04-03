import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { applyVector, asArray, findById, findByXY, arrMerge } from '../helpers'
import { createMap } from '../mocks/mapMock'
import { Vector2, ObjectInstance, ActionEvent } from '../types/types'
import { Action } from 'redux'
import { getDefinition } from '../objects/definitions'

export interface GameState {
    queueStared: boolean
    queue: Action[]
    objects: ObjectInstance[]
}

export interface GameStateAware {
    game: GameState
}

export const initialState: GameState = {
    queueStared: false,
    queue: [],
    objects: createMap(),
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
            queue: arrMerge(state.queue, action),
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
        (state, { targetId, vector }): GameState => {
            const { actions, objects } = moveResolver(state, targetId, vector)
            return {
                ...state,
                queue: arrMerge(state.queue, actions),
                objects,
            }
        },
    )
    .case(
        remove,
        (state, targetId): GameState => ({
            ...state,
            objects: state.objects.filter(obj => obj.id !== targetId),
        }),
    )

interface ResolverResults {
    objects: ObjectInstance[]
    actions: Action[]
}

const moveResolver = (state: GameState, targetId: string, vector: Vector2): ResolverResults => {
    let objects = state.objects
    const actions: Action[] = []
    const addActions = (a: Action | Action[] = []) => actions.push(...asArray(a))
    const abortResults = { objects, actions }

    const target = findById(objects, targetId)

    if (!target) {
        console.warn(`[move] Target ${targetId} not found`)
        return abortResults
    }

    const newXY = applyVector(target.xy, vector)
    const newXYObjects = findByXY(objects, newXY).sort((a, b) => b.aIndex - a.aIndex)

    // Can enter to this region?
    for (const obj of newXYObjects) {
        const objDef = getDefinition(obj.type)
        const event: ActionEvent = { who: target, vector, state, self: obj }
        if (!objDef.canEnter(event)) {
            addActions(objDef.push?.(event))
            return { objects, actions }
        }
    }

    // Post enter events
    for (const obj of newXYObjects) {
        const objDef = getDefinition(obj.type)
        const event: ActionEvent = { who: target, vector, state, self: obj }
        addActions(objDef.enter?.(event))
    }

    objects = objects.map(obj => {
        if (obj !== target) return obj
        return { ...obj, xy: newXY }
    })

    return { objects, actions }
}
