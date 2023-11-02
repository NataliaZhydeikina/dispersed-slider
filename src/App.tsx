import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import Slider from "./components/Slider";
import Particles from "./components/Particles";
import ParticlesBackground from "./components/ParticlesBackground";
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
  
  const [time, setTime] = useState(-2*(360+200));
  const [opacity, setOpacity] = useState(1);

  function checkIfActive() {
    let half = size[0]/2;
    let sliderWidth = 360;
    let gap = 200;
    let whole = sliderWidth+gap;
    let tempPos = time + whole*10;
    let curPos = tempPos%whole;
    let center = curPos>(half - sliderWidth);
    if(curPos>half) center = false;
    return center;
  }

  useEffect(() => {
      const interval = setInterval(() => {
        if(time>0) setTime(-2*(360+200));
        setTime(t=>t+1);
      }, 10);
      setOpacity(checkIfActive()?1:0);

      return () => clearInterval(interval);
  }, [time]);

 
  return (
    <>
    <div className="back">
      <Canvas>
        <ParticlesBackground width={size[0]} height={size[1]}/>
      </Canvas>
    </div>
    <Slider time={time} encoded />
    <Slider time={time} />
    <div id="container" ref={ref}>
      <div className="realseparator" style={{opacity: 1-opacity}}></div>
      <div style={{opacity}} className="separator"></div>
      <Canvas style={{opacity}}>
        <Particles width={size[0]} height={size[1]}/>
      </Canvas>
    </div>
    </>
  )
}

export default App
