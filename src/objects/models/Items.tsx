import React, { useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RenderComponentProps, Vector2 } from '../../types/types'
import { AnimationMixer, Group, LoopOnce } from 'three'
import { setInterval } from 'timers'
import { useSpring, animated } from 'react-spring/three'
import { timeInterval } from 'rxjs/operators'

export const Player = (props: RenderComponentProps) => {
    return <AnimatieAsset {...props} url="robot_model.gltf" />
}

export const Box = (props: RenderComponentProps) => {
    return <Asset {...props} url="box.gltf" />
}

export const Rock = (props: RenderComponentProps) => {
    return <Asset {...props} url="rock1.gltf" />
}

export const Fence = (props: RenderComponentProps) => {
    return <Asset {...props} url="fence.gltf" />
}

export const Arrow = (props: RenderComponentProps) => {
    return <Asset {...props} url="arrow.gltf" />
}

export const Boom = (props: RenderComponentProps) => {
    return <AnimateSelfAsset {...props} url="boom.gltf" />
}

export const Cannon = (props: RenderComponentProps) => {
    return <Asset {...props} url="rakietnica_srednia.gltf" elevationFix={-0.8} />
}

export const Rocket = (props: RenderComponentProps) => {
    return <Asset {...props} url="rocket.gltf" />
}

export const Crossbow = (props: RenderComponentProps) => {
    return <Asset {...props} url="kusza.gltf" elevationFix={-0.8} />
}

export const Ground = (props: RenderComponentProps) => {
    return <Asset {...props} url="rock.gltf" castShadow={true} receiveShadow={true} />
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

export const createTrigger = (color: string) => ({ instance }: RenderComponentProps) => {
    const { xy, elevation, rotation } = instance

    return (
        <mesh position={[xy[0], elevation, xy[1]]} rotation={[0, vectorToThree(rotation), 0]}>
            <boxBufferGeometry attach="geometry" args={[0.5, 1, 0.5]} />
            <meshStandardMaterial attach="material" color={color} />
        </mesh>
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
    gltf.scene.scale.set(0.5, 0.5, 0.5)
    if (castShadow) gltf.scene.children[0].castShadow = true
    if (receiveShadow) gltf.scene.children[0].receiveShadow = true

    // const gltfanimation = useLoader(GLTFLoader, `/assets/animations/jump.gltf`)
    // const gltfanimation = useLoader(GLTFLoader, `/assets/animations/move.gltf`)
    const gltfanimation = useLoader(
        GLTFLoader,
        `${process.env.PUBLIC_URL}/assets/animations/boring.gltf`,
    )
    const mixer = new AnimationMixer(gltfanimation.scene)
    gltfanimation.animations.forEach(clip => {
        mixer.clipAction(clip, gltf.scene).play()
    })
    useFrame(() => mixer.update(0.02))

    const cannonInHead = useLoader(
        GLTFLoader,
        `${process.env.PUBLIC_URL}/assets/rakietnica_srednia.gltf`,
    )
    const cannonInHeadScene = cannonInHead.scene.clone()

    const crossbowInHead = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/kusza.gltf`)
    const crossbowInHeadScene = crossbowInHead.scene.clone()

    return (
        <animated.group position={anim.pos} rotation={anim.rot}>
            <primitive object={gltf.scene}>
                <primitive object={cannonInHeadScene} visible={data.gun == 'cannon'} />
                <primitive object={crossbowInHeadScene} visible={data.gun == 'grapple'} />
            </primitive>
        </animated.group>
    )
}

const AnimateSelfAsset = ({
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

    const gltfScene = gltf.scene.clone()
    // useEffect(() => {
    if (castShadow) gltfScene.children[0].castShadow = true
    if (receiveShadow) gltfScene.children[0].receiveShadow = true

    gltfScene.scale.set(0.6, 0.6, 0.6)

    const mixer = new AnimationMixer(gltfScene)

    gltf.animations.forEach((clip, index) => {
        const animation = mixer.clipAction(clip, gltfScene.children[index])
        animation.setLoop(LoopOnce, 1)
        animation.play()
    })
    // }, [xy])
    useFrame(() => {
        mixer.update(0.03)
    })

    return (
        <animated.group position={anim.pos} rotation={anim.rot}>
            <primitive object={gltfScene} />
        </animated.group>
    )
}

const vectorToThree = (vector: Vector2) => {
    if (vector[0] === 1 && vector[1] === 0) return Math.PI / 2
    if (vector[0] === 0 && vector[1] === -1) return (Math.PI / 2) * 2
    if (vector[0] === -1 && vector[1] === 0) return (Math.PI / 2) * 3
    if (vector[0] === 0 && vector[1] === 1) return (Math.PI / 2) * 4
    // return (Math.PI / 2) * 4
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
