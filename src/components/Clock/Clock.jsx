import { useEffect, useState } from 'react';
import style from './Clock.module.scss';
import moment from "moment"

export default function Clock() {
	const [ clock, setClock ] = useState(moment().format('HH:mm:ss'))
	const [ date, setDate ] = useState(moment().format('DD.MM.YY'))

	useEffect(() => {
		const intervalID = setInterval(() => {
			setClock(moment().format('HH:mm:ss'));
		}, 1000);
		return () => clearInterval(intervalID)
	}, []);

	useEffect(() => {
		const intervalID = setInterval(() => {
			if (moment().format('HH:mm') === '00:00') {
				setDate(moment().format('DD.MM.YY'));
			}
		}, 60000)
		return () => clearInterval(intervalID);
	}, [])	

	useEffect(() => {
		window.onblur = () => {
			document.title = "Clock: " + clock
		}
		window.onfocus = () => { document.title = "Custom Tab" }
		
		document.hidden && document.hidden
			? document.title = "Clock: " + clock
			: document.title = "Custom Tab"
	}, [clock])

	return (
		<div className={style.dateTime}>
			<p>{clock}</p>
			<p>{date}</p>
		</div>
	)
}