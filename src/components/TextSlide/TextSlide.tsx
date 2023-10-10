import { useState } from "react";

const generateText = (length: number):JSX.Element => {
    let result: Array<JSX.Element> = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&!@';
    const charactersLength = characters.length;
    let counter = 0;
    while(counter < length) {
        let symbol = characters.charAt(Math.floor(Math.random()*charactersLength));
        result.push(Math.random()>0.95?
        <strong key={counter}>${symbol} </strong>:
        <span key={counter}>{symbol} </span>)
        counter++;
    }
    return <>{result}</>;
};

export default function TextSlide() {
    const [randomText, setRandomText] = useState(generateText(400));
    return <div className="slide">
        {randomText}
    </div>
}