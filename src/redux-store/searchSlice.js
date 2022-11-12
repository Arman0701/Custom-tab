import { createSlice } from "@reduxjs/toolkit";
import { initUser, logout } from "../redux-store/userSlice"

const initialState = {
	value: {},
	output: "",
	filter: "",
	status: false,
}

export const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {
		initSearchingData(state, {payload}) {
			state.value = payload
		},
        search(state, {payload}) {
			
		},
        searchByFilter(state, { payload }) {

		},
		setFilter(state, {payload}) {
			state.filter = payload
		}
    },
	extraReducers: (builder) => {
		builder.addCase(initUser, (state, {payload}) => {
			// this part is sets a filtered data from
			//  user's all state to be searched in feature

			let searchingValues = {}
			for (let key in payload) {
				if (payload[key] instanceof Object) {
					searchingValues[key] = payload[key]
				}
			}
			state.value = searchingValues
		});
		builder.addCase(logout, (state) => {
			state.value = initialState
		})
	}
});

export const { search, searchByFilter, setFilter } = searchSlice.actions;
export default searchSlice.reducer;
