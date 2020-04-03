import React from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RenderComponentProps, Vector2 } from '../../types/types'
import { AnimationMixer } from 'three'
import { setInterval } from 'timers'

export const Player = (props: RenderComponentProps) => {
    return <AnimatieAsset {...props} url="robot_model.gltf" />
}

export const Item = (props: RenderComponentProps) => {
    return <Asset {...props} url="rock1.gltf" />
}

export const Ground = (props: RenderComponentProps) => {
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
    receiveShadow = true,
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
            rotation={[0, vectorToThree(rotation), 0]}
        />
    )
}

const AnimatieAsset = ({
    url,
    xy,
    elevation,
    rotation,
    castShadow = true,
    receiveShadow = true,
}: AssetProps) => {
    const gltf = useLoader(GLTFLoader, `/assets/${url}`)
    // const gltfanimation = useLoader(GLTFLoader, `/assets/animations/jump.gltf`)
    // const gltfanimation = useLoader(GLTFLoader, `/assets/animations/move.gltf`)
    const gltfanimation = useLoader(GLTFLoader, `/assets/animations/boring.gltf`)
    if (castShadow) gltf.scene.children[0].castShadow = true
    if (receiveShadow) gltf.scene.children[0].receiveShadow = true
    gltf.scene.scale.set(0.5, 0.5, 0.5)
    gltf.scene = gltf.scene.clone()
    const mixer = new AnimationMixer(gltfanimation.scene)
    gltfanimation.animations.forEach(clip => {
        // console.log(clip, mixer)
        mixer.clipAction(clip, gltf.scene.children[0]).play()
        // mixer.setTime(0.5)
    })

    useFrame(() => {
        // console.log(mixer)
        mixer.update(0.02)
        // mixer.time = 5
    })
    // useFrame(() => (mixer.existingAction))

    return (
        <primitive
            object={gltf.scene}
            dispose={null}
            position={[xy[0], elevation, xy[1]]}
            rotation={[0, vectorToThree(rotation), 0]}
        />
    )
}

const vectorToThree = (vector: Vector2) => {
    if (vector[0] === 1 && vector[1] === 0) return Math.PI / 2
    if (vector[0] === 0 && vector[1] === -1) return (Math.PI / 2) * 2
    if (vector[0] === -1 && vector[1] === 0) return (Math.PI / 2) * 3
    if (vector[0] === 0 && vector[1] === 1) return (Math.PI / 2) * 4
    return 0
}

// export const box = (props: RenderComponentProps) => {
//     return (
//         <mesh>
//             <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
//             <meshStandardMaterial attach="material" color={props.color} />
//         </mesh>
//     )
// }
