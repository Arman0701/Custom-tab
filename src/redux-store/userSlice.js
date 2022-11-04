import { createSlice } from "@reduxjs/toolkit";
import addToDb from "../helpers/addToDb"

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        value: {
			uid: "",
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			mainLinks: [],
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
    },
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
                        // [iamge.id]: {
                        // 	id: 651,
                        // 	name: "",
                        // 	isActive: false
                        // },
                    },
                    fonts: {
                        // [font.id]: {
                        // 	id: 4654,
                        // 	name: "",
                        // 	isActive: false
                        // }
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
    },
});

export const { initUser, createUser } = userSlice.actions;
export default userSlice.reducer;
