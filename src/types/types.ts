import { GameState } from '../state/gameReducer'
import { Action } from 'redux'
import { FC, ReactNode } from 'react'

export type XY = [number, number]
export type Vector2 = [number, number]

export enum ObjectTypes {
    Player = 'Player',

    Grass = 'Grass',
    RockFloor = 'RockFloor',
    BigRock = 'BigRock',

    Ice = 'Ice',

    Button = 'Button',

    Crossbow = 'Crossbow',
    Cannon = 'Cannon',
    Boom = 'Boom',
    Projectile = 'Projectile',
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
    gun: 'cannon' | 'crossbow'
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
    push?(event: ActionEvent): Action[] // triggered when elevation is to big
    enter?(event: ActionEvent): Action[]
    leave?(event: ActionEvent): Action[]
    equip?(event: ActionEvent): Action[]
    projectileLaunch?(event: ActionEvent): Action[] // eg. for projectile
    projectileHit?(event: ActionEvent): Action[] // eg. for projectile
    Component(props: RenderComponentProps & { children: ReactNode }): any
    Component3d(props: RenderComponentProps): any
}

export interface RenderComponentProps {
    instance: ObjectInstance
}
