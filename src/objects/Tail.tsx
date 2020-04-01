import { useFrame } from 'react-three-fiber'
import React, { useState, useRef } from 'react'
import { Vector3 } from 'three'

export const Tile = (props: { color: string }) => {
    // Set up state for the hovered and active state]
    const [active, setActive] = useState(false)

    // Rotate mesh every frame, this is outside of React without overhead
    // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    return (
        <mesh scale={active ? [0.9, 0.9, 0.9] : [1, 1, 1]} onClick={e => setActive(!active)}>
            <boxBufferGeometry attach="geometry" args={[1, 0.1, 1]} />
            <meshStandardMaterial attach="material" color={props.color} />
        </mesh>
    )
}
