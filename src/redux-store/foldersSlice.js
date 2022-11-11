import { createSlice } from "@reduxjs/toolkit";
import { v4 as getID } from "uuid";
import addToDb from "../helpers/addToDb";
import logout from "./userSlice"

export const foldersSlice = createSlice({
	name: "foldersSlice",
	initialState: {
		value: []
	},
	reducers: {
		initFolders(state, {payload}) {
			if (payload) state.value = payload;
		},
		addFolder(state, {payload}) {
			const newFolder = {
				id: getID(),
				name: payload.name,
				description: payload.description || "",
				links: [],
				bgColor: payload.bgColor === "#000000" ? "rgba(white, 0.4)" : payload.bgColor,
				creationDate: new Date().toLocaleDateString("en-US", {
					weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: "numeric", minute: "numeric"
				}),
			}
			state.value = [...state.value, newFolder]
			addToDb("folders/", state.value)
			}
		},
		removeFolder(state, {payload}) { // folderID
			state.value = state.value.filter(folder => folder.id !== payload.folderID)
			addFolder("folders/", state.value)
		},
		editFolder(state, {payload}) { // folderID, title, description, bgColor
			console.log('Log payload ::: ', payload)
			state.value = state.value.map(folder => {
				if (folder.id === payload.folderID) {
					return {
						...folder,
						name: payload.name,
						description: payload.description,
						bgColor: payload.bgColor
					}
				}
				return folder;
			})
			addFolder("folders/", state.value)
		},

// ====================================================================
// ====================================================================

		addLinkInFolder(state, {payload}) {
			
		},
		removeLinkFromFolder(state, {payload}) {
			
		},
		editLinkInFolder(state, {payload}) {
			
	},

	// extraReducers: (builder) => {
	// 	builder.addCase(logout, state => {
	// 		console.log("folders");
	// 		state.value = {}
	// 	})
	// }
});

export const {
	initFolders,
	addFolder,
	removeFolder,
	editFolder,

	addLinkInFolder,
	removeLinkFromFolder,
	editLinkInFolder,
	toggleFavStateInFolder,
} = foldersSlice.actions;
export default foldersSlice.reducer;