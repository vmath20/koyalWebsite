"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"

function Model({ url }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef()

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5 // Adjust rotation speed here
    }
  })

  return <primitive ref={modelRef} object={scene} />
}

export default function ModelViewer({ modelUrl = "/model.glb" }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="w-full h-[70vh] relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-lg">Loading 3D Model...</div>
        </div>
      )}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} onCreated={() => setIsLoading(false)}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Model url={modelUrl} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

