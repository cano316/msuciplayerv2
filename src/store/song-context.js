import React from "react";

const SongContext = React.createContext({
    songs: [],
    addSong: (song) => { },
    removeSong: () => { }
});

export default SongContext;