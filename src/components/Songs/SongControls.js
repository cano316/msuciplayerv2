import React, { useContext, useEffect, useRef, useState } from "react";
import classes from './SongControls.module.css';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"
import SongContext from "../../store/song-context";
const SongControls = (props) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [length, setLength] = useState(0); // in seconds
    const [currentTimeMarker, setCurrentTimeMarker] = useState(0); // in seconds
    const [timePassed, setTimePassed] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const songRef = useRef();

    const clickHandler = (e) => {
        setIsPlaying(prev => !prev);
        isPlaying ? songRef.current.pause() : songRef.current.play();
    };
    const loadedDataHandler = () => {
        const trackLength = convertToMinutes(songRef.current.duration)
        setLength(songRef.current.duration);
        setTimeLeft(trackLength)
    }

    const onPlaying = () => {
        const currentTime = songRef.current.currentTime;
        setCurrentTimeMarker(Math.floor((currentTime / length) * 100));
        setTimePassed(convertToMinutes(currentTime))
        setTimeLeft(convertToMinutes(length));

    }

    const convertToMinutes = (time) => {
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
                <input type="range" value={currentTimeMarker} />
                {/* Duration */}
                <span>{timeLeft}</span>
            </div>
            <button className={classes["play-pause"]} onClick={clickHandler}>{isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}</button>
        </div>
    )
};

export default SongControls;