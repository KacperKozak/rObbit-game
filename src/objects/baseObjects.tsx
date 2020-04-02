import { uniqueId } from 'lodash'
import React from 'react'
import { reverseVector } from '../helpers'
import { moveAction } from '../state/actions'
import { BaseObject, Vector2, XY, AnyObject } from '../types/types'
import { Tile } from './Tail'

export class GrassObject implements BaseObject {
    id = uniqueId('grass')
    constructor(public xy: XY, public rotation: Vector2) {}
    Component = () => <div style={{ width: 50, height: 50, backgroundColor: 'green' }} />
    Component3d = () => <Tile color="green" />
}

export class RockObject implements BaseObject {
    id = uniqueId('rock')
    constructor(public xy: XY, public rotation: Vector2) {}
    enter(obj: AnyObject, vector: Vector2) {
        return [moveAction(obj.id, reverseVector(vector))]
    }
    Component = () => <div style={{ width: 50, height: 50, backgroundColor: 'gray' }} />
    Component3d = () => <Tile color="gray" />
}
