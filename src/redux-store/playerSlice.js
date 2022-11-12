import { createAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { audios } from "./data";

const songData = audios.map((song) => {
  return { uuid: nanoid(), ...song };
});

function find(list, lookFor) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].uuid === lookFor.uuid) return i;
  }
}

function getRandomMusic(state) {
  const random = Math.random();
  const randomIndex = Math.floor(random * state.songs.length);
  if (randomIndex !== indexOfCurrentState(state)) {
    state.currentSong = state.songs[randomIndex];
  } else {
    return getRandomMusic(state); 
  }
}

function indexOfCurrentState(state) {
  const AllSongs = state.songs;
  const currentSong = state.currentSong;
  const indexOfCurrentSong = find(AllSongs, currentSong);
  return indexOfCurrentSong;
}

const playerSlice = createSlice({
  name: "playerSlice",
  initialState: {
    songs: songData,
    isPlaying: false,
    currentSong: songData[0],
    shuffle: false,
    repeat: {
      isRepeat: false,
      repeatCount: 1,
    },
  },
  reducers: {
    togglePlayingState(state) {
      state.isPlaying = !state.isPlaying;
    },
    nextAudio: (state) => {
      state.repeat.repeatCount = 1;
      if (state.shuffle) {
        getRandomMusic(state);
      } else {
        const indexOfCurrentSong = indexOfCurrentState(state);
        if (indexOfCurrentSong < state.songs.length - 1) {
          state.currentSong = state.songs[indexOfCurrentSong + 1];
        } else {
          state.currentSong = state.songs[0];
        }
      }
    },
    prevAudio: (state) => {
      state.repeat.repeatCount = 1;
      if (state.shuffle) {
        getRandomMusic(state);
      } else {
        const indexOfCurrentSong = indexOfCurrentState(state);
        if (indexOfCurrentSong !== 0) {
          state.currentSong = state.songs[indexOfCurrentSong - 1];
        } else {
          state.currentSong = state.songs[state.songs.length - 1];
        }
      }
    },
    shuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    songListUpdated: (state, action) => {
      state.songs = action.payload;
    },
    changeSong: (state, action) => {
      state.repeat.repeatCount = 1;
      const newSongIndex = find(state.songs, action.payload);
      state.currentSong = state.songs[newSongIndex];
    },
  },
});

export const nextSong = createAction("playerSlice/nextAudio", () => ({}));
export const prevSong = createAction("playerSlice/prevAudio", () => ({}));
export const shuffleSong = createAction("playerSlice/shuffle", () => ({}));
export const changeSong = createAction("player/changeSong", (currentSong) => ({
  payload: currentSong,
}));
export const { togglePlayingState } = playerSlice.actions;

export default playerSlice.reducer;
