import React, { useState } from "react";
import SongContext from "./song-context";
import DUMMY_SONGS from "../components/Songs/DUMMY_SONGS";
const defaultSongs = DUMMY_SONGS;

const SongContextProvider = (props) => {
    const [songs, setSongs] = useState(defaultSongs);

    const addSongHandler = (song) => {
        const ranId = Math.floor(Math.random() * 100);
        song.id = ranId;
        setSongs(prevState => {
            return [song, ...prevState]
        })
    };

    const removeSongHandler = (id) => {
        console.log('feature doesnt work yet')
    }

    const songContext = {
        songs: songs,
        addSong: addSongHandler,
        removeSong: removeSongHandler
    };
    return (
        <SongContext.Provider
            value={songContext}
        >
            {props.children}
        </SongContext.Provider>
    )
};

export default SongContextProvider;