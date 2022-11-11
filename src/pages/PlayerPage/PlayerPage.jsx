import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglePlayingState } from "../../redux-store/playerSlice";
import style from "./PlayerPage.module.scss";

export default function PlayerPage() {
  const { isPlaying, songs, currentSong } = useSelector(
    (state) => state.playerSlice
  );

  const dispatch = useDispatch();

  const audioPlayer = useRef();
  const [volume, setVolume] = useState(0.25);
  const [seekAudio, setSeekAudio] = useState(1);
  const [isMute, setIsMute] = useState({
    muted: false,
    valueBeforeMute: volume,
  });
  const [currentTime, setCurrentTime] = useState("00 : 00");
  const [currentDuration, setCurrentDuration] = useState("00 : 00");

  function playStatus() {
    dispatch(togglePlayingState());
  }
  function updatePlay() {
    if (!isPlaying) {
      dispatch(togglePlayingState());
    }
  }
  function updatePause() {
    if (isPlaying) {
      dispatch(togglePlayingState());
    }
  }

  function changeSeek(e) {
    setSeekAudio(e.target.value);
    audioPlayer.current.currentTime =
      audioPlayer.current.duration * (e.target.value / 100);
  }

  useEffect(() => {
    if (isPlaying) audioPlayer.current.play();
    if (!isPlaying) audioPlayer.current.pause();
  }, [isPlaying]);

  return (
    <div>
      <div>
        <h1>{currentSong.title}</h1>
        <h3>{currentSong.name}</h3>
      </div>

      <div>
        <div>
          <span>{currentTime}</span>
          <label htmlFor="seek">
            <input
              type="range"
              id="seek"
              min="1"
              value={seekAudio}
              onChange={changeSeek}
              max="100"
            />
          </label>
          <span>{currentDuration}</span>
          <audio
            ref={audioPlayer}
            src={currentSong.url}
            onPlay={updatePlay}
            onPause={updatePause}
            muted={isMute.muted}
          >
            <track kind="captions" />
          </audio>
        </div>
        <div>
          {!isPlaying ? (
            <button onClick={playStatus}>play</button>
          ) : (
            <button onClick={playStatus}>pause</button>
          )}
        </div>
      </div>

      <div>
        {!isMute.muted ? (
          <button
            onClick={() => {
              setIsMute({
                muted: true,
                valueBeforeMute: volume,
              });
              setVolume(0);
            }}
          >Mute
          </button>
        ) : (
          <button
            onClick={() => {
              setIsMute({
                valueBeforeMute: volume,
                muted: false,
              });
              setVolume(isMute.valueBeforeMute);
            }}
          >
            UnMute
          </button>
        )}
        <label htmlFor="volume">
          Volume &nbsp;
          <input
            id="volume"
            type="range"
            min={0}
            max={100}
            step={1}
            value={volume}
            onChange={(e) => setVolume((e.target.value) / 100)}
          />
        </label>
      </div>
    </div>
  );
}
