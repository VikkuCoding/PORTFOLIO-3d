import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Petal = ({ position, speed, offset }) => {
  const ref = useRef();
  useFrame((state) => {
    ref.current.position.y -= speed;
    ref.current.rotation.x += 0.02;
    ref.current.rotation.z += 0.01;
    ref.current.position.x += Math.sin(state.clock.elapsedTime + offset) * 0.005;
    if (ref.current.position.y < -5) {
      ref.current.position.y = 5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <circleGeometry args={[0.1, 8]} />
      <meshStandardMaterial color="#8B1A1A" side={THREE.DoubleSide} transparent opacity={0.8} />
    </mesh>
  );
};

const petalData = Array.from({ length: 15 }, () => ({
  position: [
    (Math.random() - 0.5) * 4,
    Math.random() * 8 - 2,
    (Math.random() - 0.5) * 2,
  ],
  speed: 0.005 + Math.random() * 0.01,
  offset: Math.random() * Math.PI * 2,
}));

const Rose = ({ scrollY }) => {
  const rose = useGLTF("./rose.glb");
  const roseRef = useRef();

  useFrame(() => {
    const targetRotation = scrollY * 0.01;
    roseRef.current.rotation.y += (targetRotation - roseRef.current.rotation.y) * 0.05;
    roseRef.current.rotation.y += 0.002;
  });

  return (
    <group>
      <primitive
        ref={roseRef}
        object={rose.scene}
        scale={0.08}
        position={[0, -1, 0]}
      />
      {petalData.map((petal, i) => (
        <Petal key={i} {...petal} />
      ))}
    </group>
  );
};

const ComputersCanvas = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      camera={{ position: [0, 2, 15], fov: 40 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-10, -10, -10]} color="#C5A028" intensity={1} />
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} enableRotate={false} />
        <Rose scrollY={scrollY} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;