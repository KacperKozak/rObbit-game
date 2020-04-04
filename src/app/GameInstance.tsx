import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { PCFSoftShadowMap } from 'three'
import { useEditor } from '../hooks/useEditor'
import { useGame } from '../hooks/useGame'
import { useKeyboardEvent } from '../hooks/useKeyboardEvent'
import { getDefinition } from '../objects/definitions'
import { DOWN, LEFT, RIGHT, UP, PLAYER_ID } from '../types/consts'
import { DebugView } from './DebugView'
import { Environment } from './Environment'
import { findById } from '../helpers'

export const GameInstance = () => {
    const { objects, move, equip, fire, player } = useGame()

    const { editMode, toggleEditMode } = useEditor()
    useKeyboardEvent('e', toggleEditMode)

    const left = () => move(LEFT)
    const up = () => move(UP)
    const down = () => move(DOWN)
    const right = () => move(RIGHT)

    useKeyboardEvent('ArrowLeft', left)
    useKeyboardEvent('ArrowUp', up)
    useKeyboardEvent('ArrowDown', down)
    useKeyboardEvent('ArrowRight', right)
    useKeyboardEvent('Enter', equip)
    useKeyboardEvent(' ', fire)

    return (
        <>
            {editMode && <DebugView objects={objects} />}
            <div
                style={{
                    position: 'absolute',
                    zIndex: 5,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                }}
            >
                <button onClick={left}>
                    <strong>←</strong>
                </button>
                <button onClick={up}>
                    <strong>↑</strong>
                </button>
                <button onClick={down}>
                    <strong>↓</strong>
                </button>
                <button onClick={right}>
                    <strong>→</strong>
                </button>
                <button onClick={equip}>
                    equip <small>{`[enter]`}</small>
                </button>
                <button onClick={fire}>
                    fire <small>{'[space]'}</small>
                </button>
            </div>
            <Canvas
                orthographic
                camera={{ zoom: 100, fov: 1075, position: [-2 + 3, 7, 5 + 2] }}
                onCreated={scene => {
                    scene.camera.lookAt(3, 1, 2)
                    // scene.camera.lookAt(findById(objects, PLAYER_ID))
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
