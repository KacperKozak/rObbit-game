import React, { Suspense } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { Color, PCFSoftShadowMap } from 'three'
import { useGame } from '../hooks/useGame'
import { getDefinition } from '../objects/definitions'
import { DebugView } from './DebugView'
import { play } from '../audio/play'
import { Environment } from './Environment'

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
                <Environment />
                <Suspense
                    fallback={
                        <mesh>
                            <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
                            <meshStandardMaterial attach="material" color="red" />
                        </mesh>
                    }
                >
                    {/* position={[tile.xy[0] * 1.1, 0, tile.xy[1] * 1.1]}  */}
                    {map.objects.map(({ type, id, xy }) => {
                        const { Component3d } = getDefinition(type)
                        return <Component3d xy={xy} rotation={0} elevation={0} key={id} />
                    })}
                </Suspense>
            </Canvas>
        </>
    )
}
