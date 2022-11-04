import { set, ref } from "firebase/database";
import { db } from "../firebase/config";
import localStorageHook from "../hooks/useLocalStorage";

export default function addToDb(path, dataToAdd) {
	let userID = localStorageHook('current-user-id')
	
	if (!path) {
		set(ref(db, `global/users/${userID}/`), dataToAdd);
	} else {
		set(ref(db, `global/users/${userID}/${path}`), dataToAdd);
	}
}