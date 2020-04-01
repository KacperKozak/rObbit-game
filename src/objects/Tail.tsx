import { useFrame } from 'react-three-fiber'
import React, { useState, useRef } from 'react'

export const Tile = (props: any) => {
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Rotate mesh every frame, this is outside of React without overhead
    // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    return (
        <mesh
            {...props}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={e => setActive(!active)}
            onPointerOver={e => setHover(true)}
            onPointerOut={e => setHover(false)}
        >
            <boxBufferGeometry attach="geometry" args={[1, 0.1, 1]} />
            <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}
