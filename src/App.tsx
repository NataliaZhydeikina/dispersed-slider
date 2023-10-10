import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Slider from "./components/Slider";

function App() {

  return (
    <>
    <Slider encoded />
    <Slider />
    <Canvas camera={{position:[0,0,2], near:0.001, far:5}}>
      <spotLight intensity={3} position={[0, 0, 1]} />
      <spotLight intensity={3} position={[0, 0, -1]} />
      <ambientLight intensity={1} />
      <color attach="background" args={["black"]} />
      <mesh>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color='yellow' side={THREE.DoubleSide} />
      </mesh>
      <OrbitControls />
    </Canvas>
    </>
  )
}

export default App
