import { getSuggestedQuery } from "@testing-library/react";
import React, { useEffect, useRef, useState } from "react";
import classes from './SongControls.module.css';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"
const SongControls = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [length, setLength] = useState(0)
    const songRef = useRef();
    const clickHandler = (e) => {
        setIsPlaying(prev => !prev);
        isPlaying ? songRef.current.pause() : songRef.current.play()
    };
    useEffect(() => {
        console.log(Math.floor(songRef.current.duration / 60) + Math.floor(songRef.current.duration % 60))
        // const songInMinutes = Math.floor(songRef.current.duration / 60) + Math.floor(songRef.current.duration % 60)
        // setLength(songInMinutes);
    }, [])
    return (
        <div className={classes["audio-controls"]}>
            <audio
                preload="metadata"
                ref={songRef}
                src={props.audio} />
            <button>Back 30 Seconds</button>
            <button className={classes["play-pause"]} onClick={clickHandler}>{isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}</button>
            <button>Forward 30 Seconds</button>

            {/* Current Time */}

            {/* Progress Bar */}

            {/* Duration */}
            <p>Duration: {length}</p>
        </div>
    )
};

export default SongControls;