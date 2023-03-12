import { useContext, useRef, useState } from 'react';
import SongContext from '../../store/song-context';
import Button from '../UI/Button/Button';
import classes from './MusicPlayer.module.css'
const MusicPlayer: React.FC = () => {
    const song = useContext(SongContext).currentSong;
    const imageRef = useRef<HTMLImageElement>(null);
    // const [loaded, setLoaded] = useState(false);

    if (!imageRef) {
        return <h2>Loading...</h2>
    }

    return (
        <div className={classes["music-player"]}>
            <img
                src={song!.image.url}
                height="100%"
                ref={imageRef}
            />
            <div>
                <h3>{song!.songName}</h3>
                {/* <h3>Song Name</h3> */}
                <p>{song!.artist}</p>
                {/* <p>Song Artist</p> */}
            </div>
        </div >
    )
}

export default MusicPlayer;

// To Do: 
// 1. This is okay, but it takes a little bit for the images to load.
// 2. Need to wait for an API call to finish?