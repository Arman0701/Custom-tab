import { createSlice, nanoid } from "@reduxjs/toolkit";
import { audios } from "./data";

const songData = audios.map((song) => {
  return { uuid: nanoid(), ...song };
});

const playerSlice = createSlice({
  name: "playerSlice",
  initialState: {
    songs: songData,
    isPlaying: false,
    currentSong: songData[0],
  },
  reducers: {
    togglePlayingState(state) {
        state.isPlaying = !state.isPlaying
    },
    setCurrentSong(state, { payload }) {},
  },
});

export const { togglePlayingState } = playerSlice.actions;

export default playerSlice.reducer;
