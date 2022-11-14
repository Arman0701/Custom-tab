import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSong,
  togglePlayingState,
  songListUpdated,
} from "../../redux-store/playerSlice";
import styles from "./MusicPlayer.module.scss";

export default function MusicPlayer({ audioPlayer, setShowList }) {
  const currentSong = useSelector((state) => state.playerSlice.currentSong);
  const AllSongs = useSelector((state) => state.playerSlice.songs);
  const dispatch = useDispatch();

  async function changeCurrentSong(e) {
    const song = JSON.parse(e.target.getAttribute("data-song"));
    dispatch(changeSong(song));
    dispatch(togglePlayingState(true));
    await audioPlayer.current.pause();
    await audioPlayer.current.load();
    audioPlayer.current.play();
  }

  useEffect(() => {
    dispatch(songListUpdated(AllSongs));
  }, [AllSongs]);
  return (
    <div className={styles.music}>
      {AllSongs.map((song) => {
        const style =
          song.uuid === currentSong.uuid
            ? {
                fontSize: "1.5rem",
                color: "pink",
                fontWeight: "bold",
              }
            : {};
        return (
          <div key={song.uuid}>
            <button
              className={styles.songs}
              style={style}
              data-song={JSON.stringify(song)}
              onClick={changeCurrentSong}
            >
              {`${song.name} - ${song.title}`}
            </button>
          </div>
        );
      })}
    </div>
  );
}
