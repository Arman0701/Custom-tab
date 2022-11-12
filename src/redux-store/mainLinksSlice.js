import { createSlice } from "@reduxjs/toolkit";
import addToDb from "../helpers/addToDb";
import { v4 as getID } from "uuid";
import { logout } from "./userSlice";
import { moveToGeneral } from "./foldersSlice";

const initialState = {
	value: [],
	isLoading: true,
}

export const mainLinksSlice = createSlice({
    name: "mainLinksSlice",
    initialState,
    reducers: {
        getLinks(state, { payload }) {
            if (payload) {
				state.isLoading = false
				state.value = payload
			}
        },
        addLink(state, { payload }) {
            // paylaod === title address
            if (payload.title && payload.address) {
				state.isLoading = false
				const newLink = {
					id: getID(),
                    title: payload.title,
                    address: payload.address,
                    isFavourite: false,
                };
                addToDb("/mainLinks/", [...state.value, newLink]);
                state.value.push(newLink);
            }
        },
        removeLink(state, { payload }) {
            // payload === link.id

            state.value = state.value.filter((link) => link.id !== payload);
			addToDb('mainLinks/', state.value)
        },
        editLink(state, { payload }) {
            // payload === link.id title address
            if (payload.title && payload.address) {
				let index = 0;
                state.value = state.value.map((link, idx) => {
                    if (link.id === payload.id) {
						index = idx
                        return {
                            ...link,
                            title: payload.title,
                            address: payload.address,
                        };
                    }
                    return link;
                });
				addToDb(`mainLinks/${index}/title`, payload.title)
				addToDb(`mainLinks/${index}/address`, payload.address)
            }
        },
        toggleFavState(state, { payload }) {
            // payload === link.id

            state.value = state.value.map((link) => {
                if (link.id === payload) {
                    return {
                        ...link,
                        isFavourite: !link.isFavourite,
                    };
                }
                return link;
            });
			addToDb('mainLinks/', state.value)
        },
		hideLink(state, {payload}) {
			// payload === link.id
			
			state.value = state.value.map(link => {
				if (link.id === payload) {
					return {
						...link,
						hidden: true,
					}
				}
				return link;
			})
			addToDb('mainLinks/', state.value)
		}
    },
	extraReducers: (builder) => {
		builder.addCase(logout, (state) => {
			console.log("main links");
			state = initialState
		})
		builder.addCase(moveToGeneral, (state, {payload}) => {
			console.log('Log payload.actualLink[0] ::: ', payload.actualLink[0])
			state.value = [...state.value, payload.actualLink[0]]

			addToDb("folders/", [...state.value, payload.actualLink[0]])
		})
	}
});

export const {
    addLink,
	hideLink,
    editLink,
    removeLink,
    toggleFavState,
    getLinks,
} = mainLinksSlice.actions;
export default mainLinksSlice.reducer;

