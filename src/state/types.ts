import { Action } from 'redux'
import { ObjectInstance } from '../types/types'

export interface ResolverResults {
    objects: ObjectInstance[]
    actions: Action[]
}
