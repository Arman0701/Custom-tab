import { onValue, ref } from "firebase/database";
import { db } from "../firebase/config";
import localStorageHook from "../hooks/useLocalStorage";

export const  getDataFromDb = (path) => {
	let result = '';
	const userID = localStorageHook('current-user-id')
	const route = path ? `global/users/${userID}/${path}` : `global/users/${userID}`
	
	onValue(ref(db, route), snapshot => {
		result = snapshot.val()
	})
	return result;
}