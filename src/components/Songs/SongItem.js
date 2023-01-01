import React, { useState } from 'react';
import classes from './SongItem.module.css'
import Button from '../UI/Button/Button';
import SongDetailsModal from './SongDetailsModal/SongDetailsModal';

const SongItem = (props) => {
    const [showSongDetailsModal, setShowSongDetailsModal] = useState(false);

    const handleClick = () => {
        setShowSongDetailsModal(true)
    }

    const hideModalHandler = () => {
        setShowSongDetailsModal(false)
    }

    return (
        <>
            {showSongDetailsModal && <SongDetailsModal song={{ ...props }} onHideModal={hideModalHandler} />}
            <li className={classes.song}>
                <img src={props.imgSrc} />
                <div className={classes.headers}>
                    <h2>{props.songName}</h2>
                    <h3>{props.artist}</h3>
                    <Button className={classes["details-button"]} onClick={handleClick}>Details</Button>
                </div>
            </li>
            <hr />
        </>
    )
};

export default SongItem;