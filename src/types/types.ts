import { GameState } from '../state/gameReducer'

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
}

export interface ActionEvent {
    who: ObjectInstance // who triggered this @TODO better name!
    self: ObjectInstance
    vector: Vector2
    state: GameState
}

export interface ObjectDefinition {
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

/*
 * Actions
 */
export type Action = MoveAction | RemoveAction

export interface MoveAction {
    id: string
    type: 'move'
    targetId: string
    vector: Vector2
}

export interface RemoveAction {
    id: string
    type: 'remove'
    targetId: string
}

/*
 * Map
 */
export interface GameMap {
    objects: ObjectInstance[]
}
