import { createSlice } from "@reduxjs/toolkit";
import { v4 as getID } from "uuid";
import addToDb from "../helpers/addToDb";

const initialState = {
    songs: [],
    checkSongs: {
        status: false,
        count: 0,
        checked: [],
    },
    current: {
		id: "",
        name: "",
		number: "",
        songURL: "",
        imageURL: "",
        duration: "",
        currentTime: "",
        favourite: false,
		selected: false,
    },
    repeatCurrent: false,
    shuffle: false,
    isPlaying: false,
    volume: 1,
	muted: false,
};

export const playerSlice = createSlice({
    name: "playerSlice",
    initialState,
    reducers: {
        initSongs(state, { payload }) {
			if (payload) {
				state.songs = payload.map((song, index) => ({...song, number: index}));
				state.current = state.songs[0];
	
				// optional functionality
				state.songs = state.songs.map(song => {
					return {
						...song,
						selected: false,
					}
				})
			}
        },
        toggleRepeat(state) {
            state.repeatCurrent = !state.repeatCurrent;
        },
        toggleShuffle(state) {
            state.shuffle = !state.shuffle;
        },
        togglePlaying(state) {
			state.isPlaying = !state.isPlaying;
        },
		toggleMute(state) {
			state.muted = !state.muted;
		},
		toggleFavourite(state, {payload}) {
			state.songs = state.songs.map(song => {
				if (song.id === payload) {
					return {
						...song,
						favourite: !song.favourite
					}
				}
				return song;
			})
			state.current.favourite = !state.current.favourite
		},
        nextSong(state) {
            if (state.shuffle) {
				const randInt = Math.floor(Math.random() * state.songs.length);
				while (randInt === state.current.number) {
					randInt = Math.floor(Math.random() * state.songs.length);
				}
                state.current = state.songs.filter(song => {
					return song.number === randInt
				})[0]
            } else if (state.current.number === state.songs.length - 1) {
				state.current = state.songs[0]
			} else {
				state.current = state.songs.filter(song => song.number === state.current.number + 1)[0]
			}
        },
        prevSong(state) {
            if (state.shuffle) {
				const randInt = Math.floor(Math.random() * state.songs.length);
				while (randInt === state.current.number) {
					randInt = Math.floor(Math.random() * state.songs.length);
				}
                state.current = state.songs.filter(song => {
					return song.number === randInt
				})[0]
            } else if (state.current.number === 0) {
				state.current = state.songs[state.songs.length - 1]
			} else {
				state.current = state.songs.filter(song => song.number === state.current.number - 1)[0]
			}
        },
        setSong(state, { payload }) {
            state.current = state.songs.filter(song => song.number === payload)[0]
			state.isPlaying = true
        },
		// transform this or delete
        addNewSong(state, { payload }) {
			console.log('Log payload ::: ', payload)
			addToDb("player/songs", [...state.songs, ...payload])
			state.songs = [...state.songs, ...payload]
        },
		addSingleSong(state , {payload}) {
			addToDb("player/songs", [...state.songs, ...payload])
			state.songs = [...state.songs, ...payload]
		},
        deleteSong(state, { payload }) {
			let currentSongNumber;
            state.songs = state.songs.filter((song) => {
				currentSongNumber = song.number;
				return song.id !== payload;
			})
			state.current = state.songs.filter(song => song.number === currentSongNumber)[0]
			addToDb("player/songs", state.songs)
        },
		deleteCurrentSong(state, {payload}) {
			const currentNumber = state.current.number;
			state.current = state.songs.filter(song => song.number + 1 === currentNumber)[0]
			state.songs = state.songs.filter(song => song.id !== payload)
			addToDb("player/songs", state.songs)
		},
        setVolume(state, { payload }) {
			if (payload >= 0 && payload <= 1) state.volume = payload;
        },
        setCurrentSongDuration(state, { payload }) {
            let minutes = "0" + Math.floor(payload / 60);
			let seconds = (payload - minutes * 60).toFixed(0);
            seconds = seconds < 10 ? "0" + seconds : seconds;
            state.current.duration = `${minutes}:${seconds}`;
        },
        setCurrentTime(state, { payload }) {
            let minutes = "0" + Math.floor(payload / 60);
            let seconds = (payload - minutes * 60).toFixed(0);
            seconds = seconds < 10 ? "0" + seconds : seconds === 60 ? "00" : seconds;
            state.current.currentTime = `${minutes}:${seconds}`;
        },
		selectSongs(state) {
			state.checkSongs.status = !state.checkSongs.status
		},
		selectSingleSong(state, {payload}) {
			state.songs.map(song => {
				if (song.number === payload) {
					return {
						...song,
						selected: !song.selected
					}
				}
				return song
			})
		},
		deleteSelectedSongs(state) {
			state.songs = state.songs.filter(song => song.selected)
		},

    },
});

export const {
    initSongs,
    toggleRepeat,
    toggleShuffle,
    togglePlaying,
	toggleMute,
	toggleFavourite,
    nextSong,
    prevSong,
    setVolume,
    setSong,
    addNewSong,
	addSingleSong,
    deleteSong,
	deleteCurrentSong,
    setCurrentSongDuration,
    setCurrentTime,

	selectSingleSong,
	selectSongs,
	deleteSelectedSongs,
} = playerSlice.actions;
export default playerSlice.reducer;