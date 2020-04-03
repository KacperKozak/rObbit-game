import { GameState } from '../state/gameReducer'
import { Action } from 'redux'

export type XY = [number, number]
export type Vector2 = [number, number]

export enum ObjectTypes {
    Grass,
    Ice,
    Rock,
    Button,
    Player,
    TestProp,
}

export interface ObjectInstance {
    type: ObjectTypes
    id: string
    xy: XY
    rotation: number
    elevation: number
    zIndex: number
    aIndex: number
}

export interface ActionEvent {
    who: ObjectInstance // who triggered this @TODO better name!
    self: ObjectInstance
    vector: Vector2
    state: GameState
}

export interface ObjectDefinition {
    name: string
    getId(): string
    canEnter(event: ActionEvent): boolean
    push?(event: ActionEvent): Action[] // triggered when !canEnter
    enter?(event: ActionEvent): Action[]
    leave?(event: ActionEvent): Action[]
    Component(props: RenderComponentProps): any
    Component3d(props: RenderComponentProps): any
}

export interface RenderComponentProps {
    xy: XY
    rotation: number
    elevation: number
}
