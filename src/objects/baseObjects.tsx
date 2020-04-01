import React from 'react'
import { reverse } from '../helpers'
import { BaseObject, Vector2, XY } from '../types/types'

export const grass = (xyz: XY, rotation: Vector2): BaseObject => ({
    id: Math.random().toString(),
    xy: xyz,
    rotation,
    enter: () => [],
    leave: () => [],
    Component: () => <div style={{ width: 100, height: 100, backgroundColor: 'green' }} />,
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
    Component: () => <div style={{ width: 100, height: 100, backgroundColor: 'gray' }} />,
})
