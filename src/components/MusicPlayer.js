import React, {useEffect, useState} from 'react';
import * as Tone from 'tone';
import { notes, walkingOnSunshine, heyJoe } from '../utils/Notes.js';
import '../css/musicPlayer.css';

const MusicPlayer = ({ setCurrentNoteIndex }) => {
    const bpm = 109;
    const noteDuration = '4n';

    const [audioContextStarted, setAudioContextStarted] = useState(false);
    const [sequence, setSequence] = useState(notes);

    useEffect(() => {
        Tone.Transport.bpm.value = bpm;
        Tone.Transport.loop = true;
        Tone.Transport.loopEnd = '1m';
    }, []);

    useEffect( () => {
        async function callPlayMelody() {
            if (audioContextStarted) {
                await playMelody();
            }
        }
        callPlayMelody().then(() => {});
    }, [audioContextStarted]);

    const startAudioContext = (seq) => {
        Tone.Transport.stop();
        Tone.Transport.cancel();
        setSequence(seq)
        setAudioContextStarted(true);
    };

    const stopMelody = () => {
        Tone.Transport.stop();
        Tone.Transport.cancel();
        setAudioContextStarted(false);
        setCurrentNoteIndex(-1)
    }

    const playMelody = async () => {
        const synth = new Tone.Synth().toDestination();
        let nextNoteIndex = 0;
        setCurrentNoteIndex(0)

        const playNote = () => {
            console.log(synth);
            synth.triggerAttackRelease(sequence[nextNoteIndex], noteDuration);
            setCurrentNoteIndex(notes.indexOf(sequence[nextNoteIndex]))
            console.log(nextNoteIndex);
            nextNoteIndex = (nextNoteIndex + 1) % sequence.length;
            if (audioContextStarted) {
                setTimeout(() => playNote(), (60 / bpm) * 1000);
            }
        }
        playNote();
        // Tone.Transport.scheduleRepeat((time) => {
        //     // synth.triggerAttackRelease(sequence[nextNoteIndex], noteDuration, time);
        //     synth.triggerAttackRelease('C4', noteDuration);
        //     synth.triggerAttackRelease('E4', noteDuration);
        //     synth.triggerAttackRelease('G4', noteDuration);
        //
        //     setCurrentNoteIndex(notes.indexOf(sequence[nextNoteIndex]))
        //     console.log(nextNoteIndex);
        //     nextNoteIndex = (nextNoteIndex + 1) % sequence.length;
        // }, noteDuration, "0m");
        // const now = await Tone.now();
        // await Tone.Transport.start(now);
    };

    return (
        <div className="music-player-container">
            <button onClick={() => startAudioContext(notes)}>Play Clockwise</button>
            <button onClick={stopMelody}>Stop Melody</button>
            <button onClick={() => startAudioContext(walkingOnSunshine)}>Play Walking On Sunshine</button>
            <button onClick={() => startAudioContext(heyJoe)}>Play Hey Joe</button>

        </div>
    )
}

export default MusicPlayer;
