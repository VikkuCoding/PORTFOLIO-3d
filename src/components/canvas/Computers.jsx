import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";

const FloatingRings = ({ scrollY }) => {
  const group = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const ring4 = useRef();
  const core = useRef();

  useFrame((state) => {
    group.current.rotation.y = scrollY * 0.002;
    ring1.current.rotation.x += 0.01;
    ring1.current.rotation.z += 0.005;
    ring2.current.rotation.y += 0.008;
    ring2.current.rotation.x -= 0.003;
    ring3.current.rotation.z += 0.006;
    ring3.current.rotation.y -= 0.007;
    ring4.current.rotation.x += 0.004;
    ring4.current.rotation.z -= 0.009;
    core.current.rotation.y += 0.02;
    core.current.rotation.x += 0.01;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <group ref={group}>
      <mesh ref={ring1}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#8B1A1A" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshStandardMaterial color="#C5A028" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={ring3} rotation={[0, Math.PI / 3, Math.PI / 4]}>
        <torusGeometry args={[1.5, 0.04, 16, 100]} />
        <meshStandardMaterial color="#8B1A1A" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh ref={ring4} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1, 0.04, 16, 100]} />
        <meshStandardMaterial color="#C5A028" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#8B1A1A" metalness={1} roughness={0} />
      </mesh>
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 2.5,
            Math.sin((i / 8) * Math.PI * 2) * 0.5,
            Math.sin((i / 8) * Math.PI * 2) * 2.5,
          ]}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#8B1A1A" : "#C5A028"}
            metalness={1}
            roughness={0}
          />
        </mesh>
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
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-10, -10, -10]} color="#C5A028" intensity={1} />
      <pointLight position={[10, -10, 10]} color="#8B1A1A" intensity={0.5} />
      <OrbitControls enableZoom={false} enableRotate={false} />
      <FloatingRings scrollY={scrollY} />
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;