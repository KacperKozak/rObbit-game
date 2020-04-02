import { PlayerObjectInterface, BaseObject, XY, Vector2 } from '../types/types'
import { PLAYER_ID } from '../types/consts'
import React from 'react'
import { Tile } from './Tail'
import { uniqueId } from 'lodash'
import { removeAction } from '../state/actions'

export class PlayerObject implements PlayerObjectInterface {
    id = PLAYER_ID
    attachments = []
    constructor(public xy: XY, public rotation: Vector2) {}
    Component = () => (
        <div
            style={{
                margin: 25 / 2,
                width: 25,
                height: 25,
                backgroundColor: 'white',
                borderRadius: 5,
            }}
        />
    )
    Component3d = () => <Tile color="white" />
}

export class PropObject implements BaseObject {
    id = uniqueId('prop')
    constructor(public xy: XY, public rotation: Vector2) {}
    enter = () => [removeAction(this.id)]
    Component = () => (
        <div
            style={{
                margin: 25 / 2,
                width: 25,
                height: 25,
                backgroundColor: 'brown',
                borderRadius: 5,
            }}
        />
    )
    Component3d = () => <Tile color="brown" />
}
