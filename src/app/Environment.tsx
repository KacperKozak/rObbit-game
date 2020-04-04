import React, { useEffect } from 'react'
import { Color } from 'three'
import { useGame } from '../hooks/useGame'
import { useThree } from 'react-three-fiber'
import { ObjectInstance } from '../types/types'
import { CAMERA_OFFSET } from '../config'

const d = 5

interface EnvironmentProps {
    // player: ObjectInstance,
    mapId: string | null
    objectsList: ObjectInstance[]
}

export const Environment = ({ objectsList, mapId }: EnvironmentProps) => {
    const { camera, size } = useThree()

    useEffect(() => {
        const xValues = objectsList.map(obj => obj.xy[0])
        const yValues = objectsList.map(obj => obj.xy[1])

        const mapCenterX = Math.max(...xValues) / 2
        const mapCenterY = Math.max(...yValues) / 2

        const offsetX =
            (CAMERA_OFFSET[0] * Math.max(mapCenterX, mapCenterY) * 7) /
            (size.width / size.height) /
            0.9
        const offsetY =
            (CAMERA_OFFSET[1] * Math.max(mapCenterX, mapCenterY) * 7) /
            (size.width / size.height) /
            0.9
        const offsetZ =
            (CAMERA_OFFSET[2] * Math.max(mapCenterX, mapCenterY) * 7) /
            (size.width / size.height) /
            0.9

        camera.position.set(mapCenterX + offsetX, offsetZ, mapCenterY + offsetY)
        camera.lookAt(mapCenterX, 0, mapCenterY)
    }, [mapId, size])

    return (
        <group>
            <ambientLight intensity={2} color={new Color('#dbab93')} />
            <pointLight
                position={[6, 7, 8]}
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
            <pointLight position={[1, 3, 5]} intensity={2.2} color={new Color('#3a8dc2')} />
        </group>
    )
}
