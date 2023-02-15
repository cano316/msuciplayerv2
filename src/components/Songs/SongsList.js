import React, { useContext, useEffect } from "react";
import SongItem from "./SongItem";
import Card from "../UI/Card/Card";
import classes from './SongsList.module.css';
import SongContext from "../../store/song-context";
import { getAllSongs } from "../../api";


const SongsList = () => {
    const songCtx = useContext(SongContext);

    useEffect(() => {
        getAllSongs().then(songs => {
            songCtx.setAllSongs(songs.reverse()); // reverse the data coming back from MongoDB
        });
    }, []);

    const songsListElements = songCtx.songs.map(song => {
        return <SongItem
            key={song._id}
            songName={song.songName}
            artist={song.artist}
            imgSrc={song.image.url}
            audio={song.audio.url}
        />
    });

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