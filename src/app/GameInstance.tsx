import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { PCFSoftShadowMap } from 'three'
import { useGame } from '../hooks/useGame'
import { useKeyboardEvent } from '../hooks/useKeyboardEvent'
import { getDefinition } from '../objects/definitions'
import { DOWN, LEFT, RIGHT, UP } from '../types/consts'
import { DebugView } from './DebugView'
import { Environment } from './Environment'

export const GameInstance = () => {
    const { objects, move, equip } = useGame()

    const left = () => move(LEFT)
    const up = () => move(UP)
    const down = () => move(DOWN)
    const right = () => move(RIGHT)

    useKeyboardEvent('ArrowLeft', left)
    useKeyboardEvent('ArrowUp', up)
    useKeyboardEvent('ArrowDown', down)
    useKeyboardEvent('ArrowRight', right)
    useKeyboardEvent('Enter', equip)

    return (
        <>
            <DebugView objects={objects} />
            <div style={{ position: 'absolute' }}>
                <button onClick={left}>←</button>
                <button onClick={up}>↑</button>
                <button onClick={down}>↓</button>
                <button onClick={right}>→</button>
                <button onClick={equip}>equip</button>
            </div>
            <Canvas
                orthographic
                camera={{ zoom: 100, fov: 1075, position: [-2 + 3, 7, 5 + 2] }}
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
                    {objects.map(obj => {
                        const { Component3d } = getDefinition(obj.type)
                        return <Component3d key={obj.id} instance={obj} />
                    })}
                </Suspense>
            </Canvas>
        </>
    )
}
