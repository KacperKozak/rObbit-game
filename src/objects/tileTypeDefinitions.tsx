import { limitVector } from '../helpers'
import { lose, move } from '../state/gameReducer'
import { PLAYER_ID } from '../types/consts'
import { ObjectDefinition, ObjectTypes } from '../types/types'
import { Grass, Ground, Ice, Wall, Water } from './models/Items'

export const tileTypeDefinitions: Partial<Record<ObjectTypes, ObjectDefinition>> = {
    [ObjectTypes.Grass]: {
        name: 'Grass',
        height: () => 0,
        Component3d: Grass,
    },
    [ObjectTypes.Water]: {
        name: 'Water',
        height: () => -1,
        enter: ({ who, self }) => {
            console.log('who.elevation: ' + who.elevation + '; self.elevation: ' + self.elevation)
            return who.id === PLAYER_ID && self.elevation - 0.2 > who.elevation ? [lose()] : []
            // return []
        },
        Component3d: Water,
    },

    [ObjectTypes.Ice]: {
        name: 'Ice',
        height: () => 0,
        enter: ({ who, vector }) => [
            move({ targetId: who.id, vector: limitVector(vector, -1, 1) }),
        ],
        Component3d: Ice,
    },
    [ObjectTypes.RockFloor]: {
        name: 'Rock floor',
        height: () => 0,
        Component3d: Ground,
    },
    [ObjectTypes.Wall]: {
        name: 'Wall',
        height: () => 0,
        Component3d: Wall,
    },
}
