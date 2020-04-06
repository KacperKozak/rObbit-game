import React, { Suspense } from 'react'
import { Canvas, Dom } from 'react-three-fiber'
import styled from 'styled-components'
import { PCFSoftShadowMap } from 'three'
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
                        if (scene.gl?.shadowMap) {
                            scene.gl.shadowMap.type = PCFSoftShadowMap
                            scene.gl.shadowMap.enabled = true
                        }
                    }}
                >
                    <group>
                        <Environment objectsList={objects} mapId={mapId} />
                        <Suspense
                            fallback={
                                <Dom>
                                    <Loading>
                                        <span>Loading</span>
                                    </Loading>
                                </Dom>
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

const Loading = styled.div`
    width: 50vw;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 34px;
`
