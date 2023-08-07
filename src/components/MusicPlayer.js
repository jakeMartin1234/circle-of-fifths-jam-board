import React, { useEffect, useState, useRef } from 'react';
import { Grid } from "@mui/material";

import { songs } from '../utils/Songs.js';
import { notes } from '../utils/Notes.js';
import { getStoredChordName } from "../utils/Funcs";
import MusicPlayerGridItem from "./MusicPlayerGridItem";
import PlayPauseSelect from "./PlayPauseSelect";
import SliderControl from "./SliderControl";

const MusicPlayer = ({ setCurrentNoteIndex, fadeDuration, setFadeDuration,
                          instrument, setInstrument, handleAudioPause, audioSource }) => {

    const [ sequence, setSequence ] = useState("hotelCalifornia");
    const [ audioContextStarted, setAudioContextStarted ] = useState(false);
    const [ noteDuration, setNoteDuration ] = React.useState(0.75);
    const audioContextStartedRef = useRef(false);
    const [ bpm, setBpm ] = React.useState(30);

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
        if (!audioContextStartedRef.current) {
            handleAudioPause(audioSource.current);
        }
        audioContextStartedRef.current = false;
        setCurrentNoteIndex(-1);
    };

    const playMelody = () => {
        const currentSequence = songs[sequence].sequence;
        setCurrentNoteIndex(0);
        const bpmPeriod = (60 / bpm) * 1000;
        const playNote = () => {
            if (audioSource.current) {
                handleAudioPause(audioSource.current)
            }
            if (!audioContextStartedRef.current) {
                audioSource.current = null;
                return;
            }
            audioSource.current = new Audio(`${process.env.PUBLIC_URL}/sounds/${instrument}/${getStoredChordName(currentSequence[currentNoteIndexRef.current])}.mp3`);

            console.log("note:" + currentSequence[currentNoteIndexRef.current])
            setTimeout(() => {
                audioSource.current.volume = 0.60;
                audioSource.current.play().then(r => {});
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
                    range={[5, 150]}
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
