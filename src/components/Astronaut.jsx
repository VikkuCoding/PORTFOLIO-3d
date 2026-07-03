import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Center, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function AstronautModel() {
  const { scene } = useGLTF("/Astronaut.glb");

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <Center>
        <primitive
          object={scene}
          scale={80}
          rotation={[0, Math.PI, 0]}
        />
      </Center>
    </Float>
  );
}

useGLTF.preload("/Astronaut.glb");

export default function Astronaut() {
  return (
    <div className="w-full h-[650px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={3} />

        <Suspense fallback={null}>
          <AstronautModel />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}