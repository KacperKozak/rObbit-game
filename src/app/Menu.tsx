import React from 'react'
import { Dialog } from '../components/Dialog'
import { maps } from '../data/maps'
import { useEditor } from '../hooks/useEditor'
import { useGame } from '../hooks/useGame'
import { useKeyboardEvent } from '../hooks/useKeyboardEvent'
import { DOWN, LEFT, RIGHT, UP } from '../types/consts'
import { DebugView } from './DebugView'
import styled from 'styled-components'

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

    const nextMap = () => {
        const currentIndex = maps.findIndex(m => m.id === mapId)
        const nextMap = maps[currentIndex + 1]
        if (nextMap) loadMap(nextMap)
        else unloadMap()
    }

    useKeyboardEvent('m', toggleEditMode, [editMode])

    const left = () => move(LEFT)
    const up = () => move(UP)
    const down = () => move(DOWN)
    const right = () => move(RIGHT)

    useKeyboardEvent('r', reset)
    useKeyboardEvent('q', unloadMap)
    useKeyboardEvent(winDialog && 'enter', nextMap, [winDialog])

    useKeyboardEvent('w', up, [up])
    useKeyboardEvent('s', down, [down])
    useKeyboardEvent('a', left, [left])
    useKeyboardEvent('d', right, [right])

    useKeyboardEvent('up', up, [up])
    useKeyboardEvent('down', down, [down])
    useKeyboardEvent('left', left, [left])
    useKeyboardEvent('right', right, [right])

    useKeyboardEvent('e', equip, [equip])
    useKeyboardEvent('f', grapple, [grapple])
    useKeyboardEvent('space', fire, [fire])

    useKeyboardEvent(
        '*',
        event => {
            const index = +event.key
            if (index && maps[index]) loadMap(maps[index])
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
                        <LevelButton key={map.id} onClick={() => loadMap(map)}>
                            {map.name}
                        </LevelButton>
                    ))}
            </div>
            {mapName && <MapName>Map: {mapName}</MapName>}
            {mapId && player && (
                <ControlsWrapper>
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
                        Equip <small>{`[E]`}</small>
                    </button>
                    {player.data.hasGrapple && (
                        <button onClick={grapple}>
                            Grapple <small>{`[F]`}</small>
                        </button>
                    )}
                    {player.data.hasCannon && (
                        <button onClick={fire}>
                            Fire <small>{'[SPACE]'}</small>
                        </button>
                    )}
                </ControlsWrapper>
            )}
            {winDialog && (
                <Dialog>
                    <h1>Win!</h1>
                    <button onClick={nextMap}>
                        Next map <small>[enter]</small>
                    </button>
                </Dialog>
            )}
        </>
    )
}

const LevelButton = styled.div`
    cursor: pointer;
    background: none;
    color: rgba(205, 236, 255, 0.726);
    font-size: 30px;
    border: 1px solid currentColor;
    padding: 20px 30px;
    margin: 4px;
    border-radius: 4px;
    text-transform: uppercase;
    display: inline-block;
    vertical-align: middle;
`

const MapName = styled.div`
    position: absolute;
    z-index: 5;
    top: 0;
    right: 0;
    padding: 5px 5px 0 0;
    font-size: 18px;
`

const ControlsWrapper = styled.div`
    position: absolute;
    z-index: 5;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
`
