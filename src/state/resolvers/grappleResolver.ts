import { uniqueId } from 'lodash'
import { Action } from 'redux'
import {
    GRAPPLE_ELEVATION,
    PROJECTILE_ELEVATION,
    GRAPPLE_MOVE_DELAY,
    GRAPPLE_RANGE,
} from '../../config'
import { applyVector, asArray, findById, findByXY, vectorDiff } from '../../helpers'
import { getDefinition } from '../../objects/definitions'
import { ObjectInstance, ObjectTypes, Vector2 } from '../../types/types'
import { GameState, move, tmpSpawn, updateObject } from '../gameReducer'
import { ResolverResults } from './types'

export const grappleResolver = (state: GameState, targetId: string): ResolverResults => {
    let objects = state.objects
    const actions: Action[] = []
    const addActions = (a: Action | Action[] = []) => actions.push(...asArray(a))
    const abortResults = { objects, actions }

    const target = findById(objects, targetId)

    if (!target) {
        console.warn(`[grappleResolver] Target ${targetId} not found`)
        return abortResults
    }

    const projectileInstance: ObjectInstance = {
        type: ObjectTypes.CrossbowProjectile,
        id: uniqueId(),
        xy: target.xy,
        rotation: target.rotation,
        elevation: target.elevation + PROJECTILE_ELEVATION,
        aIndex: 100,
        zIndex: 10,
        data: {},
    }

    const vector = target.rotation
    let xy = target.xy

    let limit = GRAPPLE_RANGE

    while (limit) {
        limit--

        const prevXY = xy
        xy = applyVector(xy, vector)
        const newXYObjects = findByXY(objects, xy).sort((a, b) => b.aIndex - a.aIndex)

        for (const obj of newXYObjects) {
            if (isTooHight(obj, target)) {
                addActions(tmpSpawn({ instance: projectileInstance }))
                addActions(
                    updateObject(
                        { targetId: projectileInstance.id, objectValues: { xy } },
                        { delay: GRAPPLE_MOVE_DELAY },
                    ),
                )
                addActions(
                    move({
                        targetId,
                        vector: vectorDiff(target.xy, prevXY),
                    }),
                )

                return { objects, actions }
            }
        }
    }

    return abortResults
}

const isTooHight = (ontoObj: ObjectInstance, flyer: ObjectInstance) => {
    const objDef = getDefinition(ontoObj.type)
    return ontoObj.elevation + objDef.height(ontoObj) > flyer.elevation + GRAPPLE_ELEVATION
}
