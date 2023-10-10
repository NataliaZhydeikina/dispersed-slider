import { useEffect, useState } from 'react';
import "./Slider.css";
import TextSlide from '../TextSlide';
import ImageSlide from '../ImageSlide';

export default function Slider({encoded}:{encoded?: boolean}) {
    const [time, setTime] = useState(-2*(360+200));

    useEffect(() => {
        const interval = setInterval(() => {
            if(time>0) setTime(-2*(360+200));
            setTime(t=>t+1);
        }, 10);

        return () => clearInterval(interval);
    }, [time]);


    return <div className={`slider__parent ${encoded && "encoded"}`}>
        <div className="slider">
            <div className="slider__scroller" style={{transform: `translateX(${time}px)`}}>
            {[...Array(5)].map((x, i) => encoded?
                <TextSlide key={i} />:
                <ImageSlide key={i} />
            )}
            </div>
        </div>
    </div>
}