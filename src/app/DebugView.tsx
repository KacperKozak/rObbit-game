import { isEmpty, isEqual } from 'lodash'
import React, { useState } from 'react'
import { findById, createArray, findByXY } from '../helpers'
import { useEditor } from '../hooks/useEditor'
import { getDefinition, objectDefinitions } from '../objects/definitions'
import { ObjectInstance, ObjectTypes, XY, Vector2 } from '../types/types'
import styled from 'styled-components'
import { UP, RIGHT, DOWN, LEFT } from '../types/consts'

interface DebugViewProps {
    objects: ObjectInstance[]
}

const size = 150
const grid = 10

export const DebugView = ({ objects }: DebugViewProps) => {
    const { copyMap } = useEditor()

    return (
        <Container>
            <button onClick={copyMap}>Copy map</button>
            <MapGrid>
                {createArray(grid).map(y => (
                    <Row key={y}>
                        {createArray(grid).map(x => (
                            <Cell key={x} objects={findByXY(objects, [x, y])} xy={[x, y]} />
                        ))}
                    </Row>
                ))}
            </MapGrid>
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    z-index: 100;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    opacity: 0.8;
    background-color: black;
    overflow: auto;
`

const MapGrid = styled.div`
    border: 1px solid #333;
    font-size: 12px;
`

const Row = styled.div`
    display: flex;
`

interface CellProps {
    xy: XY
    objects: ObjectInstance[]
}

export const Cell = ({ objects, xy }: CellProps) => {
    const [open, setOpen] = useState(false)
    const { update, add, remove, copyMap } = useEditor()

    const addEmpty = () => add({ type: ObjectTypes.RockFloor, xy })
    const openAndAdd = () => {
        setOpen(true)
        if (!objects.length) addEmpty()
    }

    if (open) {
        return (
            <CellContainer>
                {objects.map(obj => (
                    <CellObj key={obj.id}>
                        <Remove onClick={() => remove(obj.id)} />
                        <small>{obj.id}</small>
                        <TypeSelect obj={obj} onChange={update(obj.id)} />
                        <ElevationInput obj={obj} onChange={update(obj.id)} />
                        <RotationInput obj={obj} onChange={update(obj.id)} />
                        {!isEmpty(obj.data) && <pre>{JSON.stringify(obj.data, null, 1)}</pre>}
                    </CellObj>
                ))}
                <button onClick={addEmpty}>+</button>
                <button onClick={() => setOpen(false)}>Close</button>
            </CellContainer>
        )
    }

    return (
        <CellInfoContainer onClick={openAndAdd}>
            {objects.map(obj => (
                <CellObj key={obj.id}>
                    <strong>{obj.type}</strong> - <small>{obj.id}</small>
                    {!isEmpty(obj.data) && <pre>{JSON.stringify(obj.data, null, 1)}</pre>}
                </CellObj>
            ))}
        </CellInfoContainer>
    )
}

const CellInfoContainer = styled.div`
    width: ${size}px;
    min-height: ${size}px;
    border: 1px solid #333;
`

const CellObj = styled.div`
    position: relative;
    background: #333;
    padding: 7px 10px;
    margin: 4px;
    pre {
        font-size: 10px;
    }
`

const Remove = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    &::after {
        content: '❌';
    }
`

const CellContainer = styled.div`
    width: ${size * 3}px;
    min-height: ${size}px;
    border: 1px solid #333;
`

interface TypeSelectProps {
    obj: ObjectInstance
    onChange(partial: Partial<ObjectInstance>): void
}

const TypeSelect = ({ obj, onChange }: TypeSelectProps) => {
    return (
        <div>
            <select
                value={obj.type}
                onChange={event => onChange({ type: event.target.value as ObjectTypes })}
            >
                {Object.keys(objectDefinitions).map(item => (
                    <option>{item}</option>
                ))}
            </select>
        </div>
    )
}

interface ElevationInputProps {
    obj: ObjectInstance
    onChange(partial: Partial<ObjectInstance>): void
}

const ElevationInput = ({ obj, onChange }: ElevationInputProps) => {
    return (
        <div>
            <input
                type="range"
                min={-10}
                max={100}
                value={obj.elevation}
                onChange={event => onChange({ elevation: parseInt(event.target.value, 10) / 10 })}
            />
            {Math.round(obj.elevation * 2) / 2}
        </div>
    )
}

interface RotationInputProps {
    obj: ObjectInstance
    onChange(partial: Partial<ObjectInstance>): void
}

const RotationInput = ({ obj, onChange }: RotationInputProps) => {
    return (
        <div>
            <RotationInputButton obj={obj} label={'UP'} rotation={UP} onChange={onChange} />
            <RotationInputButton obj={obj} label={'RIGHT'} rotation={RIGHT} onChange={onChange} />
            <RotationInputButton obj={obj} label={'DOWN'} rotation={DOWN} onChange={onChange} />
            <RotationInputButton obj={obj} label={'LEFT'} rotation={LEFT} onChange={onChange} />
        </div>
    )
}

interface RotationInputButtonProps {
    label: string
    obj: ObjectInstance
    rotation: Vector2
    onChange(partial: Partial<ObjectInstance>): void
}

const RotationInputButton = ({ obj, onChange, rotation, label }: RotationInputButtonProps) => {
    return (
        <RotationBtn
            active={isEqual(obj.rotation, rotation)}
            onClick={() => onChange({ rotation })}
        >
            {label}
        </RotationBtn>
    )
}

const RotationBtn = styled.span<{ active: boolean }>`
    margin-right: 5px;
    cursor: pointer;
    ${p => p.active && 'font-weight: bold;'};
`
