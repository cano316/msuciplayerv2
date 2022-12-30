import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Songs from "./components/Songs/Songs";
import SongUploadForm from "./components/Layout/SongUploadForm";
import SongContextProvider from "./store/SongContextProvider";

function App() {
  const [showUploadModal, setShowUploadModal] = useState(true);

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
      <Songs />
    </SongContextProvider>
  );
}

export default App;
