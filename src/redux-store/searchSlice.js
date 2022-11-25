import { createSlice, current } from "@reduxjs/toolkit";
import { initUser, logout } from "../redux-store/userSlice";

const initialState = {
    searchingData: {},
    output: [],
    filter: "mainLinks",
	status: false,
};

export const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {
        initSearchingData(state, { payload }) {
            state.searchingData = payload;
        },
        searchByFilter(state, { payload }) {
            const { searchingData, filter } = state;

			try {
				switch (filter) {
					case "mainLinks":
						// collect all links from all folders
						// and make a simple array of links
						// for searching

						state.output = searchingData[filter].map(link => {
							let result;
							for (let value of Object.values(link)) {
								if (typeof value === "string" && value.toLowerCase().includes(payload.toLowerCase())) {
									result = link;
								}
							}
							return result;
						})
						break;
					
					case "folders":
						state.output = searchingData[filter].map(folder => {
							let result;
							for (let value of Object.values(folder)) {
								if (typeof value === "string" && value.toLowerCase().includes(payload.toLowerCase())) {
									result = folder
								}
							}
							return result;
						})
						break;

					case "notes": 
						break;
					
					case "todos":
						break;

					case "audio":
						break;

					case "friends":
						break;
				}
			}
			finally {
				state.status = true;
				state.output = state.output.filter(value => value)
			}

        },
        setFilter(state, { payload }) {
            state.filter = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(initUser, (state, { payload }) => {
            state.searchingData = payload;
        });
        builder.addCase(logout, (state) => {
            state.value = initialState;
        });
    },
});

export const { 
	searchByFilter, 
	setFilter, 
} = searchSlice.actions;
export default searchSlice.reducer;
