import React, { useEffect, useState } from 'react';
import Doughnut from "./components/Dougnut";
import './App.css';
import * as Tone from "tone";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {


    const [currentNoteIndex, setCurrentNoteIndex] = React.useState(0);
    const [animate, setAnimate] = useState(true);
    const [showPlayer, setShowPlayer] = useState(false);

    useEffect(() => {
        Tone.Buffer.load("./sounds/piano/cMajor.mp3").then(r => {})
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimate(false);
            setShowPlayer(true);

        }, 2000);
        return () => clearTimeout(timer);
    }, [currentNoteIndex]);

    return (
        <div className="container">
            <h1>Circle of Fifths Jam Board</h1>
            <Doughnut currentNoteIndex={currentNoteIndex} animate={animate} />
            {showPlayer && <MusicPlayer setCurrentNoteIndex={setCurrentNoteIndex}/>}
        </div>
    );
};

export default App;
