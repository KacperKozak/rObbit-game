import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GameStateAware, updateObject, addObject, removeObject } from '../state/gameReducer'
import { ObjectInstance, ObjectTypes } from '../types/types'
import { uniqueId } from 'lodash'

export const useEditor = () => {
    const state = useSelector((state: GameStateAware) => state.game)
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const update = (targetId: string) => (objectValues: Partial<ObjectInstance>) => {
        dispatch(updateObject({ targetId, objectValues }))
    }

    const add = (partialInstance: Partial<ObjectInstance>) => {
        const { type = ObjectTypes.Grass, ...rest } = partialInstance

        const instance: ObjectInstance = {
            type,
            id: partialInstance.id || uniqueId(type + '-'),
            xy: [0, 0],
            rotation: [0, 0],
            zIndex: 0,
            aIndex: 0,
            data: {},
            elevation: 0,
            ...partialInstance,
        }

        dispatch(addObject(instance))
    }

    const remove = (targetId: string) => {
        dispatch(removeObject(targetId))
    }

    const copyMap = () => {
        const serializedMap = JSON.stringify(state.objects)

        navigator.clipboard.writeText(serializedMap).then(() => {
            console.log('Copied to clipboard')
        }, console.error)
    }

    return { update, add, remove, toggleEditMode, editMode, copyMap }
}
