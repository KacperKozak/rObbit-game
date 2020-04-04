import { uniqueId } from 'lodash'
import { Action } from 'redux'
import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { PROJECTILE_ELEVATION } from '../config'
import { arrMerge, findById, findByXY } from '../helpers'
import { createMap } from '../mocks/mapMock'
import { getDefinition } from '../objects/definitions'
import {
    ActionEvent,
    ObjectInstance,
    ObjectInstanceData,
    ObjectTypes,
    Vector2,
    XY,
} from '../types/types'
import { flyResolver } from './resolvers/flyResolver'
import { moveResolver } from './resolvers/moveResolver'
import { rotateResolver } from './resolvers/rotateResolver'
import { ResolverResults } from './resolvers/types'

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

export const projectile = action<{ byId: string; xy: XY; vector: Vector2; elevation: number }>(
    'PROJECTILE',
)
export const fly = action<{ targetId: string }>('FLY')
export const hit = action<{ targetId: string; hitTargetId?: string }>('HIT')

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

    /*
     * Projectiles
     */
    .case(
        projectile,
        (state, { xy, vector, elevation, byId }): GameState => {
            const type = ObjectTypes.Projectile
            const objDef = getDefinition(type)
            const obj: ObjectInstance = {
                type,
                id: uniqueId(type),
                xy,
                rotation: vector,
                elevation: elevation + PROJECTILE_ELEVATION,
                aIndex: 100,
                zIndex: 10,
                data: {},
            }
            const objects = [...state.objects, obj]
            const actions: Action[] = [fly({ targetId: obj.id }, { delay: 400 })]
            const who = findById(state.objects, byId)!
            const event: ActionEvent = { who, vector: obj.rotation, state, self: obj }
            const hitActions = objDef.projectileLaunch?.(event) || []
            actions.push(...hitActions)

            return { ...state, objects, queue: arrMerge(state.queue, actions) }
        },
    )
    .case(
        fly,
        (state, { targetId }): GameState => {
            const { actions, objects } = flyResolver(state, targetId)
            return { ...state, objects, queue: arrMerge(state.queue, actions) }
        },
    )
    .case(
        hit,
        (state, { targetId, hitTargetId }): GameState => {
            const obj = findById(state.objects, targetId)
            // const who = findById(state.objects, hitTargetId)!

            const actions: Action[] = []
            if (obj) {
                const objDef = getDefinition(obj.type)
                //                                 ↓ replace with who // TODO
                const event: ActionEvent = { who: obj, vector: obj.rotation, state, self: obj }
                const hitActions = objDef.projectileHit?.(event) || []
                actions.push(...hitActions)
            }
            return { ...state, queue: arrMerge(state.queue, actions) }
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
