import { Action } from 'redux'
import { MAX_ELEVATION_DIFF, FALL_REMOVE_DELAY, FALL_TRIGGER_DELAY } from '../../config'
import { applyVector, asArray, findById, findByXY } from '../../helpers'
import { getDefinition } from '../../objects/definitions'
import { PLAYER_ID } from '../../types/consts'
import { ActionEvent, ObjectInstance, Vector2 } from '../../types/types'
import { enqueueAfter, GameState, lose, remove, fall } from '../gameReducer'
import { ResolverResults } from './types'

export const moveResolver = (
    state: GameState,
    targetId: string,
    vector: Vector2,
): ResolverResults => {
    let objects = state.objects
    const actions: Action[] = []
    const addActions = (a: Action | Action[] = []) => actions.push(...asArray(a))

    const target = findById(objects, targetId)

    if (!target) {
        console.warn(`[move] Target ${targetId} not found`)
        return { objects, actions }
    }

    const newXY = applyVector(target.xy, vector)
    const newXYObjects = findByXY(objects, newXY).sort((a, b) => b.aIndex - a.aIndex)

    // Nothing there, fall and die
    if (!newXYObjects.length) {
        const fallObjects = objects.map(obj => {
            if (obj !== target) return obj
            return { ...obj, xy: newXY }
        })
        addActions([
            enqueueAfter({
                timeout: FALL_TRIGGER_DELAY,
                actions: [fall({ targetId })],
            }),
            enqueueAfter({
                timeout: FALL_REMOVE_DELAY,
                actions: [targetId === PLAYER_ID ? lose() : remove(targetId)],
            }),
        ])
        return { objects: fallObjects, actions }
    }

    // Can enter to this region?
    for (const obj of newXYObjects) {
        const objDef = getDefinition(obj.type)
        const event: ActionEvent = { who: target, vector, state, self: obj }

        if (isTooHight(obj, target)) {
            addActions(objDef.push?.(event))
            return { objects, actions }
        }
    }

    // Move target to new location
    objects = objects.map(obj => {
        if (obj !== target) return obj
        return { ...obj, xy: newXY, elevation: maxElevation(newXYObjects) }
    })

    // Post enter events
    for (const obj of newXYObjects) {
        const objDef = getDefinition(obj.type)
        const event: ActionEvent = { who: target, vector, state, self: obj }
        addActions(objDef.enter?.(event))
    }

    return { objects, actions }
}

const maxElevation = (objects: ObjectInstance[]): number =>
    Math.max(
        ...objects.map(obj => {
            const objDef = getDefinition(obj.type)
            return objDef.height(obj) + obj.elevation
        }),
    )

const isTooHight = (ontoObj: ObjectInstance, who: ObjectInstance) => {
    const objDef = getDefinition(ontoObj.type)
    return ontoObj.elevation + objDef.height(ontoObj) - who.elevation > MAX_ELEVATION_DIFF
}
