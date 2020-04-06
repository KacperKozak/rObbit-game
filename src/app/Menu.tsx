import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getAudio } from '../audio/play'
import { Button, ButtonBlock } from '../components/Button'
import { Dialog } from '../components/Dialog'
import {
    BTN_EQUIP,
    BTN_EXIT,
    BTN_FIRE,
    BTN_GRAPPLE,
    BTN_LEVEL,
    BTN_PLAY,
    BTN_RESTART,
    CONGRATULATIONS,
    GAME_NAME,
    IS_DEV,
    LEVEL_COMPLETE,
    NEXT_LEVEL,
} from '../config'
import { maps } from '../data/maps'
import { useEditor } from '../hooks/useEditor'
import { useGame } from '../hooks/useGame'
import { useKeyboardEvent } from '../hooks/useKeyboardEvent'
import { useLocal } from '../hooks/useLocal'
import { DOWN, LEFT, RIGHT, UP } from '../types/consts'
import { Authors } from './Authors'
import { DebugView } from './DebugView'
import { Video } from './intro/Video'

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
    const { isCompleted, allCompeted } = useLocal()

    const [introPlayed, setIntroPlayed] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)

    const [outroPlayed, setOutroPlayed] = useState(false)
    const [playingOutro, setPlayingOutro] = useState(false)

    useEffect(() => {
        if (allCompeted && !outroPlayed) {
            if (gameStarted) {
                setPlayingOutro(true)
                setOutroPlayed(true)
                unloadMap()
            } else {
                setOutroPlayed(true)
            }
        }
    }, [outroPlayed, playingOutro, allCompeted])

    const musicRef = useRef(getAudio('Music', 0.3))
    const droneRef = useRef(getAudio('Drone', 1))
    const playMusic = !mapId || winDialog

    useEffect(() => {
        if (!gameStarted || !introPlayed || playingOutro) {
            droneRef.current.pause()
            musicRef.current.pause()
            return
        }
        if (playMusic) {
            droneRef.current.pause()

            musicRef.current.currentTime = 0
            musicRef.current.play()
        } else {
            musicRef.current.pause()

            droneRef.current.currentTime = 0
            droneRef.current.play()

            const onEnd = () => droneRef.current.play()
            droneRef.current.addEventListener('ended', onEnd)
            return () => droneRef.current.removeEventListener('ended', onEnd)
        }
    }, [playMusic, gameStarted, introPlayed, playingOutro])

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

    useKeyboardEvent('r', reset, [mapId])
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
            {!introPlayed && gameStarted && (
                <Video video="intro" onEnded={() => setIntroPlayed(true)} />
            )}
            {playingOutro && <Video video="outro" onEnded={() => setPlayingOutro(false)} />}
            {!mapId && (
                <>
                    <Title>{GAME_NAME}</Title>
                    {gameStarted ? (
                        <LevelWrapper>
                            {maps.map((map, index) => (
                                <LevelButton key={map.id} onClick={() => loadMap(map)}>
                                    {BTN_LEVEL} {index} {isCompleted(map.id) && <Completed />}
                                    {IS_DEV && (
                                        <small style={{ fontSize: 11 }}>
                                            <br />
                                            {map.name}
                                        </small>
                                    )}
                                    {map.image && <img src={map.image} width="200" alt="" />}
                                </LevelButton>
                            ))}
                        </LevelWrapper>
                    ) : (
                        <StartButtonWrapper>
                            <StartButton onClick={() => setGameStarted(true)}>
                                {BTN_PLAY}
                            </StartButton>
                        </StartButtonWrapper>
                    )}
                </>
            )}

            {editMode && <DebugView objects={objects} />}

            {mapId && (
                <SmallMenuWrapper>
                    <Button onClick={unloadMap}>
                        {BTN_EXIT}
                        <small>{`[Q]`}</small>
                    </Button>
                    <Button onClick={reset}>
                        {BTN_RESTART} <small>{`[R]`}</small>
                    </Button>
                </SmallMenuWrapper>
            )}
            {mapName && (
                <MapName>
                    {BTN_LEVEL} {maps.findIndex(m => m.id === mapId)}
                </MapName>
            )}
            {mapId && player && (
                <ControlsWrapper>
                    <Button onClick={left}>
                        <strong>←</strong>
                        <small>{`[A]`}</small>
                    </Button>
                    <ButtonBlock>
                        <Button onClick={up}>
                            <strong>↑</strong>
                            <small>{`[W]`}</small>
                        </Button>
                        <Button onClick={down}>
                            <strong>↓</strong>
                            <small>{`[S]`}</small>
                        </Button>
                    </ButtonBlock>
                    <Button onClick={right}>
                        <strong>→</strong>
                        <small>{`[D]`}</small>
                    </Button>
                    <Button onClick={equip}>
                        {BTN_EQUIP} <small>{`[E]`}</small>
                    </Button>
                    {player.data.hasGrapple && (
                        <Button onClick={grapple}>
                            {BTN_GRAPPLE} <small>{`[F]`}</small>
                        </Button>
                    )}
                    {player.data.hasCannon && (
                        <Button onClick={fire}>
                            {BTN_FIRE} <small>{'[SPACE]'}</small>
                        </Button>
                    )}
                </ControlsWrapper>
            )}
            {winDialog && mapId && (
                <Dialog>
                    <h1>{CONGRATULATIONS}</h1>
                    <p>{LEVEL_COMPLETE}</p> <br />
                    <Button onClick={nextMap}>
                        {NEXT_LEVEL} <small>[enter]</small>
                    </Button>
                </Dialog>
            )}
            {!mapId && <Authors />}
        </>
    )
}

const Completed = styled.span`
    &::after {
        content: '✓';
        color: #8fe34f;
    }
`

const StartButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 120px 0;
`

const StartButton = styled(Button)`
    font-size: 50px;
    padding: 40px 60px;
`

const Title = styled.h1`
    font-family: 'Gugi', cursive;
    font-size: 85px;
    text-align: center;
    font-weight: normal;
    color: #fff;
`

const LevelWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-auto-rows: 1fr;
    grid-gap: 24px;
    padding: 24px;
`

const LevelButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    color: rgba(205, 236, 255, 0.726);
    font-size: 30px;
    padding: 20px 30px;
    margin: 4px;
    border-radius: 4px;
    text-transform: uppercase;
    text-align: center;
    transition: all ease 150ms;

    &:hover {
        background-color: rgba(205, 236, 255, 0.2);
    }

    img {
        display: block;
        margin: auto;
        margin-top: 20px;
        height: 200px;
        object-fit: contain;
    }
`

const MapName = styled.div`
    font-weight: bold;
    position: absolute;
    z-index: 5;
    top: 0;
    right: 0;
    padding: 10px 20px 0 0;
    font-size: 24px;
    text-transform: uppercase;
`

const ControlsWrapper = styled.div`
    position: absolute;
    z-index: 5;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
`

const SmallMenuWrapper = styled.div`
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
`
