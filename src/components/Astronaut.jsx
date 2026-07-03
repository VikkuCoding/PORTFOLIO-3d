import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";import { OrbitControls, useGLTF, Center } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/Astronaut.glb");
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.12;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.018}
      position={[0, -1.55, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
}


export default function Astronaut() {
  return (
    <div className="w-full h-[600px] relative">
      {/* Glow */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-96 h-96 rounded-full bg-[#C5A028]/10 blur-3xl" />
      </div>

      <Canvas camera={{ position: [0, 0.3, 7], fov: 35 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[2, 2, 2]} intensity={2} />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}