import { findById } from '../../helpers'
import { Vector2 } from '../../types/types'
import { ResolverResults } from '../types'
import { GameState } from '../gameReducer'

export const rotateResolver = (
    { objects }: GameState,
    targetId: string,
    rotation: Vector2,
): ResolverResults => {
    const target = findById(objects, targetId)

    return {
        objects: objects.map(obj => {
            if (obj !== target) return obj
            return { ...obj, rotation }
        }),
        actions: [],
    }
}
