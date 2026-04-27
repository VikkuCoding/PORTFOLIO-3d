import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, RoundedBox } from "@react-three/drei";

const RetroTV = ({ scrollY }) => {
  const tvRef = useRef();

  useFrame((state) => {
    tvRef.current.rotation.y = scrollY * 0.002;
    tvRef.current.rotation.y += Math.sin(state.clock.elapsedTime * 0.3) * 0.001;
    tvRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={tvRef}>
      {/* TV Body */}
      <RoundedBox args={[3.5, 2.8, 1.5]} radius={0.2} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B1A1A" roughness={0.3} metalness={0.4} />
      </RoundedBox>

      {/* Screen bezel */}
      <RoundedBox args={[2.6, 2.0, 0.1]} radius={0.1} smoothness={4} position={[-0.3, 0.1, 0.78]}>
        <meshStandardMaterial color="#2a1a0a" roughness={0.5} metalness={0.2} />
      </RoundedBox>

      {/* Screen */}
      <RoundedBox args={[2.3, 1.7, 0.05]} radius={0.08} smoothness={4} position={[-0.3, 0.1, 0.84]}>
        <meshStandardMaterial color="#C5A028" emissive="#C5A028" emissiveIntensity={0.3} roughness={0.1} metalness={0.1} />
      </RoundedBox>

      {/* Screen static effect */}
      <RoundedBox args={[2.3, 1.7, 0.02]} radius={0.08} smoothness={4} position={[-0.3, 0.1, 0.86]}>
        <meshStandardMaterial color="#F5ECD2" transparent opacity={0.1} roughness={1} />
      </RoundedBox>

      {/* Right panel for controls */}
      <mesh position={[1.3, 0, 0]}>
        <boxGeometry args={[0.8, 2.8, 1.4]} />
        <meshStandardMaterial color="#7a1515" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Big knob 1 */}
      <mesh position={[1.3, 0.5, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 32]} />
        <meshStandardMaterial color="#C5A028" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Big knob 2 */}
      <mesh position={[1.3, -0.2, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 32]} />
        <meshStandardMaterial color="#C5A028" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Small knob */}
      <mesh position={[1.3, -0.7, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Antenna left */}
      <mesh position={[-0.5, 2.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.03, 0.03, 1.8, 16]} />
        <meshStandardMaterial color="#C5A028" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Antenna right */}
      <mesh position={[0.5, 2.2, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.03, 0.03, 1.8, 16]} />
        <meshStandardMaterial color="#C5A028" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Antenna base */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* TV Legs */}
      <mesh position={[-1, -1.7, 0.3]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.6, 16]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[1, -1.7, 0.3]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.6, 16]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[-1, -1.7, -0.3]} rotation={[-0.2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.6, 16]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[1, -1.7, -0.3]} rotation={[-0.2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.6, 16]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Speaker grille dots */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((x, i) => (
        <mesh key={i} position={[x - 0.3, -0.8, 0.76]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#2a1a0a" roughness={0.8} />
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
      <pointLight position={[0, 0, 5]} color="#F5ECD2" intensity={0.5} />
      <OrbitControls enableZoom={false} enableRotate={true} autoRotate autoRotateSpeed={1} />
      <RetroTV scrollY={scrollY} />
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;