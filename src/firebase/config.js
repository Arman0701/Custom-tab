import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD1ihgAjd13uWw-D328F08k8QAlIkfuuMA",
    authDomain: "custom-tab.firebaseapp.com",
    projectId: "custom-tab",
    storageBucket: "custom-tab.appspot.com",
    messagingSenderId: "642424345146",
    appId: "1:642424345146:web:d7aac15bff4dc0d3b19b03",
	databaseURL: "https://custom-tab-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getDatabase(app);
export const auth = getAuth(app);