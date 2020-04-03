import React from 'react'
import { useGame } from '../hooks/useGame'
import { useKeyboardEvent } from '../hooks/useKeyboardEvent'
import { getDefinition } from '../objects/definitions'
import { DOWN, LEFT, PLAYER_ID, RIGHT, UP } from '../types/consts'
import { ObjectInstance, ObjectTypes } from '../types/types'
import { isEmpty } from 'lodash'

interface DebugViewProps {
    objects: ObjectInstance[]
}

const size = 60

export const DebugView = ({ objects }: DebugViewProps) => {
    const { move, equip } = useGame()

    const left = () => move(LEFT)
    const up = () => move(UP)
    const down = () => move(DOWN)
    const right = () => move(RIGHT)

    useKeyboardEvent('ArrowLeft', left)
    useKeyboardEvent('ArrowUp', up)
    useKeyboardEvent('ArrowDown', down)
    useKeyboardEvent('ArrowRight', right)
    useKeyboardEvent(' ', equip)

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
            <button onClick={equip}>equip</button>

            <div style={{ position: 'relative' }}>
                {objects.map(obj => {
                    const { type, id, xy, rotation, elevation, zIndex, data } = obj
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
                            <Component instance={obj}>
                                {type} <br />
                                {isEmpty(data) ? '' : JSON.stringify(data, null, 1)}
                            </Component>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

interface LabelProps {
    text: string
    bottom?: boolean
}

export const Label = ({ text, bottom }: LabelProps) => (
    <div
        style={{
            position: 'absolute',
            left: 0,
            top: bottom ? '80%' : 0,
            fontSize: 10,
            color: 'black',
        }}
    >
        {text}
    </div>
)
