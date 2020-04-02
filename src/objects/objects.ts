import { ObjectDefinition, ObjectTypes } from '../types/types'
import { tileTypeDefinitions } from './baseObjects'
import { propTypeDefinitions } from './propObjects'

const objectDefinitions: Partial<Record<ObjectTypes, ObjectDefinition>> = {
    ...tileTypeDefinitions,
    ...propTypeDefinitions,
}

export const getDefinition = (type: ObjectTypes): ObjectDefinition => {
    const def = objectDefinitions[type]

    if (!def) throw new Error(`[getDefinition] Definition for ${type} not found`)

    return def
}
