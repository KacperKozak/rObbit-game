import { uniqueId } from 'lodash'
import React from 'react'
import { PLAYER_ID } from '../types/consts'
import { ObjectDefinition, ObjectTypes } from '../types/types'
import { Item, Player } from './models/Items'

export const propTypeDefinitions: Partial<Record<ObjectTypes, ObjectDefinition>> = {
    [ObjectTypes.Player]: {
        getId: () => PLAYER_ID,
        canEnter: () => true,
        Component: () => (
            <div
                style={{
                    margin: 25 / 2,
                    width: 25,
                    height: 25,
                    backgroundColor: 'white',
                    borderRadius: 5,
                }}
            />
        ),
        Component3d: Player,
    },
    [ObjectTypes.TestProp]: {
        getId: () => uniqueId('test-prop'),
        canEnter: () => true,
        enter: ({ self }) => [], // TODO [removeAction(self.id)],
        Component: () => (
            <div
                style={{
                    margin: 25 / 2,
                    width: 25,
                    height: 25,
                    backgroundColor: 'brown',
                    borderRadius: 5,
                }}
            />
        ),
        Component3d: Item,
    },
}
