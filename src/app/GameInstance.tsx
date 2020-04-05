import React, { Suspense, useEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import { PCFSoftShadowMap } from 'three'
import { maps } from '../data/maps'
import { useEditor } from '../hooks/useEditor'
import { useGame } from '../hooks/useGame'
import { useKeyboardEvent } from '../hooks/useKeyboardEvent'
import { getDefinition } from '../objects/definitions'
import { DOWN, LEFT, RIGHT, UP } from '../types/consts'
import { DebugView } from './DebugView'
import { Environment } from './Environment'

export const GameInstance = () => {
    const { objects, mapId, mapName, move, equip, grapple, fire, loadMap, reset } = useGame()
    const { editMode, toggleEditMode } = useEditor()

    useEffect(() => {
        const KEY = 'lastMapId'
        console.log('mapId', mapId)
        if (mapId) {
            localStorage.setItem(KEY, mapId)
        } else {
            const lastMapId = localStorage.getItem(KEY)
            console.log('lastMapId', lastMapId)
            const lastMap = maps.find(map => map.id === lastMapId)
            lastMap && loadMap(lastMap)
        }
    }, [mapId])

    useKeyboardEvent('e', toggleEditMode)

    const left = () => move(LEFT)
    const up = () => move(UP)
    const down = () => move(DOWN)
    const right = () => move(RIGHT)

    useKeyboardEvent('r', reset)

    useKeyboardEvent('ArrowLeft', left)
    useKeyboardEvent('ArrowUp', up)
    useKeyboardEvent('ArrowDown', down)
    useKeyboardEvent('ArrowRight', right)
    useKeyboardEvent('Enter', equip)
    useKeyboardEvent('Shift', grapple)
    useKeyboardEvent(' ', fire)

    let mapCenter = [0, 0]
    objects.forEach(el => {
        if (el.xy[0] > mapCenter[0]) mapCenter[0] = el.xy[0]
        if (el.xy[1] > mapCenter[1]) mapCenter[1] = el.xy[0]
    })
    mapCenter = mapCenter.map(el => el / 2)

    return (
        <>
            {editMode && <DebugView objects={objects} />}
            <div
                style={{
                    position: 'absolute',
                    zIndex: 5,
                    top: 0,
                    left: 0,
                }}
            >
                {maps.map(map => (
                    <button key={map.id} onClick={() => loadMap(map)}>
                        Map {map.name}
                    </button>
                ))}
            </div>
            {mapName && (
                <div
                    style={{
                        position: 'absolute',
                        zIndex: 5,
                        top: 0,
                        right: 10,
                    }}
                >
                    <h1>Map: {mapName}</h1>
                </div>
            )}
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
                    Equip <small>{`[enter]`}</small>
                </button>
                <button onClick={grapple}>
                    Grapple <small>{`[shift]`}</small>
                </button>
                <button onClick={fire}>
                    Fire <small>{'[space]'}</small>
                </button>
                <button onClick={reset}>
                    Restart <small>{`[R]`}</small>
                </button>
            </div>
            {mapId && (
                <Canvas
                    // orthographic
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
