export type XYZ = [number, number, number]
export type Vector2 = [number, number]
export type Vector3 = [number, number, number]

export interface Game {
    player: PlayerObject
    playerPos: XYZ
    map: GameMap
}

export interface BaseObject {
    id: string
    xyz: XYZ
    rotation: Vector2
    enter(obj: AnyObject, vector: Vector2): Action[]
    leave(obj: AnyObject, vector: Vector2): Action[]
    Component: any
}

export type AnyObject = PropObject | PlayerObject

export interface PropObject extends BaseObject {
    // move(vector: Vector): Action[] // TODO
}

export interface PlayerObject extends PropObject {
    attachments: AttachmentProp[]
}

/*
 * Actions
 */
type Action = MoveAction | RemoveAction

export interface MoveAction {
    type: 'move'
    id: string
    vector: Vector2
}

export interface RemoveAction {
    type: 'remove'
    id: string
}

/*
 * Map
 */
export interface GameMap {
    defaultPlayerPos: XYZ
    tiles: BaseObject[]
    props: MapProp[]
}

/*
 * Props
 */
export type MapProp = AttachmentProp | ObstacleProp

export interface AttachmentProp extends PropObject {
    type: 'hand' | 'leg'
}

export interface ObstacleProp extends PropObject {
    type: 'stone' | 'hand'
}
