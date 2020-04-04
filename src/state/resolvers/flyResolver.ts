import { Action } from 'redux'
import { applyVector, asArray, findById, findByXY } from '../../helpers'
import { getDefinition } from '../../objects/definitions'
import { ActionEvent, ObjectInstance } from '../../types/types'
import { GameState, flyEnd } from '../gameReducer'
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
    let xy = target.xy

    let limit = 15

    while (limit) {
        limit--

        xy = applyVector(xy, vector)
        const newXYObjects = findByXY(objects, xy).sort((a, b) => b.aIndex - a.aIndex)

        for (const obj of newXYObjects) {
            const objDef = getDefinition(obj.type)
            const event: ActionEvent = { who: target, vector, state, self: obj, force: 100 }

            if (isTooHight(obj, target)) {
                objects = objects.map(obj => {
                    if (obj !== target) return obj
                    return { ...obj, xy }
                })

                addActions(flyEnd({ targetId, hitTargetId: obj.id }))
                addActions(objDef.push?.(event))
                return { objects, actions }
            }
        }
    }

    addActions(flyEnd({ targetId }))

    objects = objects.map(obj => {
        if (obj !== target) return obj
        return { ...obj, xy }
    })

    return { objects, actions }
}

const isTooHight = (ontoObj: ObjectInstance, flyer: ObjectInstance) => {
    const objDef = getDefinition(ontoObj.type)
    return ontoObj.elevation + objDef.height > flyer.elevation
}
