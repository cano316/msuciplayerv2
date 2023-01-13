import React, { useState } from "react";
import Header from "./components/Layout/Header";
import SongUploadForm from "./components/Layout/SongUploadForm";
import SongContextProvider from "./store/SongContextProvider";
import Main from "./components/Layout/Main";

function App() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isSongPlaying, setIsSongPlaying] = useState(true)
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
    </SongContextProvider>
  );
}

export default App;
