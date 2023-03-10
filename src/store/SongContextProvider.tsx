import { useState, useMemo } from "react";
import SongContext from "./song-context";
import { Song } from "./song-context";


type Props = {
    children?: React.ReactNode
}

const SongContextProvider: React.FC<Props> = (props) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);

    const addSongHandler = (song: Song) => {
        setSongs(prevState => {
            return [song, ...prevState]
        })
    };

    const setAllSongs = (data: Song[]) => {
        setSongs(data);
    }

    const playSongHandler = (song: Song) => {
        setIsPlaying(true);
        setCurrentSong(song);
    }


    const songContext = useMemo(() => { // add SongContextObject type here
        return {
            songs: songs,
            addSong: addSongHandler,
            isPlaying: isPlaying,
            playSong: playSongHandler,
            currentSong: currentSong,
            setAllSongs: setAllSongs
        };
    }, [songs, isPlaying, currentSong]);

    return (
        <SongContext.Provider value={songContext} >
            {props.children}
        </SongContext.Provider>
    )
};

export default SongContextProvider;