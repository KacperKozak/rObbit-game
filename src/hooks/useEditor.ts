import { useDispatch } from 'react-redux'
import { updateObject } from '../state/gameReducer'
import { PLAYER_ID } from '../types/consts'
import { ObjectInstance } from '../types/types'
import { useState } from 'react'

export const useEditor = () => {
    // const state = useSelector((state: GameStateAware) => state.game)
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const edit = (targetId: string, objectValues: Partial<ObjectInstance>) => {
        dispatch(updateObject({ targetId, objectValues }))
    }

    return { edit, toggleEditMode, editMode }
}
