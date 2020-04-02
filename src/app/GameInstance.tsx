import React from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { DebugView } from './DebugView'
import { useGame } from '../hooks/useGame'
import { Tile } from '../objects/models/Tail'
import { Color, PCFSoftShadowMap } from 'three'

export const GameInstance = () => {
    const { map } = useGame()
    const { gl } = useThree()

    return (
        <>
            <DebugView map={map} />
            <Canvas
                orthographic
                camera={{ zoom: 100, fov: 1075, position: [-3 + 3, 5, 5 + 2] }}
                onCreated={scene => {
                    scene.camera.lookAt(3, 0, 2)
                    console.log(scene)
                    scene.gl.shadowMap.type = PCFSoftShadowMap
                    scene.gl.shadowMap.enabled = true
                }}
            >
                <ambientLight intensity={0.2} />
                <pointLight
                    position={[6, 7, 8]}
                    intensity={1.2}
                    color={new Color('#3a8dc2')}
                    castShadow
                />
                <pointLight
                    position={[1, 3, 5]}
                    intensity={1.2}
                    color={new Color('#c86b6f')}
                    castShadow
                />
                {/* position={[tile.xy[0] * 1.1, 0, tile.xy[1] * 1.1]}  */}
                {map.tiles.map(tile => (
                    <group position={[tile.xy[0], 0, tile.xy[1]]} key={tile.id}>
                        <tile.Component3d />
                    </group>
                ))}
                {map.props.map(prop => (
                    <group position={[prop.xy[0], 0, prop.xy[1]]} key={prop.id}>
                        <prop.Component3d />
                    </group>
                ))}
                }
            </Canvas>
        </>
    )
}
