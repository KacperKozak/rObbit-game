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
    type: ObjectTypes | ObjectTypes
    id: string
    xy: XY
    rotation?: Vector2
}

interface ActionEvent {
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
    Component(): any
    Component3d(): any
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
    tiles: ObjectInstance[]
    props: ObjectInstance[]
}
