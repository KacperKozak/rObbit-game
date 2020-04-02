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
    Component3d?: any
}

export type AnyObject = BaseObject | PlayerObject

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
    tiles: BaseObject[]
    props: AnyObject[]
}
