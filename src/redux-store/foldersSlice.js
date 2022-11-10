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
			if (payload.name) {
				const folderID = getID()
				const newFolder = {
					id: folderID,
					name: payload.name,
					description: payload.description || "",
					links: [],
					bgColor: payload.bgColor === "#000000" ? "rgba(white, 0.4)" : payload.bgColor,
					creationDate: new Date().toLocaleDateString("en-US", {
						weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: "numeric", minute: "numeric"
					}),
				}
				
				state.value = [ ...state.value, newFolder ]
				setTimeout(() => {
					addToDb(`folders/`, state.value)
				}, 1500)
			}
		},
		removeFolder(state, {payload}) {
			state.value = state.value.filter(item => item.id !== payload.folderID)
			addToDb(`folders/`, state.value)
		},
		editFolder(state, {payload}) {
			state.value = state.value.map(item => {
				if (item.id === payload.folderID) {
					return {
						...item,
						title: payload.title,
						description: payload.description
					}
				}
			})
			addToDb(`folders/`, state.value)
		},

// ====================================================================
// ====================================================================

		addLinkInFolder(state, {payload}) {
			if (payload.address && payload.title) {
				const linkID = getID()
				const newLink = {
					id: linkID,
					title: payload.title,
					address: payload.address,
					isFavourite: false,
				};
				console.log('Log state.value ::: ', state.value)

				state.value = state.value.map(item => {
					if (item.id === payload.folderID) {
						return {
							...item,
							links: [
								...item.links,
								newLink
							]
						}
					}
					return item
				})
				addToDb(`folders/${payload.folderID}/`, state.value) ////////////////
			}
		},
		removeLinkFromFolder(state, {payload}) {
			state.value = state.value.map(item => {
				if (item.id === payload.folderID) {
					const links = item.links.filter(link => link.id !== payload.linkID)
					return {
						...item,
						links,
					}
				}
			})
			addToDb(`folders/${payload.folderID}/`, state.value) /////////////////
		},
		editLinkInFolder(state, {payload}) {
			if (payload.title && payload.address) {
				state.value = state.value.map(item => {
					if (item.id === payload.folderID) {
						const links = item.links.map(link => {
							if (link.id === payload.linkID) {
								return {
									...link,
									title: payload.title,
									address: payload.address,
								}
							}
							return link;
						})
						return {
							...item,
							links
						}
					}
					return item;
				})
				addToDb(`folders/${payload.folderID}/`, state.value)
			}
		},
		toggleFavStateInFolder(state, {payload}) {
			let link = state.value[payload.folderID].links[payload.linkID]
			console.log('Log link ::: ', link)
			link = {
				...link,
				isFavourite: !link.isFavourite
			}
			addToDb(`folders/${payload.folderID}/links/${payload.linkID}`, link)
		}
	},

	extraReducers: (builder) => {
		builder.addCase(logout, state => {
			console.log("folders");
			state.value = {}
		})
	}
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