import React, { useState, useMemo, useEffect } from "react";
import SongContext from "./song-context";

const SongContextProvider = (props) => {
    const [songs, setSongs] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);

    const addSongHandler = (song) => {
        setSongs(prevState => {
            return [song, ...prevState]
        })
    };

    const setAllSongs = (data) => {
        setSongs(data);
    }

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
            currentSong: currentSong,
            setAllSongs: setAllSongs
        };
    }, [songs, isPlaying, currentSong]);
    
    return (
        <SongContext.Provider
            value={songContext}
        >
            {props.children}
        </SongContext.Provider>
    )
};

export default SongContextProvider;