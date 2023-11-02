import { OrbitControls, OrthographicCamera, PerspectiveCamera, Points } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import fragmentShader from "./shaders/fragment.frag";
import vertexShader from "./shaders/vertex.vert";
import { useFrame } from "@react-three/fiber";

function rangeRandom(start: number, end:number):number {
  let r = Math.random();
  return r*(end - start) + start;
}
 
export default function Particles({width, height}: {width:number, height: number}) {
  const ref = useRef();
  let aspect = width/height;
  let number = 3000;
  const positions = new Float32Array(number*3);
  const sizes = new Float32Array(number);
  const velocity = new Float32Array(number);
  const distance = new Float32Array(number);

    for (let i = 0; i < number; i++) {
      let i3 = i*3;
      positions[i3] = 0;
      positions[i3+1] = Math.random()-0.5 + 0.5*(Math.random()-0.5);
      positions[i3+2] = 0;
      sizes[i] = Math.random()*10;
      velocity[i] = rangeRandom(0.1, 1);
      distance[i] = rangeRandom(0.1, 1);
    }
  const positionsBuffer = new THREE.BufferAttribute(positions, 3);
  const sizeBuffer = new THREE.BufferAttribute(sizes, 1);
  const velocityBuffer = new THREE.BufferAttribute(velocity, 1);
  const distanceBuffer = new THREE.BufferAttribute(distance, 1);

  const data = useMemo(
    () => ({
      uniforms: {
        time: { value: 0.0 }
      },
      fragmentShader,
      vertexShader
    }),
    []
  );

  useFrame((state) => {
    ref.current.material.uniforms.time.value = state.clock.elapsedTime;
  });

    return <>
      <PerspectiveCamera makeDefault position={[0, 0, 2]} fov={25}
       aspect={aspect} near={0.01} far={1000} />
      <spotLight intensity={3} position={[0, 0, 1]} />
      <spotLight intensity={3} position={[0, 0, -1]} />
      <ambientLight intensity={2} />
      {/* <mesh>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color='yellow' side={THREE.DoubleSide} /> 
      </mesh>   */}
      {/* <Points positions={positions} sizes={sizes} ref={ref}>
        <shaderMaterial attach="material" {...data} />
      </Points> */}
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach={"attributes-position"} {...positionsBuffer} />
          <bufferAttribute attach={"attributes-aSize"} {...sizeBuffer} />
          <bufferAttribute attach={"attributes-aVelocity"} {...velocityBuffer} />
          <bufferAttribute attach={"attributes-aDistance"} {...distanceBuffer} />
        </bufferGeometry>
        <shaderMaterial attach="material" {...data} />
      </points>
      <OrbitControls />
    </>
}