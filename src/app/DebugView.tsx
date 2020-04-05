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

const color: Record<ObjectTypes, string> = {
    [ObjectTypes.Player]: 'white',
    [ObjectTypes.WinTrigger]: 'white',

    [ObjectTypes.Grass]: 'white',
    [ObjectTypes.Water]: 'white',
    [ObjectTypes.RockFloor]: 'white',
    [ObjectTypes.Wall]: 'white',
    [ObjectTypes.Box]: 'white',
    [ObjectTypes.BigRock]: 'white',

    [ObjectTypes.Pipe]: 'white',
    [ObjectTypes.PipeLeft]: 'white',
    [ObjectTypes.PipeRight]: 'white',
    [ObjectTypes.PipePlace]: 'white',
    [ObjectTypes.PipeUp]: 'white',
    [ObjectTypes.PipeDown]: 'white',
    [ObjectTypes.PipeElement]: 'white',

    [ObjectTypes.Fence]: 'white',

    [ObjectTypes.Button]: 'white',
    [ObjectTypes.Door]: 'white',
    [ObjectTypes.WallMetal]: 'white',
    [ObjectTypes.Ice]: 'white',

    [ObjectTypes.Crossbow]: 'white',
    [ObjectTypes.Cannon]: 'white',
    [ObjectTypes.Boom]: 'white',

    [ObjectTypes.CrossbowProjectile]: 'white',
    [ObjectTypes.RocketProjectile]: 'white',
}

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

const Cols = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: auto;
    margin: 5px 0;
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

    const getHeight = (obj: ObjectInstance) => {
        const def = getDefinition(obj.type)
        return def.height(obj)
    }

    if (open) {
        return (
            <CellContainer>
                {objects.map(obj => (
                    <CellObj key={obj.id}>
                        <Remove onClick={() => remove(obj.id)} />
                        <TextInput obj={obj} field="id" onChange={update(obj.id)} />
                        <TypeSelect obj={obj} onChange={update(obj.id)} />
                        elevation:
                        <ElevationInput obj={obj} onChange={update(obj.id)} />
                        rotation:
                        <RotationInput obj={obj} onChange={update(obj.id)} />
                        <Cols>
                            <div>
                                zIndex:
                                <NumberInput obj={obj} field="zIndex" onChange={update(obj.id)} />
                            </div>
                            <div>
                                aIndex:
                                <NumberInput obj={obj} field="aIndex" onChange={update(obj.id)} />
                            </div>
                            <div>
                                Size: <br />
                                h: <b>{getHeight(obj)}</b> e: <b>{obj.elevation}</b>
                            </div>
                        </Cols>
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
                    <div>
                        <strong>{obj.type}</strong> <br /> <small>{obj.id}</small>
                    </div>
                    {!isEmpty(obj.data) && <pre>{JSON.stringify(obj.data, null, 1)}</pre>}
                    <small>
                        h: {getHeight(obj)} e: {obj.elevation}
                    </small>
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
    line-height: 1;
    font-size: 12px;
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
    width: ${size * 1.5}px;
    min-height: ${size}px;
    border: 1px solid #333;
`

interface TextInputProps {
    obj: ObjectInstance
    field: keyof ObjectInstance
    onChange(partial: Partial<ObjectInstance>): void
}

const TextInput = ({ obj, field, onChange }: TextInputProps) => {
    return (
        <div>
            <input
                value={obj[field] as string}
                onChange={event => onChange({ [field]: event.target.value })}
            />
        </div>
    )
}

interface NumberInputProps {
    obj: ObjectInstance
    field: keyof ObjectInstance
    onChange(partial: Partial<ObjectInstance>): void
}

const NumberInput = ({ obj, field, onChange }: NumberInputProps) => {
    return (
        <div>
            <input
                type="number"
                value={obj[field] as string}
                style={{ width: 30 }}
                onChange={event => onChange({ [field]: parseInt(event.target.value, 10) })}
            />
        </div>
    )
}

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
    const f = 100
    return (
        <div>
            <Cols>
                <input
                    type="number"
                    value={obj.elevation}
                    onChange={event => onChange({ elevation: parseInt(event.target.value, 10) })}
                    style={{ width: 30 }}
                />
                <input
                    type="range"
                    min={-1 * f}
                    max={10 * f}
                    value={obj.elevation * f}
                    onChange={event =>
                        onChange({ elevation: parseInt(event.target.value, 10) / f })
                    }
                />
            </Cols>
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
