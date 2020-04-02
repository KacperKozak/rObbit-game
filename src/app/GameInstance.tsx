import React, { Suspense } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { Color, PCFSoftShadowMap } from 'three'
import { useGame } from '../hooks/useGame'
import { getDefinition } from '../objects/objects'
import { DebugView } from './DebugView'

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
                <Suspense
                    fallback={
                        <mesh>
                            <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
                            <meshStandardMaterial attach="material" color="red" />
                        </mesh>
                    }
                >
                    {/* position={[tile.xy[0] * 1.1, 0, tile.xy[1] * 1.1]}  */}
                    {map.tiles.map(tile => {
                        const { Component3d } = getDefinition(tile.type)
                        return (
                            <group position={[tile.xy[0], 0, tile.xy[1]]} key={tile.id}>
                                <Component3d />
                            </group>
                        )
                    })}
                    {map.props.map(prop => {
                        const { Component3d } = getDefinition(prop.type)
                        return (
                            <group position={[prop.xy[0], 0, prop.xy[1]]} key={prop.id}>
                                <Component3d />
                            </group>
                        )
                    })}
                </Suspense>
            </Canvas>
        </>
    )
}
