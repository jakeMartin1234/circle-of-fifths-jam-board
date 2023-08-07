import React, {useEffect, useState} from 'react';
import '../css/doughnut.css';
import { songs } from '../utils/Songs.js';
import { notes } from '../utils/Notes.js';
import { getDoughnutStyleOuter, getDoughnutStyleInner } from "../utils/Funcs";

const doughnutSegmentPath = "M40.85,50" +
                        "A31,31 0 0,1 59.15,50" +
                        "L56.6,60.5" +
                        "A25,25 0 0,0 43.4,60.5" +
                        "Z";

const Doughnut = ({ currentNoteIndex, playButtonNote }) => {

    const [isAnimating, setIsAnimating] = useState(false);
    const outerNotes = songs.clockwise.sequence;
    const innerNotes = songs.innerClockwise.sequence;

    const outerNotePositions = {
        C: {
            x: 47.6,
            y: 53.5
        },
        G: {
            x: 47,
            y: 53.5
        },
        D: {
            x: 46.6,
            y: 52.8
        },
        A: {
            x: 46.4,
            y: 52.3
        },
        E: {
            x: 47.6,
            y: 52.4
        },
        B: {
            x: 47.6,
            y: 52
        },
        Gb: {
            x: 45,
            y: 51.6
        },
        Db: {
            x: 45.5,
            y: 51.6
        },
        Ab: {
            x: 46,
            y: 51.6
        },
        Eb: {
            x: 47,
            y: 52
        },
        Bb: {
            x: 46.5,
            y: 52.5
        },
        F: {
            x: 47.6,
            y: 53.5
        }
    }

    const innerNotePositions = {
        Am: {
            x: 44.6,
            y: 53.5
        },
        Em: {
            x: 45,
            y: 53.5
        },
        Bm: {
            x: 44,
            y: 52.8
        },
        FShm: {
            x: 42,
            y: 52.3
        },
        CShm: {
            x: 41.3,
            y: 52.4
        },
        GShm: {
            x: 42,
            y: 51
        },
        Ebm: {
            x: 43,
            y: 50.5
        },
        Bbm: {
            x: 43.5,
            y: 50.2
        },
        Fm: {
            x: 46,
            y: 51.6
        },
        Cm: {
            x: 47,
            y: 52
        },
        Gm: {
            x: 46.5,
            y: 52.5
        },
        Dm: {
            x: 47.6,
            y: 53.5
        }
    }

    useEffect(() => {
        setIsAnimating(true);
    }, []);

    const getSvg = () => {
        return (
        <svg viewBox="0 0 100 100" width='90%' xmlns="http://www.w3.org/2000/svg">
            {outerNotes.map((note, index) => {
                    let fill = '#ffe135';
                    const styles = getDoughnutStyleOuter(currentNoteIndex, isAnimating, index);
                    if (notes.indexOf(note) === currentNoteIndex) {
                        fill = '#b24bf3';
                    }

                    let displayText = outerNotes[index]
                    if (displayText.length === 2) {
                        displayText = displayText[0] + '\u266D';
                    }
                    return (
                        // eslint-disable-next-line
                        <a onClick={() => playButtonNote(note)}
                           key={index}
                           onMouseOver={(e) => e.target.style = {cursor: 'pointer'}}
                        >
                            <g style={styles[0]}>
                                <path
                                    key={index}
                                    d={doughnutSegmentPath}
                                    fill={fill}
                                />
                            </g>
                            <g style={styles[1]}>
                                <text x={outerNotePositions[note].x}
                                      y={outerNotePositions[note].y}
                                      fontSize="0.4rem"
                                      fontFamily='Roboto'
                                >
                                    {displayText}
                                </text>
                            </g>
                        </a>
                    )})}
            {innerNotes.map((note, index) => {
                let fill = '#faf0be';
                const styles = getDoughnutStyleInner(currentNoteIndex, isAnimating, index)
                if (notes.indexOf(note) === currentNoteIndex) {
                    fill = '#b24bf3';
                }

                let displayText = innerNotes[index]
                if (displayText.length === 3) {
                    displayText = displayText[0] + '\u266Dm';
                }
                if (displayText.length === 4) {
                    displayText = displayText[0] + '#m';
                }
                return (
                    // eslint-disable-next-line
                    <a onClick={() => playButtonNote(note)}
                       key={index}
                    >
                        <g style={styles[0]}>
                            <path
                                key={index}
                                d={doughnutSegmentPath}
                                fill={fill}
                            />
                        </g>
                        <g style={styles[1]}>
                            <text x={innerNotePositions[note].x}
                                  y={innerNotePositions[note].y}
                                  fontSize="0.4rem"
                                  fontFamily='Roboto'
                            >
                                {displayText}
                            </text>
                        </g>
                    </a>
                )})}
            </svg>
        )
    }

    return (
        getSvg()
    );
};

export default Doughnut;
