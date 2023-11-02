import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { MutableRefObject, useMemo, useRef } from "react";
import fragmentShader from "./shaders/fragment.frag";
import vertexShader from "./shaders/vertex.vert";
import { useFrame } from "@react-three/fiber";

function rangeRandom(start: number, end:number):number {
  let r = Math.random();
  return r*(end - start) + start;
}
 
export default function ParticlesBackground({width, height}: {width:number, height: number}) {
  const ref = useRef<THREE.Points|null>(null) as MutableRefObject<THREE.Points>;
  let aspect = width/height;
  let number = 1000;
  const positions = new Float32Array(number*3);
  const sizes = new Float32Array(number);
  const velocity = new Float32Array(number);
  const distance = new Float32Array(number);
  const random = new Float32Array(number);

    for (let i = 0; i < number; i++) {
      let i3 = i*3;
      positions[i3] = 0;
      positions[i3+1] = 0.66*(Math.random()-0.5 + 0.5*(Math.random()-0.5));
      positions[i3+2] = 0;
      sizes[i] = rangeRandom(3, 15);
      velocity[i] = rangeRandom(0.1, 1);
      distance[i] = rangeRandom(0.1, 1);
      random[i] = Math.random();
    }
  const positionsBuffer = new THREE.BufferAttribute(positions, 3);
  const sizeBuffer = new THREE.BufferAttribute(sizes, 1);
  const velocityBuffer = new THREE.BufferAttribute(velocity, 1);
  const distanceBuffer = new THREE.BufferAttribute(distance, 1)
  const randomBuffer = new THREE.BufferAttribute(random, 1);

  const data = useMemo(
    () => ({
      uniforms: {
        time: { value: 0.0 }
      },
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      fragmentShader,
      vertexShader
    }),
    []
  );

  useFrame((state) => {
    (ref.current.material as THREE.ShaderMaterial).uniforms.time.value = state.clock.elapsedTime;
  });

    return <>
      <PerspectiveCamera makeDefault position={[0, 0, 2]} fov={25}
       aspect={aspect} near={0.01} far={1000} />
      <spotLight intensity={3} position={[0, 0, 1]} />
      <spotLight intensity={3} position={[0, 0, -1]} />
      <ambientLight intensity={2} />
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach={"attributes-position"} {...positionsBuffer} />
          <bufferAttribute attach={"attributes-aSize"} {...sizeBuffer} />
          <bufferAttribute attach={"attributes-aVelocity"} {...velocityBuffer} />
          <bufferAttribute attach={"attributes-aDistance"} {...distanceBuffer} />
          <bufferAttribute attach={"attributes-aRandom"} {...randomBuffer} />
        </bufferGeometry>
        <shaderMaterial attach="material" {...data} />
      </points>
      <OrbitControls />
    </>
}