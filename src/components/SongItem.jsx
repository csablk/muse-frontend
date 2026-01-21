import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongItem = ({ song, image }) => {
  const { setTrack } = useContext(PlayerContext);

  return (
    <div
      onClick={() => setTrack(song)}
      className="min-w-[180px] p-2 cursor-pointer hover:bg-white/10"
    >
      <img src={song.image} className="rounded" />
      <p className="font-bold truncate mt-2">{song.name}</p>
    </div>
  );
};

export default SongItem;
