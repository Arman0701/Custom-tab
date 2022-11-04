import style from './SettingsThemeItem.module.scss';

export default function SettingsThemeItem({item}) {
	const { color, name, isActive } = item;

	return (
		<div className={style.themeItemWrapper} style={{
			border: `2px solid ${isActive ? "red" : "transparent"}`
		}}>
			<div className={style.themeColor} style={{
				backgroundColor: color,
			}}>
			</div>
			<p>{name}</p>
		</div>
	)
}