import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import Search from "./Search";
import DisplayAlbum from "./DisplayAlbum";
import Navbar from "./Navbar";
import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const location = useLocation();
  const displayRef = useRef(null);

  const isAlbum = location.pathname.includes("/album/");
  const albumId = isAlbum ? location.pathname.split("/").pop() : null;

  const album = isAlbum
    ? albumsData.find(a => a._id === albumId)
    : null;

  const bgColor = album?.bgColor || "#062a61";

  useEffect(() => {
    if (!displayRef.current) return;

    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = "#121212";
    }
  }, [isAlbum, bgColor]);

  return (
    <div ref={displayRef}
      className="w-[100%] m-2 text-white bg-[#121212] lg:w-[75%] lg:ml-0 flex flex-col ">
      <div
        className="
                    sticky top-0 z-10
                    backdrop-blur-sm
                    px-6 pt-4 pb-2
                "
      >
        <Navbar />
      </div>
      <div className="flex-1 px-6 pb-4 overflow-auto">
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route
            path="/album/:id"
            element={<DisplayAlbum album={album} />}
          />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
};

export default Display;
