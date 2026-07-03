import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";

function Model() {
 const model = useGLTF("/Astronaut.glb");
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.position.y = Math.sin(clock.elapsedTime) * 0.15;
    ref.current.rotation.y += 0.003;
  });

  return (
   <Center>
  <primitive
    ref={ref}
    object={model.scene}
    scale={0.35}
  />
</Center>
  );
}

export default function Astronaut() {
  return (
    <div className="w-full h-[600px] relative">
      {/* Glow */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-96 h-96 rounded-full bg-[#C5A028]/10 blur-3xl" />
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
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