import React from 'react'
import { useGame } from '../hooks/useGame'
import { useKeyboardEvent } from '../hooks/useKeyboardEvent'
import { getDefinition } from '../objects/definitions'
import { DOWN, LEFT, PLAYER_ID, RIGHT, UP } from '../types/consts'
import { GameMap } from '../types/types'

interface DebugViewProps {
    map: GameMap
}

const size = 50

export const DebugView = ({ map }: DebugViewProps) => {
    const { move } = useGame()

    const left = () => move(PLAYER_ID, LEFT)
    const up = () => move(PLAYER_ID, UP)
    const down = () => move(PLAYER_ID, DOWN)
    const right = () => move(PLAYER_ID, RIGHT)

    useKeyboardEvent('ArrowLeft', left)
    useKeyboardEvent('ArrowUp', up)
    useKeyboardEvent('ArrowDown', down)
    useKeyboardEvent('ArrowRight', right)

    return (
        <div
            style={{
                position: 'absolute',
                zIndex: 100,
                top: 0,
                right: 0,
                width: size * 8,
                opacity: 0.8,
            }}
        >
            <button onClick={left}>←</button>
            <button onClick={up}>↑</button>
            <button onClick={down}>↓</button>
            <button onClick={right}>→</button>

            <div style={{ position: 'relative' }}>
                {map.objects.map(({ type, id, xy, zIndex }) => {
                    const { Component } = getDefinition(type)
                    return (
                        <div
                            key={id}
                            style={{
                                position: 'absolute',
                                left: xy[0] * size,
                                top: xy[1] * size,
                                width: size,
                                height: size,
                                zIndex,
                            }}
                        >
                            <Label text={id} />
                            <Component xy={xy} rotation={0} elevation={0} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

interface LabelProps {
    text: string
}

export const Label = ({ text }: LabelProps) => (
    <div style={{ position: 'absolute', left: 0, top: 0, fontSize: 10 }}>{text}</div>
)
