import { isEmpty, isEqual } from 'lodash'
import React, { useState } from 'react'
import styled from 'styled-components'
import { createArray, findByXY } from '../helpers'
import { useEditor } from '../hooks/useEditor'
import { getDefinition, objectDefinitions } from '../objects/definitions'
import { DOWN, LEFT, RIGHT, UP } from '../types/consts'
import { ObjectInstance, ObjectTypes, Vector2, XY } from '../types/types'

interface DebugViewProps {
    objects: ObjectInstance[]
}

const size = 150
const grid = 10

const color: Record<ObjectTypes, string> = {
    [ObjectTypes.Player]: 'red',
    [ObjectTypes.WinTrigger]: 'green',

    [ObjectTypes.Grass]: 'green',
    [ObjectTypes.Water]: 'blue',
    [ObjectTypes.RockFloor]: 'gray',
    [ObjectTypes.Wall]: 'white',
    [ObjectTypes.Box]: 'brown',
    [ObjectTypes.BigRock]: 'silver',

    [ObjectTypes.Pipe]: 'lightblue',
    [ObjectTypes.PipeLeft]: 'lightblue',
    [ObjectTypes.PipeRight]: 'lightblue',
    [ObjectTypes.PipePlace]: 'lightblue',
    [ObjectTypes.PipeUp]: 'lightblue',
    [ObjectTypes.PipeDown]: 'lightblue',
    [ObjectTypes.PipeElement]: 'lightblue',

    [ObjectTypes.Fence]: 'white',

    [ObjectTypes.Button]: 'pink',
    [ObjectTypes.Door]: 'pink',
    [ObjectTypes.WallMetal]: 'black',
    [ObjectTypes.Ice]: 'white',

    [ObjectTypes.Crossbow]: 'purple',
    [ObjectTypes.Cannon]: 'purple',
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
    background-color: rgba(0, 0, 0, 0.7);
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
                        <DataInput obj={obj} onChange={update(obj.id)} />
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
                        <strong style={{ color: color[obj.type] }}>{obj.type}</strong> <br />
                        <small>{obj.id}</small>
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
    style?: React.CSSProperties
}

const NumberInput = ({ obj, field, onChange, style }: NumberInputProps) => {
    return (
        <div>
            <input
                type="number"
                step="0.1"
                value={obj[field] as string}
                style={style || { width: 30 }}
                onChange={event => {
                    const value = parseFloat(event.target.value)
                    if (Number.isNaN(value)) return
                    onChange({ [field]: parseFloat(event.target.value) })
                }}
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
                <NumberInput obj={obj} field="elevation" onChange={onChange} />
                <input
                    type="range"
                    min={-1 * f}
                    max={10 * f}
                    value={obj.elevation * f}
                    onChange={event => onChange({ elevation: parseFloat(event.target.value) / f })}
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

interface DataInputProps {
    obj: ObjectInstance
    onChange(partial: Partial<ObjectInstance>): void
}

const DataInput = ({ obj, onChange }: DataInputProps) => {
    const data = JSON.stringify(obj.data)
    const [localData, setLocalData] = useState(data)
    return (
        <div>
            <textarea
                value={localData}
                onFocus={() => setLocalData(JSON.stringify(obj.data))}
                onChange={event => {
                    setLocalData(event.target.value)
                    try {
                        const data = JSON.parse(event.target.value)
                        onChange({ data })
                    } catch (e) {
                        console.error(e)
                    }
                }}
            />
        </div>
    )
}
