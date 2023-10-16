import { useEffect, useState } from "react";

const generateText = ( length: number):JSX.Element => {
    let result: Array<JSX.Element> = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&!@';
    const charactersLength = characters.length;
    let counter = 0;
    while(counter < length) {
        let symbol = characters.charAt(Math.floor(Math.random()*charactersLength));
        result.push(Math.random()>0.95?
        <strong key={counter}>{symbol} </strong>:
        <span key={counter}>{symbol} </span>)
        counter++;
    }
    return <>{result}</>;
};



export default function TextSlide({rerender}: {rerender:boolean}) {
    const [randomText, setRandomText] = useState<JSX.Element>(generateText(800));
    useEffect(() => {
        rerender && setRandomText(generateText(800));
    }, [rerender]);

    return <div className="slide">
        {randomText}
    </div>
}