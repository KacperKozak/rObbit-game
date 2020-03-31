import { PlayerObject, PropObject, XYZ, Vector2 } from '../types/types'
import React from 'react'

export const propObject = (xyz: XYZ, rotation: Vector2): PropObject => ({
    id: Math.random().toString(),
    xyz,
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

export const playerObject = (xyz: XYZ, rotation: Vector2): PlayerObject => ({
    id: Math.random().toString(),
    xyz,
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
