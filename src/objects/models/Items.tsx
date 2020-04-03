import React from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RenderComponentProps, Vector2 } from '../../types/types'
import { AnimationMixer, Group } from 'three'
import { setInterval } from 'timers'
import { useSpring, animated } from 'react-spring/three'

export const Player = (props: RenderComponentProps) => {
    return <AnimatieAsset {...props} url="robot_model.gltf" />
}

export const Rock = (props: RenderComponentProps) => {
    return <Asset {...props} url="rock1.gltf" />
}
export const Cannon = (props: RenderComponentProps) => {
    return <Asset {...props} url="rakietnica_srednia_014.gltf" elevationFix={-0.8} />
}

export const Ground = (props: RenderComponentProps) => {
    return <Asset {...props} url="rock.gltf" castShadow={false} receiveShadow={true} />
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
    elevationFix?: number
}

const Asset = ({
    url,
    instance: { xy, elevation, rotation },
    castShadow = true,
    receiveShadow = true,
    elevationFix = 0,
}: AssetProps) => {
    const anim = useSpring({
        pos: [xy[0], elevation + elevationFix, xy[1]],
        rot: [0, vectorToThree(rotation), 0],
    })
    const gltf = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/${url}`)
    const scene = gltf.scene.clone()
    if (castShadow) scene.children[0].castShadow = true
    if (receiveShadow) scene.children[0].receiveShadow = true
    scene.scale.set(0.5, 0.5, 0.5)
    return <animated.primitive object={scene} position={anim.pos} rotation={anim.rot} />
}

const AnimatieAsset = ({
    url,
    instance: { xy, elevation, rotation, data },
    castShadow = true,
    receiveShadow = true,
}: AssetProps) => {
    const anim = useSpring({
        pos: [xy[0], elevation, xy[1]],
        rot: [0, vectorToThree(rotation), 0],
    })

    const gltf = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/${url}`)
    // const gltfanimation = useLoader(GLTFLoader, `/assets/animations/jump.gltf`)
    // const gltfanimation = useLoader(GLTFLoader, `/assets/animations/move.gltf`)
    const gltfanimation = useLoader(
        GLTFLoader,
        `${process.env.PUBLIC_URL}/assets/animations/boring.gltf`,
    )
    const cannonInHead = useLoader(
        GLTFLoader,
        `${process.env.PUBLIC_URL}/assets/rakietnica_srednia_014.gltf`,
    )
    const cannonInHeadScene = cannonInHead.scene.clone()

    if (castShadow) gltf.scene.children[0].castShadow = true
    if (receiveShadow) gltf.scene.children[0].receiveShadow = true
    gltf.scene.scale.set(0.5, 0.5, 0.5)
    const mixer = new AnimationMixer(gltfanimation.scene)
    gltfanimation.animations.forEach(clip => {
        mixer.clipAction(clip, gltf.scene).play()
    })

    useFrame(() => {
        // console.log(mixer)
        mixer.update(0.02)
        // mixer.time = 5
    })

    if (data.gun) {
    }

    return (
        <animated.group position={anim.pos} rotation={anim.rot}>
            <primitive object={gltf.scene}>
                <primitive object={cannonInHeadScene} visible={!!data.gun} />
            </primitive>
        </animated.group>
    )
}

const vectorToThree = (vector: Vector2) => {
    if (vector[0] === 1 && vector[1] === 0) return Math.PI / 2
    if (vector[0] === 0 && vector[1] === -1) return (Math.PI / 2) * 2
    if (vector[0] === -1 && vector[1] === 0) return (Math.PI / 2) * 3
    // if (vector[0] === 0 && vector[1] === 1) return (Math.PI / 2) * 4
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
