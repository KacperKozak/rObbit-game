import { uniq } from 'lodash'
import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

export interface LocalState {
    completedMaps: string[]
}

export interface LocalStateAware {
    local: LocalState
}

export const initialState: LocalState = {
    completedMaps: [],
}

const action = actionCreatorFactory('LOCAL')
export const addCompletedMap = action<string>('COMPLETE_MAP')

export const localReducer = reducerWithInitialState(initialState).case(
    addCompletedMap,
    (state, mapId): LocalState => ({
        ...state,
        completedMaps: uniq([...state.completedMaps, mapId]),
    }),
)
