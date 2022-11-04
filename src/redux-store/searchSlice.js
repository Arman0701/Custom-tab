import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
	name: "searchSlice",
	initialState: {
		value: {},
		output: "",
		status: false,
	},
	reducers: {
		search(state, payload) {
			
		}
	}
})

export const {search} = searchSlice.actions
export default searchSlice.reducer