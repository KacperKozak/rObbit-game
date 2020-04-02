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

    useKeyboardEvent('ArrowLeft', () => move(PLAYER_ID, LEFT))
    useKeyboardEvent('ArrowUp', () => move(PLAYER_ID, UP))
    useKeyboardEvent('ArrowDown', () => move(PLAYER_ID, DOWN))
    useKeyboardEvent('ArrowRight', () => move(PLAYER_ID, RIGHT))

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
            <button onClick={() => move(PLAYER_ID, LEFT)}>←</button>
            <button onClick={() => move(PLAYER_ID, UP)}>↑</button>
            <button onClick={() => move(PLAYER_ID, DOWN)}>↓</button>
            <button onClick={() => move(PLAYER_ID, RIGHT)}>→</button>

            <div style={{ position: 'relative' }}>
                {map.objects.map(obj => {
                    const { Component } = getDefinition(obj.type)
                    return (
                        <div
                            key={obj.id}
                            style={{
                                position: 'absolute',
                                left: obj.xy[0] * size,
                                top: obj.xy[1] * size,
                                width: size,
                                height: size,
                            }}
                        >
                            <Label text={obj.id} />
                            <Component xy={obj.xy} rotation={0} elevation={0} />
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
