import React, { useContext, useState } from 'react';
import classes from './SongItem.module.css'
import SongContext from '../../store/song-context';
import SongControls from './SongControls';

const SongItem = (props) => {
    const songCtx = useContext(SongContext)

    const playSongHandler = () => {
        songCtx.playSong(props)
    }

    return (
        <>
            <li className={classes.song}>
                <img src={props.imgSrc} />
                <div className={classes.headers}>
                    <h2>{props.songName}</h2>
                    <h3>{props.artist}</h3>
                    {/* Audio Controls */}
                    <SongControls audio={props.audio} />
                </div>
            </li>
            <hr />
        </>
    )
};

export default SongItem;