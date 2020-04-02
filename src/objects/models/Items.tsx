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

export const TileFactory = (color: string) => ({ xy, elevation }: RenderComponentProps) => {
    // Set up state for the hovered and active state]
    // const [active, setActive] = useState(false)

    console.log('elevation', elevation)

    return (
        <mesh
            receiveShadow={true}
            // scale={active ? [0.9, 0.9, 0.9] : [1, 1, 1]}
            // onClick={e => {
            //     console.log(e)
            //     play('button', 0.5)
            //     return setActive(!active)
            // }}
            position={[xy[0], 0, xy[1]]}
        >
            <boxBufferGeometry attach="geometry" args={[1, elevation, 1]} />
            <meshStandardMaterial attach="material" color={color} />
        </mesh>
    )
}

interface AssetProps extends RenderComponentProps {
    url: string
}

const Asset = ({ url, xy, elevation }: AssetProps) => {
    const gltf = useLoader(GLTFLoader, `/assets/${url}`)
    gltf.scene.children[0].castShadow = true
    gltf.scene.scale.set(0.5, 0.5, 0.5)
    gltf.scene = gltf.scene.clone()
    return <primitive object={gltf.scene} dispose={null} position={[xy[0], elevation, xy[1]]} />
}

// export const box = (props: RenderComponentProps) => {
//     return (
//         <mesh>
//             <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
//             <meshStandardMaterial attach="material" color={props.color} />
//         </mesh>
//     )
// }
