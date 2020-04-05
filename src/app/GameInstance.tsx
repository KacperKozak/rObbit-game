import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { PCFSoftShadowMap } from 'three'
import { Dialog } from '../components/Dialog'
import { maps } from '../data/maps'
import { useGame } from '../hooks/useGame'
import { getDefinition } from '../objects/definitions'
import { Environment } from './Environment'

export const GameInstance = () => {
    const { objects, mapId } = useGame()

    if (!mapId) return null

    return (
        <>
            {mapId && (
                <Canvas
                    key={mapId}
                    camera={{
                        zoom: 20,
                    }}
                    onCreated={scene => {
                        scene.gl.shadowMap.type = PCFSoftShadowMap
                        scene.gl.shadowMap.enabled = true
                    }}
                >
                    <group>
                        <Environment objectsList={objects} mapId={mapId} />
                        <Suspense
                            fallback={
                                <mesh>
                                    <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
                                    <meshStandardMaterial attach="material" color="red" />
                                </mesh>
                            }
                        >
                            {objects.map(obj => {
                                const { Component3d } = getDefinition(obj.type)
                                return <Component3d key={obj.id} instance={obj} />
                            })}
                        </Suspense>
                    </group>
                </Canvas>
            )}
        </>
    )
}
