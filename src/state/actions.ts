import { uniqueId } from 'lodash'
import { MoveAction, Vector2 } from '../types/types'

export const moveAction = (targetId: string, vector: Vector2): MoveAction => ({
    type: 'move',
    id: uniqueId('move'),
    targetId,
    vector,
})
