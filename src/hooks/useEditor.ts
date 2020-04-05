import { uniqueId } from 'lodash'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomRotation } from '../helpers'
import {
    addObject,
    GameStateAware,
    removeObject,
    updateObject,
    updateCleanObjectsState,
} from '../state/gameReducer'
import { ObjectInstance, ObjectTypes } from '../types/types'

export const useEditor = () => {
    const state = useSelector((state: GameStateAware) => state.game)
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()

    const updateCleanState = () => dispatch(updateCleanObjectsState())

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const update = (targetId: string) => (objectValues: Partial<ObjectInstance>) => {
        dispatch(updateObject({ targetId, objectValues }))
        updateCleanState()
    }

    const add = (partialInstance: Partial<ObjectInstance>) => {
        const { type = ObjectTypes.Grass, ...rest } = partialInstance

        const instance: ObjectInstance = {
            type,
            id: partialInstance.id || uniqueId(type + '-') + `-${state.objects.length}`,
            xy: [0, 0],
            rotation: randomRotation(),
            zIndex: 0,
            aIndex: 0,
            data: {},
            elevation: 0,
            ...partialInstance,
        }

        dispatch(addObject(instance))
        updateCleanState()
    }

    const remove = (targetId: string) => {
        dispatch(removeObject(targetId))
        updateCleanState()
    }

    const copyMap = () => {
        const serializedMap = JSON.stringify(state.objects)

        navigator.clipboard.writeText(serializedMap).then(() => {
            console.log('Copied to clipboard')
        }, console.error)
    }

    return { update, add, remove, toggleEditMode, editMode, copyMap }
}
