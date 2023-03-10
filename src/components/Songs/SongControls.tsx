import React, { useContext, useEffect, useRef, useState } from "react";
import classes from './SongControls.module.css';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"
import SongContext from "../../store/song-context";

const SongControls: React.FC<{ audio: string }> = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [length, setLength] = useState(0); // in seconds
    const [currentTimeMarker, setCurrentTimeMarker] = useState(0); // in seconds
    const [timePassed, setTimePassed] = useState('0:00'); // represented by a string
    const [timeLeft, setTimeLeft] = useState('0'); // represented by a string
    const songRef = useRef<HTMLAudioElement>(null);

    const clickHandler = (e: React.MouseEvent) => {
        setIsPlaying(prev => !prev);
        isPlaying ? songRef.current?.pause() : songRef.current?.play();
    };
    const loadedDataHandler = () => {
        const trackLength = convertToMinutes(songRef.current!.duration)
        setLength(songRef.current!.duration);
        setTimeLeft(trackLength)
    }

    const onPlaying = () => {
        const currentTime = songRef.current?.currentTime;
        setCurrentTimeMarker(Math.floor((currentTime! / length) * 100));
        setTimePassed(convertToMinutes(currentTime!))
        setTimeLeft(convertToMinutes(length));

    }

    const convertToMinutes = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
    }
    return (
        <div className={classes["audio-controls"]}>
            <audio
                preload="metadata"
                ref={songRef}
                src={props.audio}
                onTimeUpdate={onPlaying}
                onLoadedData={loadedDataHandler} />

            <div className={classes["progress-bar"]}>
                {/* Current Time */}
                <span>{timePassed}</span>
                {/* Progress Bar */}
                <input type="range" value={currentTimeMarker} readOnly />
                {/* Duration */}
                <span>{timeLeft}</span>
            </div>
            <button className={classes["play-pause"]} onClick={clickHandler}>{isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}</button>
        </div>
    )
};

export default SongControls;

// Thoughts:
// Wondering here if there is just way too much logic happening in the component. Would it be better to place a lot of this logic in context? 
// What should be stored in context? 
    // set current song that is playing, currently being set in this component, move to context
    // go to next song in the song list and play that one when clicking on the "next" icon
    // shuffling songs
    // I need to implement useReducer in Context

// To Do:
// 1. Only allow one song to play at a time
// 2. Songs should display according to screen size

// On the clickHandler, should instead set songCtx.isPlaying to current song
// if possible, trigger the song that is playing in context
// trigger the next song in context too