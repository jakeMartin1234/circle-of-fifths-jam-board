import React, { useEffect, useState, useRef } from 'react';
import { Grid } from "@mui/material";

import { songs } from '../utils/Songs.js';
import { notes } from '../utils/Notes.js';
import { getStoredChordName } from "../utils/Funcs";
import MusicPlayerGridItem from "./MusicPlayerGridItem";
import PlayPauseSelect from "./PlayPauseSelect";
import SliderControl from "./SliderControl";

const MusicPlayer = ({ setCurrentNoteIndex }) => {

    const [ sequence, setSequence ] = useState("hotelCalifornia");
    const [ bpm, setBpm ] = React.useState(50);
    const [ audioContextStarted, setAudioContextStarted ] = useState(false);
    const [ fadeDuration, setFadeDuration ] = React.useState(0.4);
    const [ noteDuration, setNoteDuration ] = React.useState(0.25);
    const [ instrument, setInstrument ] = React.useState("guitar");

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
            setSequence(seq);
        } else {
            setSequence(seq);
            setAudioContextStarted(true);
            audioContextStartedRef.current = true;
        }
    };

    const stopMelody = async () => {
        setAudioContextStarted(false);
        audioContextStartedRef.current = false;
        setCurrentNoteIndex(-1);
    };

    const handleAudioPause = (audio) => {
        if (!audio) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const gainNode = audioContext.createGain();
        const mediaElement = audio;

        gainNode.gain.setValueAtTime(1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + fadeDuration);

        mediaElement.onended = () => {
            // Cleanup the AudioContext and GainNode
            audioContext.close();
            gainNode.disconnect();
        };

        mediaElement.onpause = () => {
            // Pause the media after the fade-out is complete
            mediaElement.pause();
        };

        // Connect the GainNode to the media element source
        const source = audioContext.createMediaElementSource(mediaElement);
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
    };

    const playMelody = () => {
        const currentSequence = songs[sequence].sequence;
        setCurrentNoteIndex(0);
        let previousPlayer = null;
        const bpmPeriod = (60 / bpm) * 1000;
        const playNote = () => {
            if (previousPlayer) {
                handleAudioPause(previousPlayer)
            }
            if (!audioContextStartedRef.current) {
                return;
            }
            console.log(`${process.env.PUBLIC_URL}/sounds/${instrument}/${getStoredChordName(currentSequence[currentNoteIndexRef.current])}.mp3`);
            let player = new Audio(
                `${process.env.PUBLIC_URL}/sounds/${instrument}/${getStoredChordName(currentSequence[currentNoteIndexRef.current])}.mp3`
            );
            console.log("note:" + currentSequence[currentNoteIndexRef.current])
            setTimeout(() => {
                player.volume = 0.60;
                previousPlayer = player;
                player.play().then(r => {});
                setCurrentNoteIndex(notes.indexOf(currentSequence[currentNoteIndexRef.current]));
                currentNoteIndexRef.current = (currentNoteIndexRef.current + 1) % currentSequence.length;
                setTimeout(playNote, bpmPeriod * noteDuration);
            }, bpmPeriod * (1 - noteDuration));
        };

        playNote();

        // Return a cleanup function to stop the current melody
        return () => {
            audioContextStartedRef.current = false;
        };
    };

    return (
        <Grid container
              justify="flex-end"
              alignItems="center"
              spacing={2}
        >
            <MusicPlayerGridItem>
                <PlayPauseSelect sequence={sequence}
                                 setSequence={setSequence}
                                 instrument={instrument}
                                 setInstrument={setInstrument}
                                 stopMelody={stopMelody}
                                 startAudioContext={startAudioContext}
                                 audioContextStarted={audioContextStarted}
                />

            </MusicPlayerGridItem>
            <MusicPlayerGridItem>
                <SliderControl
                    value={bpm}
                    setValue={setBpm}
                    audioContextStarted={audioContextStarted}
                    valueText="BPM"
                    range={[20, 150]}
                    step={1}
                />
                <SliderControl
                    value={noteDuration}
                    setValue={setNoteDuration}
                    audioContextStarted={audioContextStarted}
                    valueText="Note Duration"
                    range={[0, 1]}
                    step={0.25}
                />
                <SliderControl
                    value={fadeDuration}
                    setValue={setFadeDuration}
                    audioContextStarted={audioContextStarted}
                    valueText="Fade Duration"
                    range={[0.1, 1.0]}
                    step={0.01}
                />
            </MusicPlayerGridItem>
        </Grid>

    );
};

export default MusicPlayer;
