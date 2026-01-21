import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Pause, Play, SkipBack, SkipForward, Repeat, Volume } from "lucide-react";

const Player = () => {
  const {
    track, playStatus, play, pause, next, previous,
    seekBg, seekBar, seekSong,
    time, isRepeat, setIsRepeat,
    volume, changeVolume
  } = useContext(PlayerContext);

  if (!track) return null;

  const t = (n) => String(n).padStart(2, "0");

  return (
    <div className="fixed bottom-0 left-0 w-full h-[80px] bg-black text-white px-4 z-50">

      <div className="grid grid-cols-[300px_1fr_300px] items-center h-full">

        {/* LEFT (фиксированная ширина) */}
        <div className="hidden lg:flex items-center gap-3 overflow-hidden">
          <img src={track.image} className="w-12 shrink-0" />
          <p className="truncate">{track.name}</p>
        </div>

        {/* CENTER (всегда строго по центру) */}
        <div className="flex flex-col items-center">
          <div className="flex gap-4">
        <SkipBack className="cursor-pointer  hover:text-gray-400 transition-colors" onClick={previous} />
            {playStatus ? (
              <Pause className="cursor-pointer  hover:text-gray-400 transition-colors" onClick={pause} />
            ) : (
              <Play className="cursor-pointer  hover:text-gray-400 transition-colors" onClick={play} />
            )}
            <SkipForward className="cursor-pointer hover:text-gray-400 transition-colors" onClick={next} />
            <Repeat
              onClick={() => setIsRepeat(!isRepeat)}
              className={isRepeat ? "text-blue-400 cursor-pointer  hover:text-gray-400 transition-colors " : "cursor-pointer  hover:text-gray-400 transition-colors "}
            />
          </div>

          <div className="flex items-center gap-2 mt-1 w-full max-w-[500px]">
            <span className="text-xs">
              {t(time.currentTime.minute)}:{t(time.currentTime.second)}
            </span>

            <div
              ref={seekBg}
              onClick={seekSong}
              className="flex-1 h-2 bg-gray-600 rounded cursor-pointer"
            >
              <div ref={seekBar} className="h-2 bg-white rounded w-0" />
            </div>

            <span className="text-xs">{track.duration}</span>
          </div>
        </div>

        {/* RIGHT (фиксированная ширина) */}
        <div className="flex text-center items-center justify-center">
          <div className="group flex text-center items-center justify-center">
            <Volume className="cursor-pointer" />
            <div
              onClick={changeVolume}
              className=" bottom-6 right-0 w-24 h-2 bg-gray-600 rounded opacity-0  cursor-pointer group-hover:opacity-100 transition"
            >
              <div
                className="h-2 bg-white  cursor-pointer"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Player;
