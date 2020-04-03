import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { findById } from '../helpers'
import { useEditor } from '../hooks/useEditor'
import { getDefinition, objectDefinitions } from '../objects/definitions'
import { ObjectInstance, ObjectTypes } from '../types/types'

interface DebugViewProps {
    objects: ObjectInstance[]
}

const size = 60

export const DebugView = ({ objects }: DebugViewProps) => {
    const [editId, setEditId] = useState<string>()
    const { edit } = useEditor()
    const obj = editId && findById(objects, editId)
    const update = (value: Partial<ObjectInstance>) => {
        if (obj) edit(obj.id, value)
    }

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
            {obj && (
                <>
                    <input
                        type="range"
                        min={-1}
                        max={5}
                        step={0.01}
                        value={obj.elevation}
                        onChange={event => update({ elevation: parseInt(event.target.value, 10) })}
                    />
                    <select
                        value={obj.type}
                        onChange={event => update({ type: event.target.value as ObjectTypes })}
                    >
                        {Object.keys(objectDefinitions).map(item => (
                            <option>{item}</option>
                        ))}
                    </select>
                </>
            )}
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
                            onClick={() => setEditId(id)}
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
