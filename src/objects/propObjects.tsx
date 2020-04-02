import { PlayerObjectInterface, BaseObject, XY, Vector2 } from '../types/types'
import { PLAYER_ID } from '../types/consts'
import React from 'react'
import { Player, Item } from './models/Items'
import { uniqueId } from 'lodash'
import { removeAction } from '../state/actions'

export class PlayerObject implements PlayerObjectInterface {
    id = PLAYER_ID
    attachments = []
    constructor(public xy: XY, public rotation: Vector2) {}
    canEnter = () => true
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
    Component3d = () => <Player color="brown" />
}

export class PropObject implements BaseObject {
    id = uniqueId('prop')
    constructor(public xy: XY, public rotation: Vector2) {}
    canEnter = () => true
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
    Component3d = () => <Item color="brown" />
}
