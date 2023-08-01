import React, { useEffect, useState, useRef } from 'react';
import { notes, walkingOnSunshine, heyJoe, heyJude } from '../utils/Notes.js';
import '../css/musicPlayer.css';
import { getStoredChordName } from "../utils/Funcs";

const MusicPlayer = ({ setCurrentNoteIndex, chordPlayer }) => {
    const bpm = 60;

    const sequence = useRef(notes);
    const [audioContextStarted, setAudioContextStarted] = useState(false);
    const audioContextStartedRef = useRef(false);
    const currentNoteIndexRef = useRef(0);

    useEffect(() => {
        let cleanupFunction;
        if (!audioContextStarted) {
            return
        }

        async function callPlayMelody() {
            cleanupFunction = await playMelody();
        }

        callPlayMelody().then(r => {
            return () => {
                setAudioContextStarted(false);
                if (cleanupFunction) {
                    cleanupFunction();
                }
            };
        });
    }, [audioContextStarted]);

    const startAudioContext = (seq) => {
        currentNoteIndexRef.current = 0;
        if (audioContextStartedRef.current) {
            sequence.current = seq;
        } else {
            sequence.current = seq;
            setAudioContextStarted(true);
            audioContextStartedRef.current = true;
        }
    };

    const stopMelody = async () => {
        setAudioContextStarted(false);
        audioContextStartedRef.current = false;
        setCurrentNoteIndex(-1);
    };

    const playMelody = () => {
        setCurrentNoteIndex(0);
        let previousPlayer = null;

        const playNote = () => {
            if (!audioContextStartedRef.current) {
                return;
            }


            if (previousPlayer) {
                previousPlayer.pause();
            }
            console.log(`${process.env.PUBLIC_URL}/sounds/piano/${getStoredChordName(sequence.current[currentNoteIndexRef.current])}.mp3`);
            let player = new Audio(
                `${process.env.PUBLIC_URL}/sounds/piano/${getStoredChordName(sequence.current[currentNoteIndexRef.current])}.mp3`
            );
            previousPlayer = player;
            player.play().then(r => {});
            setCurrentNoteIndex(notes.indexOf(sequence.current[currentNoteIndexRef.current]));
            currentNoteIndexRef.current = (currentNoteIndexRef.current + 1) % sequence.current.length;
            setTimeout(playNote, (60 / bpm) * 1000);
        };

        playNote();

        // Return a cleanup function to stop the current melody
        return () => {
            audioContextStartedRef.current = false;
        };
    };

    return (
        <div className="music-player-container">
            <button onClick={() => startAudioContext(notes)}>Play Clockwise</button>
            <button onClick={stopMelody}>Stop Melody</button>
            <button onClick={() => startAudioContext(walkingOnSunshine)}>Play Walking On Sunshine</button>
            <button onClick={() => startAudioContext(heyJoe)}>Play Hey Joe</button>
            <button onClick={() => startAudioContext(heyJude)}>Play Hey Jude</button>
        </div>
    );
};

export default MusicPlayer;
