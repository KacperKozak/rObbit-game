import React, { useEffect } from 'react'
import { Color } from 'three'
import { useGame } from '../hooks/useGame'
import { useThree } from 'react-three-fiber'
import { ObjectInstance } from '../types/types'

const d = 5

interface EnvironmentProps {
    player: ObjectInstance
}

export const Environment = ({ player }: EnvironmentProps) => {
    // const { scene, camera, size } = useThree()

    // useEffect(() => {
    //     console.log('camera', camera)
    //     console.log('size', size)

    //     camera.lookAt(player.xy[0], 1, player.xy[1])
    //     camera.position.set(player.xy[0] - 2, 7, player.xy[1] + 5)
    // }, player.xy)

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
            <pointLight position={[1, 3, 5]} intensity={2.2} color={new Color('#c86b6f')} />
        </group>
    )
}
