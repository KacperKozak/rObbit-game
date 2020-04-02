import { uniqueId } from 'lodash'
import { MoveAction, Vector2, RemoveAction } from '../types/types'

export const moveAction = (targetId: string, vector: Vector2): MoveAction => ({
    type: 'move',
    id: uniqueId('move'),
    targetId,
    vector,
})

export const removeAction = (targetId: string): RemoveAction => ({
    type: 'remove',
    id: uniqueId('remove'),
    targetId,
})
