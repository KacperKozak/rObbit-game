import React from 'react'
import { createMap } from '../mocks/mapMock'

const map = createMap()

export function App() {
    return (
        <div>
            {map.tiles.map(tile => (
                <div
                    style={{
                        position: 'absolute',
                        left: tile.xyz[0] * 100,
                        top: tile.xyz[1] * 100,
                        width: 100,
                        height: 100,
                    }}
                >
                    <tile.Component />
                </div>
            ))}
            {map.props.map(prop => (
                <div
                    style={{
                        position: 'absolute',
                        left: prop.xyz[0] * 100,
                        top: prop.xyz[1] * 100,
                        width: 100,
                        height: 100,
                    }}
                >
                    <prop.Component />
                </div>
            ))}
        </div>
    )
}
