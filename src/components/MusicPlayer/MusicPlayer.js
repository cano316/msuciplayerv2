import { useContext } from 'react';
import SongContext from '../../store/song-context';
import Button from '../UI/Button/Button';
import classes from './MusicPlayer.module.css'
const MusicPlayer = () => {
    // const song = useContext(SongContext).currentSong
    return (
        <div className={classes["music-player"]}>
            {/* <img src={song.imgSrc} height="100%" /> */}
            <div>
                {/* <h3>{song.songName}</h3> */}
                <h3>Song Name</h3>
                {/* <p>{song.artist}</p> */}
                <p>Song Artist</p>
            </div>
        </div >
    )
}

export default MusicPlayer;