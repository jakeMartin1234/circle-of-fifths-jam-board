import React from 'react';
import '../css/doughnut.css';
import { notes } from '../utils/Notes.js';

const Doughnut = ({ currentNoteIndex, animate }) => {

    const transforms = [];
    let counter = 0;
    for (let i = 0; i < 360; i += 30) {
        let scale= 1;
        if (counter === currentNoteIndex) {
            scale= 1.3;
        }
        transforms.push(`rotate(${i}deg) translateY(-26%) scaleY(${scale}) translateY(-10px)`);
        counter++;
    }
    const textTransforms = [];
    counter = 0;
    for (let i = 0; i < 360; i += 30) {
        let scale= 0.5;
        if (counter === currentNoteIndex) {
            scale = 0.6;
        }
        textTransforms.push(`rotate(${i}deg) translateY(-33%) rotate(-${i}deg) scale(${scale})`);
        counter++;
    }

    let textClass = "doughnut-segment-text";
    let segmentClass = "doughnut-segment";

    if (!animate) {
        textClass += "-no-animate";
        segmentClass += "-no-animate";
    }

    const getSvg = () => {
        console.log(currentNoteIndex);
        return (
            <svg viewBox="0 0 100 100" width='40rem' height='40rem'>
                {transforms.map((transform, index) => {
                    let fill = '#ffe135';
                    if (index === currentNoteIndex) {
                        fill = '#ff0000';
                    }
                    return (
                        <a onClick={() => console.log("clicked")} key={index}>
                            <g
                                style={{ '--transform': transform,
                                    '--transform-text': textTransforms[index]}}>
                                <path
                                    className={segmentClass}
                                    key={index}
                                    d="M41,50
                                       A31,31 0 0,1 59,50
                                       L56.5,60
                                       A35,35 0 0,0 43.5,60
                                       Z"
                                    fill={fill}
                                />
                                <text x="42" y="56" className={textClass}>
                                    {notes[index].slice(0, -1)}
                                </text>
                            </g>
                        </a>
                    )})}
            </svg>
        )
    }
    return (
        <div className="doughnut-container">
            {getSvg()}
        </div>
    );
};

export default Doughnut;
