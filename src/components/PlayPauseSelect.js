import {Button, MenuItem, Select, useTheme} from "@mui/material";
import {songs} from "../utils/Songs";
import React from "react";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Icon from '@mdi/react';
import { mdiGuitarElectric } from '@mdi/js';

const instruments = ["guitar", "piano"]

const PlayPauseSelect = ({ startAudioContext, stopMelody, sequence, setSequence, audioContextStarted,
                             instrument, setInstrument }) => {
    const theme = useTheme();
    return (
        <div>
            <div>
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
            <div>
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
                        width: 150,
                        margin: 'auto',
                        marginTop: '15px',
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        "& .MuiSvgIcon-root": {
                            color: theme.palette.primary.main,
                        }
                    }}
                >
                    {Object.keys(songs).map((key, index) => (
                        <MenuItem key={index} value={key}>{key}</MenuItem>
                    ))}
                </Select>
            </div>
            <div>
                <Icon path={mdiGuitarElectric}
                      size={1}
                      style={{
                            color: theme.palette.primary.main,
                            marginRight: '10px',
                            transform: 'translateY(5px)',
                      }}
                />
                <Select
                    id="instrument-select"
                    value={instrument}
                    disabled={audioContextStarted}
                    onChange={(e) => setInstrument(e.target.value)}
                    sx={{
                        height: 40,
                        width: 150,
                        margin: 'auto',
                        marginTop: '15px',
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        "& .MuiSvgIcon-root": {
                            color: theme.palette.primary.main,
                        },
                    }}
                >
                    {instruments.map((element, index) => (
                        <MenuItem key={index} value={element}>{element}</MenuItem>
                    ))}
                </Select>
            </div>
        </div>
    )
}

export default PlayPauseSelect;
