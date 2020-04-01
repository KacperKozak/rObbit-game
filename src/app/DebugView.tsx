import React from 'react'
import { GameMap } from '../types/types'

interface DebugViewProps {
    map: GameMap
}

const size = 50

export const DebugView = ({ map }: DebugViewProps) => (
    <div style={{ position: 'absolute', top: 0, right: 0, width: size * 8 }}>
        {map.tiles.map(tile => (
            <div
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
)
