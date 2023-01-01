import React from "react";

const SongContext = React.createContext({
    songs: [],
    addSong: (song) => { },
    removeSong: (id) => { }
});

export default SongContext;