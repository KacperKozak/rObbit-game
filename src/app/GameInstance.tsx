import React from 'react'
import { Canvas } from 'react-three-fiber'
import { DebugView } from './DebugView'
import { useGame } from '../hooks/useGame'
import { Tile } from '../objects/Tail'
export const GameInstance = () => {
    const { map } = useGame()

    return (
        <>
            <DebugView map={map} />
            <Canvas camera={{ fov: 75, position: [-2, 8, 3] }}>
                <ambientLight />
                <pointLight position={[5, 5, 5]} />
                <mesh scale={[1, 1, 1]} position={[2, 5, 5]}>
                    <sphereBufferGeometry attach="geometry" args={[0.5, 6, 6]} />
                    <meshStandardMaterial attach="material" color={'orange'} />
                </mesh>
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
