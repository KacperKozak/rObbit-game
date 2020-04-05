import React from 'react'
import { Dialog } from '../components/Dialog'
import { maps } from '../data/maps'
import { useEditor } from '../hooks/useEditor'
import { useGame } from '../hooks/useGame'
import { useKeyboardEvent } from '../hooks/useKeyboardEvent'
import { DOWN, LEFT, RIGHT, UP } from '../types/consts'
import { DebugView } from './DebugView'

export const Menu = () => {
    const {
        objects,
        winDialog,
        mapId,
        mapName,
        move,
        equip,
        grapple,
        fire,
        loadMap,
        unloadMap,
        reset,
    } = useGame()
    const { editMode, toggleEditMode } = useEditor()

    // useEffect(() => {
    //     const KEY = 'lastMapId'
    //     if (mapId) {
    //         localStorage.setItem(KEY, mapId)
    //     } else {
    //         const lastMapId = localStorage.getItem(KEY)
    //         const lastMap = maps.find(map => map.id === lastMapId)
    //         lastMap && loadMap(lastMap)
    //     }
    // }, [mapId])

    useKeyboardEvent('e', toggleEditMode, [editMode])

    const left = () => move(LEFT)
    const up = () => move(UP)
    const down = () => move(DOWN)
    const right = () => move(RIGHT)

    useKeyboardEvent('r', reset)

    useKeyboardEvent('left', left, [left])
    useKeyboardEvent('up', up, [up])
    useKeyboardEvent('down', down, [down])
    useKeyboardEvent('right', right, [right])
    useKeyboardEvent('enter', equip, [equip])
    useKeyboardEvent('shift', grapple, [grapple])
    useKeyboardEvent('space', fire, [fire])

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
                {mapId && (
                    <button onClick={unloadMap}>
                        <strong>Exit</strong>
                    </button>
                )}
                {!mapId &&
                    maps.map(map => (
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
            {mapId && (
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
            )}
            {winDialog && (
                <Dialog>
                    <h1>Win!</h1>
                    <button onClick={reset}>Next map</button>
                </Dialog>
            )}
        </>
    )
}
