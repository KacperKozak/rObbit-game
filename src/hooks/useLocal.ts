import { useSelector } from 'react-redux'
import { LocalStateAware } from '../state/localReducer'

export const useLocal = () => {
    const state = useSelector((state: LocalStateAware) => state.local)
    const isCompleted = (mapId: string) => state.completedMaps.includes(mapId)

    return { isCompleted }
}
