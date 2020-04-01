import React from 'react'
import { Canvas } from 'react-three-fiber'
import { DebugView } from './DebugView'
import { useGame } from './GameContext'
import { Tile } from './Tail'

export const GameInstance = () => {
    const { map } = useGame()

    return (
        <>
            <DebugView map={map} />
            <Canvas camera={{ fov: 75, position: [10, 10, 10] }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                {map.tiles.map(tile => (
                    <Tile position={[tile.xy[0] * 1.1, 0, tile.xy[1] * 1.1]} />
                ))}
            </Canvas>
        </>
    )
}
