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
    handleSongSubmission: (song: Song) => void;
    newSongSubmitted: boolean;
    isPlaying: boolean;
    playSong: (song: Song) => void;
    currentSong: Song | null;
    setAllSongs: (data: Song[]) => void;
    showMiniPlayer: boolean
}

const SongContext = React.createContext<SongContextObject>({
    songs: [],
    handleSongSubmission: (song) => { },
    newSongSubmitted: false,
    isPlaying: false,
    playSong: (song) => { },
    currentSong: null,
    setAllSongs: (data) => { },
    showMiniPlayer: false
});

export default SongContext;