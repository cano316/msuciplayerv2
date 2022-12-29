import SongItem from "./SongItem";
import DUMMY_SONGS from "./DUMMY_SONGS";
import Card from "../UI/Card/Card";
import classes from './SongsList.module.css'
// this list will be wrapped in a Card component

const SongsList = (props) => {
    const songsListElements = DUMMY_SONGS.map(song => {
        return <SongItem
            key={song.id}
            songName={song.songName}
            artist={song.artist}
            imgSrc={song.imgSrc}
        />
    })
    return (
        <section className={classes.songs}>
            <Card>
                <ul>
                    {songsListElements}
                </ul>
            </Card>
        </section>
    )
};

export default SongsList;