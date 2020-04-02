import React from 'react'
import { Color } from 'three'

export const Environment = () => {
    return (
        <group>
            <ambientLight intensity={0.7} />
            <pointLight
                position={[6, 7, 8]}
                intensity={1.2}
                color={new Color('#3a8dc2')}
                castShadow
            />
            <pointLight
                position={[1, 3, 5]}
                intensity={1.2}
                color={new Color('#c86b6f')}
                castShadow
            />
        </group>
    )
}
