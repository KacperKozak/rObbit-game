import { GameState } from '../state/gameReducer'
import { Action } from 'redux'
import { FC, ReactNode } from 'react'

export type XY = [number, number]
export type Vector2 = [number, number]

export enum ObjectTypes {
    Player = 'Player',
    WinTrigger = 'WinTrigger',

    Grass = 'Grass',
    RockFloor = 'RockFloor',
    Box = 'Box',
    BigRock = 'BigRock',
    Fence = 'Fence',

    Button = 'Button',
    Dor = 'Dor',
    Ice = 'Ice',

    Crossbow = 'Crossbow',
    Cannon = 'Cannon',
    Boom = 'Boom',

    CrossbowProjectile = 'CrossbowProjectile',
    RocketProjectile = 'RocketProjectile',
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
    open: boolean
    targetId: string
}

export interface ActionEvent {
    who: ObjectInstance
    self: ObjectInstance
    what?: ObjectInstance
    vector: Vector2
    state: GameState
    force?: number
}

export interface ObjectDefinition {
    name: string
    height: (instance: ObjectInstance) => number
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
