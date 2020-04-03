import React, { Suspense } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { Color, PCFSoftShadowMap } from 'three'
import { useGame } from '../hooks/useGame'
import { getDefinition } from '../objects/definitions'
import { DebugView } from './DebugView'
import { play } from '../audio/play'
import { Environment } from './Environment'

export const GameInstance = () => {
    const { objects } = useGame()
    const { gl } = useThree()

    return (
        <>
            <DebugView objects={objects} />
            <Canvas
                orthographic
                camera={{ zoom: 100, fov: 1075, position: [-3 + 3, 5, 5 + 2] }}
                onCreated={scene => {
                    scene.camera.lookAt(3, 1, 2)
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
                    {objects.map(({ type, id, xy, elevation, rotation }) => {
                        const { Component3d } = getDefinition(type)
                        return (
                            <Component3d
                                xy={xy}
                                rotation={rotation}
                                elevation={elevation}
                                key={id}
                            />
                        )
                    })}
                </Suspense>
            </Canvas>
        </>
    )
}
