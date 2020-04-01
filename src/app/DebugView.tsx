import React, { useState } from 'react'
import { DOWN, LEFT, PLAYER_ID, RIGHT, UP } from '../types/consts'
import { GameMap } from '../types/types'
import { useGame } from '../hooks/useGame'
import { useKeyboardEvent } from '../hooks/useKeyboardEvent'

interface DebugViewProps {
    map: GameMap
}

const size = 50

export const DebugView = ({ map }: DebugViewProps) => {
    const { move } = useGame()

    useKeyboardEvent('ArrowLeft', () => move(PLAYER_ID, LEFT))
    useKeyboardEvent('ArrowUp', () => move(PLAYER_ID, UP))
    useKeyboardEvent('ArrowDown', () => move(PLAYER_ID, DOWN))
    useKeyboardEvent('ArrowRight', () => move(PLAYER_ID, RIGHT))

    return (
        <div style={{ position: 'absolute', zIndex: 100, top: 0, right: 0, width: size * 8 }}>
            <button onClick={() => move(PLAYER_ID, LEFT)}>←</button>
            <button onClick={() => move(PLAYER_ID, UP)}>↑</button>
            <button onClick={() => move(PLAYER_ID, DOWN)}>↓</button>
            <button onClick={() => move(PLAYER_ID, RIGHT)}>→</button>

            <div style={{ position: 'relative' }}>
                {map.tiles.map(tile => (
                    <div
                        key={tile.id}
                        style={{
                            position: 'absolute',
                            left: tile.xy[0] * size,
                            top: tile.xy[1] * size,
                            width: size,
                            height: size,
                        }}
                    >
                        <tile.Component />
                    </div>
                ))}

                {map.props.map(prop => (
                    <div
                        key={prop.id}
                        style={{
                            position: 'absolute',
                            left: prop.xy[0] * size,
                            top: prop.xy[1] * size,
                            width: size,
                            height: size,
                        }}
                    >
                        <prop.Component />
                    </div>
                ))}
            </div>
        </div>
    )
}
