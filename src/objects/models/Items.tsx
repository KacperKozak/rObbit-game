import React, { useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { RenderComponentProps, Vector2 } from '../../types/types'
import { AnimationMixer, Group, LoopOnce } from 'three'
import { setInterval } from 'timers'
import { useSpring, animated } from 'react-spring/three'
import { timeInterval } from 'rxjs/operators'

const useMyLoader = () => {
    const rocket = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/rocket.gltf`)
    const cannon = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/cannon.gltf`)
    const boom = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/boom.gltf`)
    const box = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/box.gltf`)
    const rock = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/rock1.gltf`)
    const fence = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/fence.gltf`)
    const arrow = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/arrow.gltf`)
    const crossbow = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/crossbow.gltf`)
    const graund = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/graund.gltf`)
    const wall = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/wall.gltf`)
    const grass = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/grass.gltf`)
    const ice = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/ice.gltf`)
    const button = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/box.gltf`) //TODO MODEL
    return {
        rocket: rocket.scene.clone(),
        cannon: cannon.scene.clone(),
        boom: boom.scene.clone(),
        box: box.scene.clone(),
        rock: rock.scene.clone(),
        fence: fence.scene.clone(),
        arrow: arrow.scene.clone(),
        crossbow: crossbow.scene.clone(),
        graund: graund.scene.clone(),
        wall: wall.scene.clone(),
        grass: grass.scene.clone(),
        ice: ice.scene.clone(),
        button: button.scene.clone(),
    }
}
const useAnimationLoader = () => {
    // const jump = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/animations/jump.gltf`)
    const boring = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/animations/boring.gltf`)
    // const push = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/animations/move.gltf`)

    return {
        // jump,
        boring,
        // push,
    }
}
export const Player = (props: RenderComponentProps) => {
    return <AnimatieAsset {...props} url="robot_model.gltf" />
}

export const Box = (props: RenderComponentProps) => {
    const { box } = useMyLoader()
    return <AssetPreload {...props} model={box} />
}

export const Rock = (props: RenderComponentProps) => {
    const { rock } = useMyLoader()
    return <AssetPreload {...props} model={rock} />
}

export const Fence = (props: RenderComponentProps) => {
    const { fence } = useMyLoader()
    return <AssetPreload {...props} model={fence} />
}

export const Arrow = (props: RenderComponentProps) => {
    const { arrow } = useMyLoader()
    return <AssetPreload {...props} model={arrow} />
}

export const Boom = (props: RenderComponentProps) => {
    return <AnimateSelfAsset {...props} url="boom.gltf" />
}

export const Cannon = (props: RenderComponentProps) => {
    // return <Asset {...props} url="rakietnica_srednia.gltf" elevationFix={-0.8} />

    const { cannon } = useMyLoader()
    return <AssetPreload {...props} model={cannon} elevationFix={-0.8} />
}

export const Rocket = (props: RenderComponentProps) => {
    const { rocket } = useMyLoader()
    return <AssetPreload {...props} model={rocket} />
}

export const Crossbow = (props: RenderComponentProps) => {
    const { crossbow } = useMyLoader()
    return <AssetPreload {...props} model={crossbow} elevationFix={-0.8} />
}

export const Ground = (props: RenderComponentProps) => {
    const { graund } = useMyLoader()
    return <AssetPreload {...props} model={graund} castShadow={true} receiveShadow={true} />
}
export const Wall = (props: RenderComponentProps) => {
    const { wall } = useMyLoader()
    return <AssetPreload {...props} model={wall} castShadow={true} receiveShadow={true} />
}

export const Grass = (props: RenderComponentProps) => {
    const { grass } = useMyLoader()
    return <AssetPreload {...props} model={grass} castShadow={true} receiveShadow={true} />
}

export const Ice = (props: RenderComponentProps) => {
    const { ice } = useMyLoader()
    return <AssetPreload {...props} model={ice} castShadow={false} receiveShadow={true} />
}

export const Button = (props: RenderComponentProps) => {
    const { button } = useMyLoader()
    return <AssetPreload {...props} model={button} castShadow={false} receiveShadow={true} />
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

interface PreloadAssetProps extends RenderComponentProps {
    model: GLTF['scene']
    color?: string
    castShadow?: boolean
    receiveShadow?: boolean
    elevationFix?: number
}

const AssetPreload = ({
    model,
    instance: { xy, elevation, rotation },
    castShadow = true,
    receiveShadow = true,
    elevationFix = 0,
}: PreloadAssetProps) => {
    const anim = useSpring({
        pos: [xy[0], elevation + elevationFix, xy[1]],
        rot: [0, vectorToThree(rotation), 0],
    })

    if (castShadow) model.children[0].castShadow = true
    if (receiveShadow) model.children[0].receiveShadow = true
    model.scale.set(0.5, 0.5, 0.5)
    return <animated.primitive object={model} position={anim.pos} rotation={anim.rot} />
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

    const gltfanimationBoring = useLoader(
        GLTFLoader,
        `${process.env.PUBLIC_URL}/assets/animations/boring.gltf`,
    )

    // const { jump } = useAnimationLoader()
    const { boring } = useAnimationLoader()
    // const { push } = useAnimationLoader()

    const boringMixer = new AnimationMixer(boring.scene)
    boring.animations.forEach(clip => {
        boringMixer.clipAction(clip, gltf.scene).play()
    })

    useFrame(() => {
        boringMixer.update(0.02)
    })

    const { cannon } = useMyLoader()
    const { crossbow } = useMyLoader()

    return (
        <animated.group position={anim.pos} rotation={anim.rot}>
            <primitive object={gltf.scene}>
                <primitive object={cannon} visible={!!data.hasCannon} />
                <primitive object={crossbow} visible={!!data.hasGrapple} />
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
