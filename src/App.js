import React, { useEffect, useState } from 'react';
import Doughnut from "./components/Dougnut";
import './App.css';
import MusicPlayer from "./components/MusicPlayer";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Container, Grid, Typography, Link, IconButton, Button} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import {getStoredChordName} from "./utils/Funcs";
import {notes} from "./utils/Notes";
import {useRef} from "react";

const App = () => {

    const [currentNoteIndex, setCurrentNoteIndex] = React.useState(0);
    const currentNote = useRef(null);
    const [ fadeDuration, setFadeDuration ] = React.useState(0.4);
    const [ instrument, setInstrument ] = React.useState("guitar");
    const audioSource = React.useRef(null);
    const audioContextStartedRef = useRef(false);
    const currentTimeout = useRef(null);

    const handleAudioPause = () => {
        if (!audioSource.current) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const gainNode = audioContext.createGain();
        const mediaElement = audioSource.current;

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

    const playButtonNote = ( note ) => {
        if (audioSource.current) {
            audioSource.current.pause();
            audioSource.current = null;
        }
        setTimeout(() => {
            console.log(`${process.env.PUBLIC_URL}/sounds/${instrument}/${getStoredChordName(note)}.mp3`);
            audioSource.current = new Audio(`${process.env.PUBLIC_URL}/sounds/${instrument}/${getStoredChordName(note)}.mp3`);
            setCurrentNoteIndex(notes.indexOf(note));
            audioSource.current.volume = 0.60;
            audioSource.current.play();
            currentNote.current = note;
            if (currentTimeout.current !== null) {
                clearTimeout(currentTimeout.current);
            }
            currentTimeout.current = setTimeout(() => {
                if (!audioContextStartedRef.current && currentNote.current === note) {
                    setCurrentNoteIndex(-1);
                    currentNote.current = -1;
                }
            }, 3500);
        }, 50);
    }
    return (

    <Container>
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={10} md={5}>
                        <Typography color="primary" fontSize="30px">
                            Circle of Fifths Jam Board
                        </Typography>
                    </Grid>
                    <Grid item xs={6.5} sm={8.5} md={4.5}
                          sx={{
                              zIndex: 1000,
                              transform: 'translateY(10px)',
                          }}
                    >
                        <Link
                              href='https://github.com/jakeMartin1234/circle-of-fifths-jam-board'
                              target="_blank"
                              rel="noopener noreferrer"
                        >
                            <GitHubIcon sx={{ color: 'white' }} />
                        </Link>
                    </Grid>
                    <Grid item sm={2}
                          sx={{
                              zIndex: 1000,
                              transform: 'translateY(10px)',
                          }}
                    >
                        <Link
                            href='https://jakemartinaus.me'
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant='outlined'>
                                jakemartinaus.me
                            </Button>
                        </Link>
                    </Grid>
                </Grid>


            </Grid>
            <Grid item xs={12} sm={12} md={4} styl={{ height: '100%', padding: '16px', width: '300px' }}>
                <MusicPlayer setCurrentNoteIndex={setCurrentNoteIndex}
                             fadeDuration={fadeDuration}
                             setFadeDuration={setFadeDuration}
                             setFadeDuration={setFadeDuration}
                             instrument={instrument}
                             setInstrument={setInstrument}
                             handleAudioPause={handleAudioPause}
                             audioSource={audioSource}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={8} sx={{ transform: 'translateY(-10%)' }}>
                <Doughnut currentNoteIndex={currentNoteIndex}
                          playButtonNote={playButtonNote}
                />
            </Grid>
        </Grid>
    </Container>
    );
};

export default App;
