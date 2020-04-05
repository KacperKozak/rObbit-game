import { GameState } from '../state/gameReducer'
import { Action } from 'redux'
import { FC, ReactNode } from 'react'

export type XY = [number, number]
export type Vector2 = [number, number]

export enum ObjectTypes {
    Player = 'Player',
    WinTrigger = 'WinTrigger',

    Grass = 'Grass',
    Water = 'Water',
    RockFloor = 'RockFloor',
    Wall = 'Wall',
    Box = 'Box',
    BigRock = 'BigRock',

    Pipe = 'Pipe',
    PipeLeft = 'PipeLeft',
    PipeRight = 'PipeRight',
    PipePlace = 'PipePlace',
    PipeUp = 'PipeUp',
    PipeDown = 'PipeDown',
    PipeElement = 'PipeElement',

    Fence = 'Fence',

    Button = 'Button',
    Door = 'Door',
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
    hasCannon: boolean
    hasGrapple: boolean
    info: string
    open: boolean
    active: boolean
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

export interface MapData {
    id: string
    name: string
    objects: ObjectInstance[]
}
