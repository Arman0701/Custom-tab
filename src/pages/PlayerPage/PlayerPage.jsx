import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MusicPlayer from "../../components/MusicPlayer";
import {
  togglePlayingState,
  nextSong,
  prevSong,
  shuffleSong,
} from "../../redux-store/playerSlice";
import style from "./PlayerPage.module.scss";

function formatMusicTime(val) {
  if (val < 10) return `0${val}`;
  return val;
}

export default function PlayerPage() {
  const { isPlaying, currentSong, repeat, shuffle } = useSelector(
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

  const isRepeat = repeat.isRepeat;
  const repeatCount = repeat.repeatCount;

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

  function updateSeek() {
    const musicCurrentTime = audioPlayer.current.currentTime;
    const musicDuration = isNaN(audioPlayer.current.duration)
      ? 100
      : audioPlayer.current.duration;
    setSeekAudio(musicCurrentTime * (100 / musicDuration));

    // tarmacnel jamanaky
    const currentMinutes = formatMusicTime(Math.floor(musicCurrentTime / 60));
    const currentSeconds = formatMusicTime(
      Math.floor(musicCurrentTime - currentMinutes * 60)
    );
    setCurrentTime(`${currentMinutes} : ${currentSeconds}`);

    const durationMinutes = formatMusicTime(
      Number.isNaN(audioPlayer.current.duration)
        ? 0
        : Math.floor(audioPlayer.current.duration / 60)
    );
    const durationSeconds = formatMusicTime(
      Number.isNaN(audioPlayer.current.duration)
        ? 0
        : Math.floor(audioPlayer.current.duration - durationMinutes * 60)
    );
    setCurrentDuration(`${durationMinutes} : ${durationSeconds}`);
    // ! ancnel myus ergin
  }

  useEffect(() => {
    if (isPlaying) audioPlayer.current.play();
    if (!isPlaying) audioPlayer.current.pause();
  }, [isPlaying]);

  async function nextAudio() {
    dispatch(nextSong());
    await audioPlayer.current.pause();
    await audioPlayer.current.load();
    if (isPlaying) audioPlayer.current.play();
  }
  async function prevAudio() {
    dispatch(prevSong());
    await audioPlayer.current.pause();
    await audioPlayer.current.load();
    if (isPlaying) audioPlayer.current.play();
  }

  function isShuffle() {
    dispatch(shuffleSong());
  }

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
            onTimeUpdate={updateSeek}
            onPlay={updatePlay}
            onPause={updatePause}
            muted={isMute.muted}
          >
            <track kind="captions" />
          </audio>
        </div>
        {!shuffle ? (
          <button onClick={isShuffle}>shuffle</button>
        ) : (
          <button onClick={isShuffle}>stop shuffle</button>
        )}
        <div>
          {!isPlaying ? (
            <button onClick={playStatus}>play</button>
          ) : (
            <button onClick={playStatus}>pause</button>
          )}
          <button onClick={nextAudio}>next</button>
          <button onClick={prevAudio}>prev</button>
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
          >
            Mute
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
            onChange={(e) => setVolume(e.target.value / 100)}
          />
        </label>
        <MusicPlayer audioPlayer={audioPlayer}></MusicPlayer>
      </div>
    </div>
  );
}
