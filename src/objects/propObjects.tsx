import { PlayerObject, BaseObject, XY, Vector2 } from '../types/types'
import { PLAYER_ID } from '../types/consts'
import React from 'react'
import { Player } from './models/Items'

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
                backgroundColor: 'brown',
                borderRadius: 5,
            }}
        />
    ),
    Component3d: () => (
        <mesh castShadow>
            <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial attach="material" color="brown" />
        </mesh>
    ),
})

export const playerObject = (xyz: XY, rotation: Vector2): PlayerObject => ({
    id: PLAYER_ID,
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
                backgroundColor: 'white',
                borderRadius: 5,
            }}
        />
    ),
    Component3d: () => <Player color="white" />,
})
