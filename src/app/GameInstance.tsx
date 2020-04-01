import React from 'react'
import { useGame } from './GameContext'

export const GameInstance = () => {
    const { map } = useGame()

    return (
        <div style={{ position: 'relative' }}>
            {map.tiles.map(tile => (
                <div
                    style={{
                        position: 'absolute',
                        left: tile.xy[0] * 100,
                        top: tile.xy[1] * 100,
                        width: 100,
                        height: 100,
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
                        left: prop.xy[0] * 100,
                        top: prop.xy[1] * 100,
                        width: 100,
                        height: 100,
                    }}
                >
                    <prop.Component />
                </div>
            ))}
        </div>
    )
}
