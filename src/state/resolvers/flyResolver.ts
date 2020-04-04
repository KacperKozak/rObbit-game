import { Action } from 'redux'
import { applyVector, asArray, findById, findByXY } from '../../helpers'
import { getDefinition } from '../../objects/definitions'
import { ActionEvent, ObjectInstance } from '../../types/types'
import { fly, GameState, remove } from '../gameReducer'
import { ResolverResults } from './types'

export const flyResolver = (state: GameState, targetId: string): ResolverResults => {
    let objects = state.objects
    const actions: Action[] = []
    const addActions = (a: Action | Action[] = []) => actions.push(...asArray(a))
    const abortResults = { objects, actions }

    const target = findById(objects, targetId)

    if (!target) {
        console.warn(`[move] Target ${targetId} not found`)
        return abortResults
    }

    const vector = target.rotation
    const newXY = applyVector(target.xy, vector)
    const newXYObjects = findByXY(objects, newXY).sort((a, b) => b.aIndex - a.aIndex)

    // TODO remove
    if (!newXYObjects.length) {
        return { objects, actions: [remove(targetId)] }
    }

    // // Can enter to this region?
    for (const obj of newXYObjects) {
        const objDef = getDefinition(obj.type)
        const event: ActionEvent = { who: target, vector, state, self: obj }

        if (isTooHight(obj, target)) {
            addActions(objDef.push?.(event))
            addActions(remove(targetId))
            return { objects, actions }
        }
    }

    objects = objects.map(obj => {
        if (obj !== target) return obj
        return { ...obj, xy: newXY }
    })

    addActions(fly({ targetId }))
    return { objects, actions }
}

const isTooHight = (ontoObj: ObjectInstance, flyer: ObjectInstance) => {
    const objDef = getDefinition(ontoObj.type)
    return ontoObj.elevation + objDef.height > flyer.elevation
}
