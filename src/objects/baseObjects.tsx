import { uniqueId } from 'lodash'
import React from 'react'
import { BaseObject, Vector2, XY } from '../types/types'
import { Tile } from './Tail'

export class GrassObject implements BaseObject {
    id = uniqueId('grass')
    constructor(public xy: XY, public rotation: Vector2) {}
    canEnter = () => true
    Component = () => <div style={{ width: 50, height: 50, backgroundColor: 'green' }} />
    Component3d = () => <Tile color="green" />
}

export class RockObject implements BaseObject {
    id = uniqueId('rock')
    constructor(public xy: XY, public rotation: Vector2) {}
    canEnter = () => false
    Component = () => <div style={{ width: 50, height: 50, backgroundColor: 'gray' }} />
    Component3d = () => <Tile color="gray" />
}
