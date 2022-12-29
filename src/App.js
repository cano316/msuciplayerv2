import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Songs from "./components/Songs/Songs";
import SongUploadForm from "./components/Layout/SongUploadForm";

function App() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const showUploadModalHandler = () => {
    setShowUploadModal(true)
  };

  const hideUploadModalHandler = () => {
    setShowUploadModal(false)
  };

  return (
    <React.Fragment>
      {showUploadModal && <SongUploadForm onHideUploadModal={hideUploadModalHandler} />}
      <Header onShowUploadModal={showUploadModalHandler} />
      <Songs />
    </React.Fragment>
  );
}

export default App;
