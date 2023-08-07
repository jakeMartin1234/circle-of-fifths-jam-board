import {Button, IconButton, MenuItem, Select, useTheme} from "@mui/material";
import {songs} from "../utils/Songs";
import React from "react";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Icon from '@mdi/react';
import { mdiGuitarElectric, mdiSaxophone } from '@mdi/js';
import PianoIcon from '@mui/icons-material/Piano';

const PlayPauseSelect = ({ startAudioContext, stopMelody, sequence, setSequence, audioContextStarted,
                             instrument, setInstrument }) => {
    const theme = useTheme();
    return (
        <div>
            <div style={{ transform: 'translateX(45px)'}}>
                <Button onClick={() => startAudioContext(sequence)}
                        variant="contained"
                        sx={{
                            marginRight: '15px',
                        }}
                >
                    Play
                </Button>
                <Button onClick={stopMelody} variant="text">
                    Pause
                </Button>
            </div>
            <div style={{ transform: 'translateX(-5px)' }}>
                <MusicNoteIcon sx={{
                    color: theme.palette.primary.main,
                    marginRight: '10px',
                    transform: 'translateY(5px)',
                }}/>
                <Select
                    id="song-select"
                    value={sequence}
                    disabled={audioContextStarted}
                    onChange={(e) => setSequence(e.target.value)}
                    sx={{
                        height: 40,
                        width: 200,
                        margin: 'auto',
                        marginTop: '15px',
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        "& .MuiSvgIcon-root": {
                            color: theme.palette.primary.main,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.main
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.main
                        }
                    }}
                >
                    {Object.keys(songs).map((key, index) => (
                        <MenuItem key={index} value={key}>{songs[key].name}</MenuItem>
                    ))}
                </Select>
            </div>
            <div style={{ transform: 'translateX(12px)' }}>
                <IconButton disabled={audioContextStarted}
                            onClick={() => setInstrument('guitar')}
                            sx={{
                                color: instrument === 'guitar' ? theme.palette.background.default
                                    : theme.palette.primary.main,
                                backgroundColor: instrument === 'guitar' ? theme.palette.primary.main
                                    : theme.palette.secondary.main,
                                margin: '15px'
                            }}
                >
                    <Icon path={mdiGuitarElectric}
                          size={1}
                    />
                </IconButton>
                <IconButton variant='contained'
                            disabled={audioContextStarted}
                            onClick={() => setInstrument('piano')}
                            sx={{
                                color: instrument === 'piano' ? theme.palette.background.default
                                    : theme.palette.primary.main,
                                backgroundColor: instrument === 'piano' ? theme.palette.primary.main
                                    : theme.palette.secondary.main,
                                margin: '15px'
                            }}
                >
                    <PianoIcon/>
                </IconButton>
                <IconButton disabled={audioContextStarted}
                            onClick={() => setInstrument('saxophone')}
                            sx={{
                                color: instrument === 'saxophone' ? theme.palette.background.default
                                    : theme.palette.primary.main,
                                backgroundColor: instrument === 'saxophone' ? theme.palette.primary.main
                                    : theme.palette.secondary.main,
                                margin: '15px'
                            }}
                >
                    <Icon path={mdiSaxophone}
                          size={1}
                    />
                </IconButton>
            </div>
        </div>
    )
}

export default PlayPauseSelect;
