import React from 'react'
import { useGame } from './GameContext'
import { Tile } from '../objects/Tail'
import { Canvas, useFrame } from 'react-three-fiber'

export const GameInstance = () => {
    const { map } = useGame()

    return (
        <>
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

            <Canvas camera={{ fov: 75, position: [10, 10, 10] }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                {map.tiles.map(tile => (
                    <Tile position={[tile.xy[0] * 1.1, 0, tile.xy[1] * 1.1]} />
                ))}
                {map.props.map(prop => (
                    <Tile position={[prop.xy[0] * 1.1, 2, prop.xy[1] * 1.1]} />
                ))}
                }
            </Canvas>
        </>
    )
}
