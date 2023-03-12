import { useContext, useState } from "react";
import Header from "./components/Layout/Header";
import SongUploadForm from "./components/Layout/SongUploadForm";
import SongContextProvider from "./store/SongContextProvider";
import Main from "./components/Layout/Main";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import SongContext from "./store/song-context";

function App() {
    const songCtx = useContext(SongContext);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const showUploadModalHandler = () => {
        setShowUploadModal(true)
    };

    const hideUploadModalHandler = () => {
        setShowUploadModal(false)
    };

    return (
        <SongContextProvider>
            {showUploadModal && <SongUploadForm onHideUploadModal={hideUploadModalHandler} />}
            <Header onShowUploadModal={showUploadModalHandler} />
            <Main />
            {songCtx.showMiniPlayer && <MusicPlayer />}
        </SongContextProvider>
    );
}

export default App;
