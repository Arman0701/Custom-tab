import { createSlice } from "@reduxjs/toolkit";
import addToDb from "../helpers/addToDb"

const initialState = {
	value: {
		uid: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		mainLinks: [],
		profileImageURL: "",
		notes: {
			todoList: [],
			noteList: []
		},
		folders: {},
		settings: {
			themes: [],
			backgroundImages: [],
			fonts: [],
			size: 20,
			color: "",
		},
	},
	isLoading: true
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        initUser(state, { payload }) {
			state.value = payload
			state.isLoading = false
		},
        createUser(state, { payload }) {
			const newUserData = {
                ...payload,

                settings: {
                    themes: {
                        dark: {
                            color: "black",
                            isActive: false,
                        },
                        light: {
                            color: "white",
                            isActive: false,
                        },
                        purple: {
                            color: "purple",
                            isActive: false,
                        },
                    },
                    backgroundImages: {
                    },
                    fonts: {
                    },
                    size: 20,
                    color: "",
                },
				mainLinks: [],
				notes: {
					todoList: [],
					noteList: []
				},
				folders: {}
            };
			addToDb(null, newUserData)
            state.value = newUserData;
        },
		logout(state) {
			console.log("user");
			state = initialState
		}
    },
	
});

export const { initUser, createUser, logout } = userSlice.actions;
export default userSlice.reducer;
