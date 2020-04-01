import { PlayerObject, BaseObject, XY, Vector2 } from '../types/types'
import React from 'react'

export const propObject = (xyz: XY, rotation: Vector2): BaseObject => ({
    id: Math.random().toString(),
    xy: xyz,
    rotation,
    enter: () => [],
    leave: () => [],
    Component: () => (
        <div
            style={{
                margin: 25,
                width: 50,
                height: 50,
                backgroundColor: 'red',
                borderRadius: 5,
            }}
        />
    ),
})

export const playerObject = (xyz: XY, rotation: Vector2): PlayerObject => ({
    id: Math.random().toString(),
    xy: xyz,
    rotation,
    attachments: [],
    enter: () => [],
    leave: () => [],
    Component: () => (
        <div
            style={{
                margin: 25,
                width: 50,
                height: 50,
                backgroundColor: 'blue',
                borderRadius: 5,
            }}
        />
    ),
})
