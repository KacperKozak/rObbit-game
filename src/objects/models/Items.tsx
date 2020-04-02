import { useFrame, useLoader } from 'react-three-fiber'
import React, { useState, useRef, Suspense } from 'react'
import { Vector3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export const Asset = (props: { color: string; url: string }) => {
    const gltf = useLoader(GLTFLoader, `/assets/${props.url}`)
    console.log('gltf', gltf.scene)
    gltf.scene.children[0].castShadow = true
    gltf.scene.scale.set(0.5, 0.5, 0.5)
    gltf.scene = gltf.scene.clone()
    return <primitive object={gltf.scene} dispose={null} color={props.color} />
}

export const Player = (props: { color: string }) => {
    return <Asset {...props} url="robot_modeling_test012_gl.gltf" />
}

export const Item = (props: { color: string }) => {
    return <Asset {...props} url="rock1.gltf" />
}

export const box = (props: { color: string }) => {
    return (
        <mesh>
            <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial attach="material" color={props.color} />
        </mesh>
    )
}
