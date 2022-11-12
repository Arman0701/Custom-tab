import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSong, togglePlayingState } from "../../redux-store/playerSlice";

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

  //   useEffect(() => {
  //     dispatch((AllSongs));/update song list
  //   }, [AllSongs]);
  return (
    <div>
      {AllSongs.map((song) => {
        const style =
          song.uuid === currentSong.uuid
            ? {
                fontSize: "1.5rem",
                color: "red",
                fontWeight: "bold",
              }
            : {};
        return (
          <div key={song.uuid}>
            <button
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
