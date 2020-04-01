import React from 'react'
import { DOWN, LEFT, PLAYER_ID, RIGHT, UP } from '../types/consts'
import { GameMap } from '../types/types'
import { useGame } from './GameContext'

interface DebugViewProps {
    map: GameMap
}

const size = 50

export const DebugView = ({ map }: DebugViewProps) => {
    const { move } = useGame()

    return (
        <div style={{ position: 'absolute', top: 0, right: 0, width: size * 8 }}>
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
                }
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
