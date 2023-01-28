import React, { useContext, useState } from 'react';
import classes from './SongItem.module.css'
import Button from '../UI/Button/Button';
import SongDetailsModal from './SongDetailsModal/SongDetailsModal';
import SongContext from '../../store/song-context';

const SongItem = (props) => {
    const songCtx = useContext(SongContext)
    const [showSongDetailsModal, setShowSongDetailsModal] = useState(false);

    const handleClick = () => {
        setShowSongDetailsModal(true)
    }

    const hideModalHandler = () => {
        setShowSongDetailsModal(false)
    }

    const playSongHandler = () => {
        // songCtx.playSong(song)
        songCtx.playSong(props)
    }

    return (
        <>
            {showSongDetailsModal && <SongDetailsModal song={{ ...props }} onHideModal={hideModalHandler} />}
            <li className={classes.song}>
                <img src={props.imgSrc} />
                <div className={classes.headers}>
                    <h2>{props.songName}</h2>
                    <h3>{props.artist}</h3>
                    <audio controls src={props.audio}></audio>
                    <Button className={classes["details-button"]} onClick={handleClick}>Details</Button>
                    <Button onClick={playSongHandler}>Play</Button>
                </div>
            </li>
            <hr />
        </>
    )
};

export default SongItem;