import React from 'react'
import { reverse } from '../helpers'
import { BaseObject, Vector2, XY } from '../types/types'
import { Tile } from './Tail'

export const grass = (xyz: XY, rotation: Vector2): BaseObject => ({
    id: Math.random().toString(),
    xy: xyz,
    rotation,
    enter: () => [],
    leave: () => [],
    Component: () => <div style={{ width: 50, height: 50, backgroundColor: 'green' }} />,
    Component3d: () => <Tile />,
})

export const rock = (xyz: XY, rotation: Vector2): BaseObject => ({
    id: Math.random().toString(),
    xy: xyz,
    rotation,
    enter: (obj, vector) => [
        {
            type: 'move',
            id: Math.random().toString(),
            vector: reverse(vector) as Vector2,
        },
    ],
    leave: (obj, vector) => [],
    Component: () => <div style={{ width: 50, height: 50, backgroundColor: 'gray' }} />,
})
