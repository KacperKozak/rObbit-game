import { ObjectDefinition, ObjectTypes } from '../types/types'
import { tileTypeDefinitions } from './tileTypeDefinitions'
import { propTypeDefinitions } from './propTypeDefinitions'

export const objectDefinitions: Partial<Record<ObjectTypes, ObjectDefinition>> = {
    ...tileTypeDefinitions,
    ...propTypeDefinitions,
}

export const getDefinition = (type: ObjectTypes): ObjectDefinition => {
    const def = objectDefinitions[type]

    if (!def) throw new Error(`[getDefinition] Definition for ${type} not found`)

    return def
}
