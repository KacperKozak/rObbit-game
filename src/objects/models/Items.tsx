import { useFrame, useLoader } from 'react-three-fiber'
import React, { useState, useRef, Suspense } from 'react'
import { Vector3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export const Asset = (props: any) => {
    const gltf = useLoader(GLTFLoader, '/assets/robot_modeling_test012_gl.gltf')
    console.log('gltf', gltf.scene)
    gltf.scene.children[0].castShadow = true
    gltf.scene.scale.set(0.5, 0.5, 0.5)
    return <primitive object={gltf.scene} dispose={null} color={props.color} />
}

export const Player = (props: { color: string }) => {
    return (
        <Suspense
            fallback={
                <mesh>
                    <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial attach="material" color={props.color} />
                </mesh>
            }
        >
            <Asset castShadow {...props} />
        </Suspense>
    )
}
