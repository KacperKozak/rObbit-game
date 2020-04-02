import { useFrame } from 'react-three-fiber'
import React, { useState, useRef } from 'react'
import { Vector3 } from 'three'
import { play } from '../../audio/play'

export const Tile = (props: { color: string }) => {
    // Set up state for the hovered and active state]
    const [active, setActive] = useState(false)

    return (
        <mesh
            receiveShadow={true}
            scale={active ? [0.9, 0.9, 0.9] : [1, 1, 1]}
            onClick={e => {
                console.log(e)
                play('button', 0.5)
                return setActive(!active)
            }}
        >
            <boxBufferGeometry attach="geometry" args={[1, 0.1, 1]} />
            <meshStandardMaterial attach="material" color={props.color} />
        </mesh>
    )
}
