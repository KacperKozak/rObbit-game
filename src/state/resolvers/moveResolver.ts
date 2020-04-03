import { Action } from 'redux'
import { applyVector, asArray, findById, findByXY } from '../../helpers'
import { getDefinition } from '../../objects/definitions'
import { ActionEvent, Vector2, ObjectInstance } from '../../types/types'
import { GameState } from '../gameReducer'
import { ResolverResults } from './types'

const MAX_ELEVATION_DIFF = 0.5

export const moveResolver = (
    state: GameState,
    targetId: string,
    vector: Vector2,
): ResolverResults => {
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

    // Nothing there, don't go
    if (!newXYObjects.length) {
        return abortResults
    }

    // Can enter to this region?
    for (const obj of newXYObjects) {
        const objDef = getDefinition(obj.type)
        const event: ActionEvent = { who: target, vector, state, self: obj }

        if (obj.elevation + objDef.height - target.elevation > MAX_ELEVATION_DIFF) {
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
        return { ...obj, xy: newXY, elevation: maxElevation(newXYObjects) }
    })

    return { objects, actions }
}

const maxElevation = (objects: ObjectInstance[]): number =>
    Math.max(
        ...objects.map(obj => {
            const objDef = getDefinition(obj.type)
            return objDef.height + obj.elevation
        }),
    )
