import React, { useContext, useState } from 'react';
import classes from './SongItem.module.css';
import SongContext from '../../store/song-context';
import SongControls from './SongControls';
import { Song } from '../../store/song-context';

type Props = {
    song: Song,
    index: number
}

const SongItem: React.FC<Props> = (props) => {
    const { song, index } = props;
    return (
        <>
            <li className={classes.song}>
                <img src={song.image.url} />
                <div className={classes.headers}>
                    <h2>{song.songName}</h2>
                    <h3>{song.artist}</h3>
                    {/* Audio Controls */}
                    <SongControls
                        audio={song.audio.url}
                        song={song}
                        index={index}
                    />
                </div>
            </li>
            {/* <hr /> */}
        </>
    )
};

export default SongItem;