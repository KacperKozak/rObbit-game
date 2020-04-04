import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GameStateAware, updateObject } from '../state/gameReducer'
import { ObjectInstance } from '../types/types'

export const useEditor = () => {
    const state = useSelector((state: GameStateAware) => state.game)
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const edit = (targetId: string, objectValues: Partial<ObjectInstance>) => {
        dispatch(updateObject({ targetId, objectValues }))
    }

    const copyMap = () => {
        const serializedMap = JSON.stringify(state.objects)

        navigator.clipboard.writeText(serializedMap).then(() => {
            console.log('Copied to clipboard')
        }, console.error)
    }

    return { edit, toggleEditMode, editMode, copyMap }
}
