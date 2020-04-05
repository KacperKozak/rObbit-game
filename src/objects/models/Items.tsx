import React, { useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { RenderComponentProps, Vector2 } from '../../types/types'
import { AnimationMixer, Group, LoopOnce } from 'three'
import { setInterval } from 'timers'
import { useSpring, animated } from 'react-spring/three'
import { timeInterval } from 'rxjs/operators'

const useMyLoader = () => {
    // const robot = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/robot_model.gltf`)
    const rocket = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/rocket.gltf`)
    const cannon = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/cannon.gltf`)
    const box = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/box.gltf`)
    const rock = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/rock1.gltf`)
    const fence = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/fence.gltf`)
    const arrow = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/arrow.gltf`)
    const crossbow = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/crossbow.gltf`)
    const graund = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/graund.gltf`)
    const wall = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/wall.gltf`)
    const grass = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/grass.gltf`)
    const water = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/water.gltf`)
    const ice = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/ice.gltf`)
    const button = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/button.gltf`)
    const door = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/door.gltf`)
    const wallMetal = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/wall-metal.gltf`)
    const pipe = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/pipe.gltf`)
    const pipeLeft = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/pipe-left.gltf`)
    const pipeRight = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/pipe-right.gltf`)
    const pipePlace = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/pipe-place.gltf`)
    const pipeElement = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/pipe-element.gltf`)
    const pipeUp = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/pipe-down.gltf`)
    const pipeDown = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/pipe-down.gltf`)
    return {
        // robot: robot.scene.clone(),
        rocket: rocket.scene.clone(),
        cannon: cannon.scene.clone(),
        box: box.scene.clone(),
        rock: rock.scene.clone(),
        fence: fence.scene.clone(),
        arrow: arrow.scene.clone(),
        crossbow: crossbow.scene.clone(),
        graund: graund.scene.clone(),
        wall: wall.scene.clone(),
        grass: grass.scene.clone(),
        water: water.scene.clone(),
        ice: ice.scene.clone(),
        button: button.scene.clone(),
        door: door.scene.clone(),
        wallMetal: wallMetal.scene.clone(),
        pipe: pipe.scene.clone(),
        pipeLeft: pipeLeft.scene.clone(),
        pipeRight: pipeRight.scene.clone(),
        pipePlace: pipePlace.scene.clone(),
        pipeElement: pipeElement.scene.clone(),
        pipeUp: pipeUp.scene.clone(),
        pipeDown: pipeDown.scene.clone(),
    }
}
const useAnimationLoader = () => {
    // const jump = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/animations/jump.gltf`)
    const boring = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/animations/boring.gltf`)
    const boom = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/boom.gltf`)

    return {
        // jump,
        boring,
        boom,
    }
}
export const Player = (props: RenderComponentProps) => {
    // const { robot } = useMyLoader()
    return <AnimatieAsset {...props} />
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
    const { boom } = useAnimationLoader()
    return <AnimateSelfAsset {...props} animateModel={boom} />
}
export const Cannon = (props: RenderComponentProps) => {
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
    return <AssetPreload {...props} model={graund} castShadow={false} receiveShadow={true} />
}
export const Wall = (props: RenderComponentProps) => {
    const { wall } = useMyLoader()
    return <AssetPreload {...props} model={wall} castShadow={false} receiveShadow={true} />
}
export const Grass = (props: RenderComponentProps) => {
    const { grass } = useMyLoader()
    return <AssetPreload {...props} model={grass} castShadow={false} receiveShadow={true} />
}
export const Water = (props: RenderComponentProps) => {
    const { water } = useMyLoader()
    return <AssetPreload {...props} model={water} castShadow={false} receiveShadow={true} />
}
export const Ice = (props: RenderComponentProps) => {
    const { ice } = useMyLoader()
    return <AssetPreload {...props} model={ice} castShadow={true} receiveShadow={true} />
}
export const Button = (props: RenderComponentProps) => {
    const { button } = useMyLoader()
    return <AssetPreload {...props} model={button} castShadow={true} receiveShadow={true} />
}
export const Door = (props: RenderComponentProps) => {
    const { door } = useMyLoader()
    return <AssetPreload {...props} model={door} castShadow={true} receiveShadow={true} />
}
export const WallMetal = (props: RenderComponentProps) => {
    const { wallMetal } = useMyLoader()
    return <AssetPreload {...props} model={wallMetal} castShadow={true} receiveShadow={true} />
}
export const Pipe = (props: RenderComponentProps) => {
    const { pipe } = useMyLoader()
    return <AssetPreload {...props} model={pipe} castShadow={true} receiveShadow={true} />
}
export const PipeLeft = (props: RenderComponentProps) => {
    const { pipeLeft } = useMyLoader()
    return <AssetPreload {...props} model={pipeLeft} castShadow={true} receiveShadow={true} />
}
export const PipeRight = (props: RenderComponentProps) => {
    const { pipeRight } = useMyLoader()
    return <AssetPreload {...props} model={pipeRight} castShadow={true} receiveShadow={true} />
}
export const PipeDown = (props: RenderComponentProps) => {
    const { pipeDown } = useMyLoader()
    return <AssetPreload {...props} model={pipeDown} castShadow={true} receiveShadow={true} />
}
export const PipeUp = (props: RenderComponentProps) => {
    const { pipeUp } = useMyLoader()
    return <AssetPreload {...props} model={pipeUp} castShadow={true} receiveShadow={true} />
}
export const PipePlace = (props: RenderComponentProps) => {
    const { pipePlace } = useMyLoader()
    return <AssetPreload {...props} model={pipePlace} castShadow={true} receiveShadow={true} />
}
export const PipeElement = (props: RenderComponentProps) => {
    const { pipeElement } = useMyLoader()
    return <AssetPreload {...props} model={pipeElement} castShadow={true} receiveShadow={true} />
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

interface AssetsProps extends RenderComponentProps {
    color?: string
    castShadow?: boolean
    receiveShadow?: boolean
    elevationFix?: number
}

interface PreloadAssetProps extends AssetsProps {
    model: GLTF['scene']
}
interface PreloadAssetAnimateProps extends AssetsProps {
    animateModel: GLTF
}

const AssetPreload = ({
    model,
    instance: { xy, elevation, rotation, data },
    castShadow = true,
    receiveShadow = true,
    elevationFix = 0,
}: PreloadAssetProps) => {
    const anim = useSpring({
        pos: [xy[0], elevation + elevationFix, xy[1]],
        rot: [0, vectorToThree(rotation), 0],
    })

    if (castShadow) model.children.map(el => (el.castShadow = true))
    if (receiveShadow) model.children.map(el => (el.receiveShadow = true))
    model.scale.set(0.5, 0.5, 0.5)
    if (model.children.length > 1) {
        // data.open && model.children[1].position.setZ(1.5)
        data.open && model.children[1].position.setY(2)
        data.active && model.children[1].position.setX(-0.2)
    }
    return <animated.primitive object={model} position={anim.pos} rotation={anim.rot} />
}

const AnimatieAsset = ({
    instance: { xy, elevation, rotation, data },
    castShadow = true,
    receiveShadow = true,
}: AssetsProps) => {
    const anim = useSpring({
        pos: [xy[0], elevation, xy[1]],
        rot: [0, vectorToThree(rotation), 0],
    })

    const robot = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/assets/robot_model.gltf`)
    const model = robot.scene
    model.scale.set(0.5, 0.5, 0.5)
    if (castShadow) model.children.map(el => (el.castShadow = true))
    if (receiveShadow) model.children.map(el => (el.receiveShadow = true))

    // const { jump } = useAnimationLoader()
    const { boring } = useAnimationLoader()
    // const { push } = useAnimationLoader()

    const boringMixer = new AnimationMixer(boring.scene)
    boring.animations.forEach(clip => {
        boringMixer.clipAction(clip, model).play()
    })

    useFrame(() => {
        boringMixer.update(0.02)
    })

    const { cannon } = useMyLoader()
    const { crossbow } = useMyLoader()

    return (
        <animated.group position={anim.pos} rotation={anim.rot}>
            <primitive object={model}>
                <primitive object={cannon} visible={!!data.hasCannon} />
                <primitive object={crossbow} visible={!!data.hasGrapple} />
            </primitive>
        </animated.group>
    )
}

const AnimateSelfAsset = ({
    animateModel,
    instance: { xy, elevation, rotation, data },
    castShadow = true,
    receiveShadow = true,
}: PreloadAssetAnimateProps) => {
    const anim = useSpring({
        pos: [xy[0], elevation, xy[1]],
        rot: [0, vectorToThree(rotation), 0],
    })

    const gltfScene = animateModel.scene.clone()
    // useEffect(() => {
    if (castShadow) gltfScene.children[0].castShadow = true
    if (receiveShadow) gltfScene.children[0].receiveShadow = true

    gltfScene.scale.set(0.6, 0.6, 0.6)

    const mixer = new AnimationMixer(gltfScene)

    animateModel.animations.forEach((clip, index) => {
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
