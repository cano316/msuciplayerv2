import React, { useState, useMemo, useEffect } from "react";
import SongContext from "./song-context";
import { getAllSongs } from "../api";

const SongContextProvider = (props) => {
    const [songs, setSongs] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        getAllSongs().then(songs => setSongs(songs))
    }, []);

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

    const playSongHandler = (song) => {
        setIsPlaying(true);
        setCurrentSong(song);
    }


    const songContext = useMemo(() => {
        return {
            songs: songs,
            addSong: addSongHandler,
            removeSong: removeSongHandler,
            isPlaying: isPlaying,
            playSong: playSongHandler,
            currentSong: currentSong
        };
    }, [songs, isPlaying, currentSong])
    return (
        <SongContext.Provider
            value={songContext}
        >
            {props.children}
        </SongContext.Provider>
    )
};

export default SongContextProvider;