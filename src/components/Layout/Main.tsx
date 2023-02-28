import React from "react";
import SongsList from "../Songs/SongsList";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import SongContext from "../../store/song-context";
const Main: React.FC = () => {

    const songCtx = React.useContext(SongContext);

    return (
        <>
            <SongsList />
            {songCtx.isPlaying && <MusicPlayer />}
        </>
    )
};

export default Main;