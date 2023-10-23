import { MutableRefObject, useLayoutEffect, useRef, useState } from "react";
import Slider from "./components/Slider";
import Particles from "./components/Particles";
import { Canvas } from "@react-three/fiber";

function App() {
  const [size, setSize] = useState<number[]>([]);
  const ref = useRef<HTMLElement|null>(null) as MutableRefObject<HTMLInputElement>;
  
  useLayoutEffect(() => {
    if(ref.current != null) {
      let current = (ref.current as HTMLElement);
      setSize([current.clientWidth, current.clientHeight]);
    }
  }, []);

  return (
    <>
    <Slider encoded />
    <Slider />
    <div id="container" ref={ref}>
      <Canvas >
        <Particles width={size[0]} height={size[1]}/>
      </Canvas>
    </div>
    </>
  )
}

export default App
