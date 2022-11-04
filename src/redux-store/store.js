import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import mainLinksSlice from "./mainLinksSlice";
import foldersSlice from "./foldersSlice";
import notesSlice from "./notesSlice";
import settingsSlice from "./settingsSlice";
import searchSlice from "./searchSlice";

export default configureStore({
	reducer: {
		userSlice,
		mainLinksSlice,
		foldersSlice,
		notesSlice,
		settingsSlice,
		searchSlice,
	}
})