import { useContext, useMemo } from "react";
import { PlayerContext } from "../context/PlayerContext.jsx";
import AlbumItem from "./AlbumItem.jsx";
import SongItem from "./SongItem.jsx";

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);

  const todayHits = useMemo(() => {
    if (!songsData.length) return [];

    const dateSeed = new Date().toISOString().slice(0, 10);
    let seed = 0;
    for (let i = 0; i < dateSeed.length; i++) {
      seed += dateSeed.charCodeAt(i);
    }

    const shuffle = (array) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        seed = (seed * 9301 + 49297) % 233280;
        const j = Math.floor((seed / 233280) * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    return shuffle(songsData).slice(0, 5);
  }, [songsData]);

  return (
    <>
      {/* Albums */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto gap-3">
          {albumsData.map(album => (
            <AlbumItem
              key={album._id}
              name={album.name}
              id={album._id}
              image={album.imageUrl}
            />
          ))}
        </div>
      </div>

      {/* Today's hits */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">
          Today's biggest hits
        </h1>

        <div className="flex overflow-auto gap-3">
          {todayHits.map(song => (
            <SongItem
              key={song._id}
              song={song}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
