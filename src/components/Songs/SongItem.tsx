import React, { useContext, useState } from 'react';
import classes from './SongItem.module.css';
import SongContext from '../../store/song-context';
import SongControls from './SongControls';
import { Song } from '../../store/song-context';


const SongItem: React.FC<Song> = (props) => {

    return (
        <>
            <li className={classes.song}>
                <img src={props.image.url} />
                <div className={classes.headers}>
                    <h2>{props.songName}</h2>
                    <h3>{props.artist}</h3>
                    {/* Audio Controls */}
                    <SongControls
                        audio={props.audio.url}
                        song={props}
                    />
                </div>
            </li>
            {/* <hr /> */}
        </>
    )
};

export default SongItem;