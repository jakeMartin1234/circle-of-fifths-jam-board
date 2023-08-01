import React, {useEffect, useState} from 'react';
import '../css/doughnut.css';
import { notes } from '../utils/Notes.js';
import { getStoredChordName, getDoughnutStyle } from "../utils/Funcs";

const Doughnut = ({ currentNoteIndex, animate }) => {

    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
    }, []);

    const getSvg = () => {
        console.log(currentNoteIndex);
        return (
            <svg viewBox="0 0 100 100" width='40rem' height='40rem'>
                {notes.map((note, index) => {
                    let fill = '#ffe135';
                    if (index === currentNoteIndex) {
                        fill = '#ff0000';
                    }

                    let displayText = notes[index]
                    if (displayText.length === 2) {
                        displayText = displayText[0] + '\u266D';
                    }
                    return (
                        <a onClick={() => console.log("clicked")}
                           key={index}
                        >
                            <g style={getDoughnutStyle(currentNoteIndex, isAnimating, index)}>
                                <path
                                    key={index}
                                    d="M41,50
                                       A31,31 0 0,1 59,50
                                       L56.5,60
                                       A35,35 0 0,0 43.5,60
                                       Z"
                                    fill={fill}
                                />
                                <g>
                                    <text x="46.5" y="57" fontSize="0.5rem">
                                        {displayText}
                                    </text>
                                </g>

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
