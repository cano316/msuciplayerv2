import { useContext, useEffect, useState } from "react";
import SongItem from "./SongItem";
import Card from "../UI/Card/Card";
import classes from './SongsList.module.css';
import SongContext from "../../store/song-context";
import { getAllSongs } from "../../api";


const SongsList: React.FC = () => {
    const songCtx = useContext(SongContext);
    const [isFetching, setIsFetching] = useState(false);
    const [httpError, setHttpError] = useState()

    useEffect(() => {
        setIsFetching(true);
        getAllSongs().then(songs => {
            songCtx.setAllSongs(songs.reverse()); // reverse the data coming back from MongoDB
        }).catch(e => setHttpError(e.message));
        setIsFetching(false)
    }, []);

    const songsListElements = songCtx.songs.map(song => {
        return <SongItem
            key={song._id}
            _id={song._id}
            songName={song.songName}
            artist={song.artist}
            image={song.image}
            audio={song.audio}
        />
    });

    // Content to be rendered

    const cardContent = <Card>
        <ul>
            {songsListElements}
        </ul>
    </Card>

    const loadingContent = <p className={classes['songs-loading']}>Loading...</p>;

    return (
        <section className={classes.songs}>
            {isFetching && loadingContent}
            {!isFetching && !httpError && cardContent}
            {httpError && <p className={classes['songs-error']}>{httpError}</p>}
        </section>
    )
};

export default SongsList;

// To Do:
// 1. convert page to TSX - done
// 2. Add isLoading state and component
// 3. Handle potential errors from API request