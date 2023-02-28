import React from "react";

export type Song = {
    songName: string,
    artist: string,
    _id: string | undefined,
    image: { url: string, filename: string },
    audio: { url: string, filename: string },
}

type SongContextObject = {
    songs: Song[];
    addSong: (song: Song) => void;
    isPlaying: boolean;
    playSong: (song: Song) => void;
    currentSong: Song | null;
    setAllSongs: (data: Song[]) => void;
}

const SongContext = React.createContext<SongContextObject>({
    songs: [],
    addSong: (song) => { },
    isPlaying: false,
    playSong: (song) => { },
    currentSong: null,
    setAllSongs: (data) => { }
});

export default SongContext;