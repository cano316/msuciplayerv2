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
    const [newSongSubmitted, setNewSongSubmitted] = useState(false);
    const [showMiniPlayer, setShowMiniPlayer] = useState(false);

    const handleSongSubmission = (song: Song) => {
        setSongs(prevState => {
            return [song, ...prevState]
        });

        setNewSongSubmitted(true);
    };

    const setAllSongs = (data: Song[]) => {
        setSongs(data);
    }

    const playSongHandler = (song: Song) => {
        setIsPlaying(true); // maybe this could be in each song component?
        setCurrentSong(song);
        setShowMiniPlayer(true);
    }


    const songContext = useMemo(() => { // add SongContextObject type here
        return {
            songs: songs,
            handleSongSubmission: handleSongSubmission,
            newSongSubmitted: newSongSubmitted,
            isPlaying: isPlaying,
            playSong: playSongHandler,
            currentSong: currentSong,
            setAllSongs: setAllSongs,
            showMiniPlayer: showMiniPlayer
        };
    }, [songs, isPlaying, currentSong]);

    return (
        <div className="relative">
            <SongContext.Provider value={songContext} >
                {props.children}
            </SongContext.Provider>
        </div>
    )
};

export default SongContextProvider;