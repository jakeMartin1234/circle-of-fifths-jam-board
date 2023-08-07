import React, { useEffect, useState } from 'react';
import Doughnut from "./components/Dougnut";
import './App.css';
import MusicPlayer from "./components/MusicPlayer";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Container, Grid, Typography, Link, IconButton} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const App = () => {


    const [currentNoteIndex, setCurrentNoteIndex] = React.useState(0);
    const [animate, setAnimate] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimate(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [currentNoteIndex]);

    return (

    <Container>
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'left',
                }}>
                    <Typography color="primary" fontSize="30px">
                        Circle of Fifths Jam Board
                    </Typography>
                    <Link sx={{ zIndex: 1000,
                                marginLeft: '30px',
                                marginTop: '10px',
                             }}
                          href='https://github.com/jakeMartin1234/circle-of-fifths-jam-board'
                          target="_blank"
                          rel="noopener noreferrer"
                    >
                        <GitHubIcon sx={{ color: 'white' }} />
                    </Link>
                </div>

            </Grid>
            <Grid item xs={12} sm={12} md={4} styl={{ height: '100%', padding: '16px', width: '300px' }}>
                <MusicPlayer setCurrentNoteIndex={setCurrentNoteIndex}/>
            </Grid>

            <Grid item xs={12} sm={12} md={8} sx={{ transform: 'translateY(-10%)' }}>
                <Doughnut currentNoteIndex={currentNoteIndex} animate={animate} />
            </Grid>
        </Grid>
    </Container>
    );
};

export default App;
