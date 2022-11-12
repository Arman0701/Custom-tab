import { createSlice } from "@reduxjs/toolkit";
import { v4 as getID } from "uuid";
import addToDb from "../helpers/addToDb";
import logout from "./userSlice";

export const foldersSlice = createSlice({
    name: "foldersSlice",
    initialState: {
        value: [],
		temp: {}
    },
    reducers: {
        initFolders(state, { payload }) {
            if (payload) state.value = payload;
        },
        addFolder(state, { payload }) {
			// name
            if (payload.name) {
                const newFolder = {
                    id: getID(),
                    name: payload.name,
                    description: payload.description || "",
                    links: [],
                    bgColor:
                        payload.bgColor === "#000000"
                            ? "rgba(white, 0.4)"
                            : payload.bgColor,
                    creationDate: new Date().toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    }),
                };
                state.value = [...state.value, newFolder];
                addToDb("folders/", state.value);
            }
        },
        removeFolder(state, { payload }) {
            // folderID
            state.value = state.value.filter(
                (folder) => folder.id !== payload
            );
            addToDb("folders/", state.value);
        },
        editFolder(state, { payload }) {
            // folderID, title, description, bgColor
			
            state.value = state.value.map((folder) => {
                if (folder.id === payload.folderID) {
                    return {
                        ...folder,
                        name: payload.name,
                        description: payload.description,
                        bgColor: payload.bgColor,
                    };
                }
                return folder;
            });
            addToDb("folders/", state.value);
        },

        // ====================================================================

        addLinkInFolder(state, { payload }) {
			// title, address, folderID
            const { title, address, folderID } = payload;
            if (title && payload) {
                const newLink = {
                    id: getID(),
                    title,
                    address,
                    isFavourite: false,
                };
                state.value = state.value.map((folder) => {
                    if (folder.id === folderID) {
                        return {
                            ...folder,
                            links: folder?.links
                                ? [...folder.links, newLink]
                                : [newLink],
                        };
                    }
                    return folder;
                });
				addToDb("folders/", state.value)
            }
        },
        removeLinkFromFolder(state, { payload }) {
			// folderID, linkID
			state.value = state.value.map(folder => {
				if (folder.id === payload.folderID) {
					return {
						...folder,
						links: folder.links.filter(link => link.id !== payload.linkID)
					}
				}
				return folder
			})
			addToDb("folders/", state.value)
		},
        editLinkInFolder(state, { payload }) {
			const {folderID, linkID, title, address} = payload
			if (title && address) {
				state.value = state.value.map(folder => {
					if (folder.id === folderID) {
						return {
							...folder,
							links: folder.links.map(link => {
								if (link.id === linkID) {
									return {
										...link,
										title,
										address
									}
								}
								return link
							})
						}
					}
					return folder
				})
				addToDb("folders/", state.value)
			}
		},
		toggleFavStateInFolder(state, {payload}) {
			state.value = state.value.map(folder => {
				if (folder.id === payload.folderID) {
					return {
						...folder,
						links: folder.links.map(link => {
							if (link.id === payload.linkID) {
								return {
									...link,
									isFavourite: !link.isFavourite,
								}
							}
							return link
						})
					}
				}
				return folder
			})
		},
		moveToFolder(state, {payload}) {

		},
		moveToGeneral(state, {payload}) {
			// folderID, linkID
			const { folderID, linkID } = payload
			state.value = state.value.map(folder => {
				if (folder.id === folderID) {
					return {
						...folder,
						links: folder.links.filter(link => link.id !== linkID)
					}
				}
				return folder
			})
			addToDb("folders/", state.value)
			console.log('end');
		}
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state) => {
            console.log("folders");
            state.value = {};
        });
    },
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
	moveToFolder,
	moveToGeneral,
} = foldersSlice.actions;
export default foldersSlice.reducer;
