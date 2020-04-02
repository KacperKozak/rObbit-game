import { uniqueId, sample } from 'lodash'
import React from 'react'
import { BaseObject, Vector2, XY, AnyObject } from '../types/types'
import { Tile } from './Tail'
import { GameState } from '../state/gameReducer'
import { removeAction, moveAction } from '../state/actions'
import { PLAYER_ID } from '../types/consts'

export class GrassTileObject implements BaseObject {
    id = uniqueId('grass')
    constructor(public xy: XY, public rotation: Vector2) {}
    canEnter = () => true
    Component = () => <div style={{ width: 50, height: 50, backgroundColor: 'green' }} />
    Component3d = () => <Tile color="green" />
}

export class IceTileObject implements BaseObject {
    id = uniqueId('ice')
    constructor(public xy: XY, public rotation: Vector2) {}
    canEnter = () => true
    enter = (obj: AnyObject, vector: Vector2, state: GameState) => [moveAction(obj.id, vector)]
    Component = () => <div style={{ width: 50, height: 50, backgroundColor: 'lightblue' }} />
    Component3d = () => <Tile color="lightblue" />
}

export class RockTileObject implements BaseObject {
    id = uniqueId('rock')
    constructor(public xy: XY, public rotation: Vector2) {}
    canEnter = () => false
    Component = () => <div style={{ width: 50, height: 50, backgroundColor: 'gray' }} />
    Component3d = () => <Tile color="gray" />
}

export class ButtonTileObject implements BaseObject {
    id = uniqueId('rock')
    constructor(public xy: XY, public rotation: Vector2) {}
    canEnter = () => false
    push = (obj: AnyObject, vector: Vector2, state: GameState) => {
        const randomProp = sample(state.map.props.filter(p => p.id !== PLAYER_ID))
        if (!randomProp) return []
        return [removeAction(randomProp.id)]
    }
    Component = () => (
        <div
            style={{
                width: 50,
                height: 50,
                backgroundColor: 'gray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <button style={{ fontSize: 10 }}>btn</button>
        </div>
    )
    Component3d = () => <Tile color="darkgray" />
}
