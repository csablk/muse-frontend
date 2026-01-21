import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { API_BASE_URL } from "./AuthContext";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(1);

  const [time, setTime] = useState({
    currentTime: { minute: 0, second: 0 },
    totalTime: { minute: 0, second: 0 },
  });

  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const { user, token, getAuthHeaders } = useAuth();

  // ================= PLAY / PAUSE =================
  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // ================= NEXT / PREVIOUS =================
  const next = () => {
    if (!track || !songsData.length) return;

    const index = songsData.findIndex(s => s._id === track._id);

    let nextTrack = null;

    if (index === songsData.length - 1) {
      if (isRepeat) {
        nextTrack = songsData[0];
      }
    } else {
      nextTrack = songsData[index + 1];
    }

    if (nextTrack) {
      setTrack(nextTrack);
    }
  };
  const previous = () => {
    if (!track || !songsData.length) return;

    const index = songsData.findIndex(s => s._id === track._id);

    let prevTrack = null;

    if (index === 0) {
      if (isRepeat) {
        prevTrack = songsData[songsData.length - 1];
      }
    } else {
      prevTrack = songsData[index - 1];
    }

    if (prevTrack) {
      setTrack(prevTrack);
    }
  };
  // ================= SEEK =================
  const seekSong = (e) => {
    if (!audioRef.current || !seekBg.current) return;
    const percent = e.nativeEvent.offsetX / seekBg.current.offsetWidth;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  // ================= VOLUME =================
  const changeVolume = (e) => {
    const percent = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
    setVolume(percent);
    audioRef.current.volume = percent;
  };

  // ================= TRACK CHANGE =================
  useEffect(() => {
    if (!audioRef.current || !track) return;

    audioRef.current.src = track.file;
    audioRef.current.currentTime = 0;
    audioRef.current.volume = volume;

    audioRef.current.play().then(() => {
      setPlayStatus(true);
    }).catch(() => { }); 
  }, [track]);

  // ================= AUDIO EVENTS =================
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!audio.duration) return;

      setTime({
        currentTime: {
          minute: Math.floor(audio.currentTime / 60),
          second: Math.floor(audio.currentTime % 60),
        },
        totalTime: {
          minute: Math.floor(audio.duration / 60),
          second: Math.floor(audio.duration % 60),
        },
      });

      if (seekBar.current) {
        seekBar.current.style.width =
          (audio.currentTime / audio.duration) * 100 + "%";
      }
    };

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        next();
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [track, isRepeat]);

  // ================= DATA =================
  useEffect(() => {
    if (!user || !token) return;

    axios.get(`${API_BASE_URL}/api/songs`, { headers: getAuthHeaders() })
      .then(res => setSongsData(res.data.songs || []));

    axios.get(`${API_BASE_URL}/api/albums`, { headers: getAuthHeaders() })
      .then(res => setAlbumsData(res.data.albums || []));
  }, [user, token]);

  return (
    <PlayerContext.Provider value={{
      songsData,
      albumsData,
      track,
      setTrack,
      playStatus,
      play,
      pause,
      next,
      previous,
      seekBg,
      seekBar,
      seekSong,
      time,
      isRepeat,
      setIsRepeat,
      volume,
      changeVolume,
      audioRef
    }}>
      {children}
    </PlayerContext.Provider>
  );
};
