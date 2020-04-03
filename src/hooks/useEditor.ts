import { useDispatch } from 'react-redux'
import { updateObject } from '../state/gameReducer'
import { PLAYER_ID } from '../types/consts'
import { ObjectInstance } from '../types/types'

export const useEditor = () => {
    // const state = useSelector((state: GameStateAware) => state.game)
    const dispatch = useDispatch()

    const edit = (targetId: string, objectValues: Partial<ObjectInstance>) => {
        dispatch(updateObject({ targetId, objectValues }))
    }

    return { edit }
}
