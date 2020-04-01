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
                margin: 25 / 2,
                width: 25,
                height: 25,
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
                margin: 25 / 2,
                width: 25,
                height: 25,
                backgroundColor: 'blue',
                borderRadius: 5,
            }}
        />
    ),
})
