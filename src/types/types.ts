import { GameState } from '../state/gameReducer'
import { Action } from 'redux'
import { FC, ReactNode } from 'react'

export type XY = [number, number]
export type Vector2 = [number, number]

export enum ObjectTypes {
    Grass = 'Grass',
    Ice = 'Ice',
    RockFloor = 'RockFloor',
    Button = 'Button',
    Player = 'Player',
    BigRock = 'BigRock',
    Cannon = 'Cannon',
}

export interface ObjectInstance {
    type: ObjectTypes
    id: string
    xy: XY
    rotation: Vector2
    elevation: number
    zIndex: number
    aIndex: number
    data: Partial<ObjectInstanceData>
}

export interface ObjectInstanceData {
    gun: 'cannon'
    info: string
}

export interface ActionEvent {
    who: ObjectInstance // who triggered this @TODO better name!
    self: ObjectInstance
    vector: Vector2
    state: GameState
}

export interface ObjectDefinition {
    name: string
    height: number
    getId(): string
    push?(event: ActionEvent): Action[] // triggered when elevation is to big
    enter?(event: ActionEvent): Action[]
    leave?(event: ActionEvent): Action[]
    equip?(event: ActionEvent): Action[]
    Component(props: RenderComponentProps & { children: ReactNode }): any
    Component3d(props: RenderComponentProps): any
}

export interface RenderComponentProps {
    instance: ObjectInstance
}
