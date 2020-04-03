import React from 'react'
import { Color } from 'three'

const d = 5

export const Environment = () => {
    return (
        <group>
            <ambientLight intensity={2} />
            <pointLight
                position={[6, 7, 8]}
                intensity={2.2}
                color={new Color('#3a8dc2')}
                shadow-mapSize-Height="1024"
                shadow-mapSize-width="1024"
                shadow-camera-far={30}
                shadow-bias={-0.01}
                castShadow
                shadow-camera-left={-d}
                shadow-camera-right={d}
                shadow-camera-top={d}
                shadow-camera-bottom={-d}
            />
            <pointLight
                position={[1, 3, 5]}
                intensity={2.2}
                color={new Color('#c86b6f')}
                shadow-mapSize-Height="1024"
                shadow-mapSize-width="1024"
                shadow-camera-far={30}
                shadow-bias={-0.01}
                castShadow
                shadow-camera-left={-d}
                shadow-camera-right={d}
                shadow-camera-top={d}
                shadow-camera-bottom={-d}
            />
        </group>
    )
}
