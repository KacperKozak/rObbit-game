import React from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RenderComponentProps } from '../../types/types'

export const Player = (props: RenderComponentProps) => {
    return <Asset {...props} url="robot_modeling_test012_gl.gltf" />
}

export const Item = (props: RenderComponentProps) => {
    return <Asset {...props} url="rock1.gltf" />
}

export const Ground = (props: RenderComponentProps) => {
    // Set up state for the hovered and active state]
    // const [active, setActive] = useState(false)

    console.log('elevation', props.elevation)

    return (
        <Asset
            {...props}
            url="ground_002_export_test_1_cube.gltf"
            castShadow={false}
            receiveShadow={true}
        />
    )
}

export const Grass = (props: RenderComponentProps) => {
    // Set up state for the hovered and active state]
    // const [active, setActive] = useState(false)

    console.log('elevation', props.elevation)

    return (
        <Asset
            {...props}
            url="grass_002_export_test_1_cube.gltf" // INNY model
            castShadow={false}
            receiveShadow={true}
        />
    )
}

export const Ice = (props: RenderComponentProps) => {
    // Set up state for the hovered and active state]
    // const [active, setActive] = useState(false)

    console.log('elevation', props.elevation)

    return (
        <Asset
            {...props}
            url="ice_002_export_test_1_cube.gltf" // INNY model
            castShadow={false}
            receiveShadow={true}
        />
    )
}
export const Button = (props: RenderComponentProps) => {
    // Set up state for the hovered and active state]
    // const [active, setActive] = useState(false)

    console.log('elevation', props.elevation)

    return (
        <Asset
            {...props}
            url="ground_002_export_test_1_cube.gltf" // INNY model
            castShadow={false}
            receiveShadow={true}
        />
    )
}

interface AssetProps extends RenderComponentProps {
    url: string
    color?: string
    castShadow?: boolean
    receiveShadow?: boolean
}

const Asset = ({
    url,
    xy,
    elevation,
    rotation,
    castShadow = true,
    receiveShadow = false,
}: AssetProps) => {
    const gltf = useLoader(GLTFLoader, `/assets/${url}`)
    if (castShadow) gltf.scene.children[0].castShadow = true
    if (receiveShadow) gltf.scene.children[0].receiveShadow = true
    gltf.scene.scale.set(0.5, 0.5, 0.5)
    gltf.scene = gltf.scene.clone()
    return (
        <primitive
            object={gltf.scene}
            dispose={null}
            position={[xy[0], elevation, xy[1]]}
            rotation={[0, rotation, 0]}
        />
    )
}

// export const box = (props: RenderComponentProps) => {
//     return (
//         <mesh>
//             <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
//             <meshStandardMaterial attach="material" color={props.color} />
//         </mesh>
//     )
// }
