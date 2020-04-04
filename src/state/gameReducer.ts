import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { arrMerge, findById, findByXY } from '../helpers'
import { createMap } from '../mocks/mapMock'
import {
    Vector2,
    ObjectInstance,
    ObjectInstanceData,
    ActionEvent,
    XY,
    ObjectTypes,
} from '../types/types'
import { Action } from 'redux'
import { rotateResolver } from './resolvers/rotateResolver'
import { moveResolver } from './resolvers/moveResolver'
import { ResolverResults } from './resolvers/types'
import { getDefinition } from '../objects/definitions'
import { uniqueId } from 'lodash'

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
export const rotate = action<{ targetId: string; rotation: Vector2 }>('ROTATE')
export const equip = action<{ targetId: string }>('EQUIP')
export const projectile = action<{ xy: XY; vector: Vector2; elevation: number }>('PROJECTILE')

export const updateObject = action<{
    targetId: string
    objectValues: Partial<ObjectInstance>
}>('UPDATE_OBJECT')
export const setObjectData = action<{
    targetId: string
    data: Partial<ObjectInstanceData>
}>('SET_OBJECT_DATA')
export const remove = action<string>('REMOVE')

export const gameReducer = reducerWithInitialState(initialState)
    /*
     * Queue
     */
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

    /*
     * User actions
     */
    .case(
        move,
        (state, { targetId, vector }): GameState => {
            const { actions, objects } = moveResolver(state, targetId, vector)
            return { ...state, objects, queue: arrMerge(state.queue, actions) }
        },
    )
    .case(
        rotate,
        (state, { targetId, rotation }): GameState => {
            const { actions, objects } = rotateResolver(state, targetId, rotation)
            return { ...state, objects, queue: arrMerge(state.queue, actions) }
        },
    )
    .case(
        equip,
        (state, { targetId }): GameState => {
            const { actions, objects } = equipResolver(state, targetId)
            return { ...state, objects, queue: arrMerge(state.queue, actions) }
        },
    )
    .case(
        projectile,
        (state, { xy, vector, elevation }): GameState => {
            const type = ObjectTypes.Projectile
            const projectileInstance: ObjectInstance = {
                type,
                id: uniqueId(type),
                xy,
                rotation: vector,
                elevation,
                aIndex: 0,
                zIndex: 10,
                data: {},
            }
            const objects = [...state.objects, projectileInstance]
            const actions = [
                move({
                    targetId: projectileInstance.id,
                    vector: vector.map(a => a * 3) as Vector2,
                }),
                remove(projectileInstance.id),
            ]
            return { ...state, objects, queue: arrMerge(state.queue, actions) }
        },
    )

    /*
     * Edit and internal actions
     */
    .case(
        setObjectData,
        (state, { targetId, data }): GameState => {
            const { actions, objects } = setObjectDataResolver(state, targetId, data)
            return { ...state, objects, queue: arrMerge(state.queue, actions) }
        },
    )
    .case(
        updateObject,
        (state, { targetId, objectValues }): GameState => {
            return {
                ...state,
                objects: state.objects.map(obj =>
                    obj.id === targetId ? { ...obj, ...objectValues } : obj,
                ),
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

export const equipResolver = (state: GameState, targetId: string): ResolverResults => {
    const actions: Action[] = []
    const target = findById(state.objects, targetId)
    if (!target) return { objects: state.objects, actions: [] }

    const myObjects = findByXY(state.objects, target.xy).sort((a, b) => b.aIndex - a.aIndex)

    for (const obj of myObjects) {
        const objDef = getDefinition(obj.type)
        const event: ActionEvent = { who: target, vector: [0, 0], state, self: obj }
        actions.push(...(objDef.equip?.(event) || []))
    }

    return {
        actions,
        objects: state.objects,
    }
}

export const setObjectDataResolver = (
    { objects }: GameState,
    targetId: string,
    data: Partial<ObjectInstanceData>,
): ResolverResults => {
    const target = findById(objects, targetId)

    return {
        objects: objects.map(obj => {
            if (obj !== target) return obj
            return { ...obj, data: { ...obj.data, ...data } }
        }),
        actions: [],
    }
}
