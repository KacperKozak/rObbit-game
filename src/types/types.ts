export type XY = [number, number]
export type Vector2 = [number, number]

export interface PlayerObject extends BaseObject {
    attachments: any[]
}

export interface BaseObject {
    id: string
    xy: XY
    rotation?: Vector2
    enter?(obj: AnyObject, vector: Vector2): Action[]
    leave?(obj: AnyObject, vector: Vector2): Action[]
    Component?: any
}

export type AnyObject = BaseObject | PlayerObject

/*
 * Actions
 */
export type Action = MoveAction | RemoveAction

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
    tiles: BaseObject[]
    props: AnyObject[]
}
