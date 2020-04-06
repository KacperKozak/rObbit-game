import { useSelector } from 'react-redux'
import { LocalStateAware } from '../state/localReducer'
import { maps } from '../data/maps'

export const useLocal = () => {
    const local = useSelector((state: LocalStateAware) => state.local)
    const isCompleted = (mapId: string) => local.completedMaps.includes(mapId)

    const allCompeted = maps.every(m => local.completedMaps.includes(m.id))

    return { isCompleted, allCompeted }
}
