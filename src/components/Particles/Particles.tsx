import { OrbitControls, OrthographicCamera, PointMaterial, Points, shaderMaterial } from "@react-three/drei";
import fragmentShader from "./shaders/fragment.frag";
import vertexShader from "./shaders/vertex.vert";
import * as THREE from "three";

function rangeRandom(start: number, end:number):number {
  let r = Math.random();
  return r*(end - start) + start;
}
 
export default function Particles({width, height}: {width:number, height: number}) {
    
    let aspect = width/height;
    let number = 3000;
    const material = shaderMaterial(
      {},
      vertexShader,
      fragmentShader,
    );
    const positions = new Float32Array(number*3);
    const sizes = new Float32Array(number);
    const velocity = new Float32Array(number);
    const distance = new Float32Array(number);

    for (let i = 0; i < number; i++) {
      let i3 = i*3;
      positions[i3] = 0;
      positions[i3+1] = Math.random()-0.5 + 0.5*(Math.random()-0.5);
      positions[i3+2] = 0;
      
      sizes[i] = rangeRandom(1, 20);
      velocity[i] = rangeRandom(0.1, 1);
      distance[i] = rangeRandom(0.1, 1);
    }

    return <>
      <OrthographicCamera makeDefault position={[0, 0, 2]}
      zoom={1}
      top={1/2}
      bottom={1/-2}
      left={aspect/-2}
      right={aspect/2}
      near={-100}
      far={1000} />
      <spotLight intensity={3} position={[0, 0, 1]} />
      <spotLight intensity={3} position={[0, 0, -1]} />
      <ambientLight intensity={1} />
      {/* <mesh>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color='yellow' side={THREE.DoubleSide} />
      </mesh> */}
      <Points positions={positions}>
        <PointMaterial vertexColors size={35} sizeAttenuation={false} depthWrite={false} toneMapped={false} />
      </Points>
      <OrbitControls />
    </>
}