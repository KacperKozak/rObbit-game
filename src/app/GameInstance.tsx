import React from 'react'
import { Canvas } from 'react-three-fiber'
import { DebugView } from './DebugView'
import { useGame } from '../hooks/useGame'
import { Tile } from '../objects/Tail'
import { Vector3 } from 'three'
export const GameInstance = () => {
    const { map } = useGame()

    return (
        <>
            <DebugView map={map} />
            <Canvas
                orthographic
                camera={{ zoom: 100, fov: 1075, position: [-3 + 3, 5, 5 + 2] }}
                onCreated={({ camera }) => {
                    camera.lookAt(3, 0, 2)
                }}
            >
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
