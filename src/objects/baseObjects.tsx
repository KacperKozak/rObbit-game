import { uniqueId } from 'lodash'
import React from 'react'
import { reverseVector } from '../helpers'
import { moveAction } from '../state/actions'
import { BaseObject, Vector2, XY } from '../types/types'
import { Tile } from './Tail'

export const grass = (xyz: XY, rotation: Vector2): BaseObject => ({
    id: uniqueId('grass'),
    xy: xyz,
    rotation,
    enter: () => [],
    leave: () => [],
    Component: () => <div style={{ width: 50, height: 50, backgroundColor: 'green' }} />,
    Component3d: () => <Tile color="green" />,
})

export const rock = (xyz: XY, rotation: Vector2): BaseObject => ({
    id: uniqueId('rock'),
    xy: xyz,
    rotation,
    enter: (obj, vector) => [moveAction(obj.id, reverseVector(vector) as Vector2)],
    leave: (obj, vector) => [],
    Component: () => <div style={{ width: 50, height: 50, backgroundColor: 'gray' }} />,
    Component3d: () => <Tile color="gray" />,
})
