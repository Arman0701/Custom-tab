import { createSlice } from "@reduxjs/toolkit";
import addToDb from "../helpers/addToDb";

export const settingsSlice = createSlice({
    name: "settingsSlice",
    initialState: {
		value: {
			themes: [],
			backgroundImages: [],
			fonts: [],
			size: 16,
			color: "#ffffff",
		},
		isLoading: true
    },
    reducers: {
        getSettings(state, { payload }) {
            if (payload) {
				state.isLoading = false;
				state.value = payload;
			}
        },
        changeTheme(state, { payload }) {
			// payload === item.id
			state.value.themes = state.value.themes.map(item => {
				if (item.id === payload) return { ...item, isActive: true }
				else return { ...item, isActive: false }
			})
        },
		changeBackground(state, {payload}) {
			// payload === item.id
			state.value.backgroundImages = state.value.backgroundImages.map(item => {
				if (item.id === payload) return { ...item, isActive: true }
				else return { ...item, isActive: false }
			})
		},
		changeSize(state, {payload}) {
			// payload === font size value (type number)
			state.value.size = payload
		},
		changeColor(state, {payload}) {
			// payload === color hex value
			state.value.color = payload
		},
		changeFont(state, {payload}) {
			// payload === item.id
			state.value.fonts = state.value.fonts.map(item => {
				if (item.id === payload) return { ...item, isActive: true }
				else return { ...item, isActive: false }
			})
		},
		saveSettings(state) {
			addToDb('settings/', state.value)
		}
    },
});

export const {
	changeSize,
	changeFont,
	getSettings,
	changeColor,
	changeTheme,
	saveSettings,
	changeBackground,
} = settingsSlice.actions;
export default settingsSlice.reducer;
