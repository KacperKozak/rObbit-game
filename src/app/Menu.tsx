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
    const { player } = useGame()
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
    useKeyboardEvent('q', unloadMap)

    useKeyboardEvent('w', up, [up])
    useKeyboardEvent('s', down, [down])
    useKeyboardEvent('a', left, [left])
    useKeyboardEvent('d', right, [right])
    useKeyboardEvent('e', equip, [equip])
    useKeyboardEvent('f', grapple, [grapple])
    useKeyboardEvent('space', fire, [fire])

    useKeyboardEvent(
        '*',
        event => {
            const index = +event.key
            if (!Number.isNaN(index) && maps[index]) {
                loadMap(maps[index])
            }
        },
        [],
    )

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
                    <>
                        <button onClick={unloadMap}>
                            Exit
                            <small>{`[Q]`}</small>
                        </button>
                        <button onClick={reset}>
                            Restart <small>{`[R]`}</small>
                        </button>
                    </>
                )}
                {!mapId &&
                    maps.map(map => (
                        <button key={map.id} onClick={() => loadMap(map)}>
                            {map.name}
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
            {mapId && player && (
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
                        <small>{`[A]`}</small>
                    </button>
                    <button onClick={up}>
                        <strong>↑</strong>
                        <small>{`[W]`}</small>
                    </button>
                    <button onClick={down}>
                        <strong>↓</strong>
                        <small>{`[S]`}</small>
                    </button>
                    <button onClick={right}>
                        <strong>→</strong>
                        <small>{`[D]`}</small>
                    </button>
                    <button onClick={equip}>
                        Equip <small>{`[enter]`}</small>
                    </button>
                    {player.data.hasGrapple && (
                        <button onClick={grapple}>
                            Grapple <small>{`[shift]`}</small>
                        </button>
                    )}
                    {player.data.hasCannon && (
                        <button onClick={fire}>
                            Fire <small>{'[space]'}</small>
                        </button>
                    )}
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
