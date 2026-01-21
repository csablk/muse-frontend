import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Register from "./components/Register";
import Display from "./components/Display";
import AuthWrapper from "./components/AuthWrapper";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import { useContext } from "react";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {

  const {audioRef, track} = useContext(PlayerContext);

  return (
    <>
      <Toaster />
      <AuthWrapper>
        <div className="h-screen bg-black">
          <div className="h-[100%] flex ">
            <Sidebar />
            <Display />
          </div>
          {/* Player component */}
            <Player />
            <audio
              ref={audioRef}
              src={track ? track.file : null}
              preload="auto"
              autoPlay={true}
            ></audio>
        </div>
        </AuthWrapper>
    </>
  )
}

export default App;
