import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

export default function Particles({width, height}: {width:number, height: number}) {
    let aspect = width/height;
    
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
    <mesh>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color='yellow' side={THREE.DoubleSide} />
    </mesh>
    <OrbitControls />
    </>
}