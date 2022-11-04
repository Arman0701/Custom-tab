import { onValue, ref } from 'firebase/database';
import { db } from './firebase/config';
import { useEffect, useState } from 'react';
import style from './App.module.scss';
import Header from './components/Header';
import Main from "./components/Main/Main";
import RoutesAnimatedComponent from "./components/RoutesAnimatedComponent";
import localStorageHook from './hooks/useLocalStorage';

export default function App() {
	const [ bg, setBg ] = useState()
	const userID = localStorageHook('current-user-id')
	useEffect(() => {
		onValue(ref(db, `/global/users/${userID}/settings/backgroundImages`), snapshot => {
			setBg(snapshot.val().filter(item => item.isActive)[0])
		})
	}, [])
	return (
		<div className={style.wrapper} style={
			bg?.imageURL ? {
				backgroundImage: `url(${bg?.imageURL})`
			} : {
				background: "black"
			}
		}>
			<Header />
			<Main>
				<RoutesAnimatedComponent />
			</Main>
		</div>
	)
}
