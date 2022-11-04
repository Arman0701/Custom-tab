import { useDispatch } from 'react-redux';
import { changeBackground } from '../../redux-store/settingsSlice';
import style from './SettingsBackgroundItem.module.scss';

export default function SettingsBackgroundItem({ item }) {
	const { isActive, imageURL, name, id } = item;
	const dispatch = useDispatch()

	function changeBgHandler() {
		dispatch(changeBackground(id))
	}

	return (
		<div className={style.bgItemWrapper} onClick={changeBgHandler} style={{
			border: `2px solid ${isActive ? "red" : "transparent"}`
		}}>
			<img src={imageURL} alt="background" />
			<p>{name}</p>
		</div>
	)
}