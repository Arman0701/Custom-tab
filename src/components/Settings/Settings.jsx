import style from "./Settings.module.scss";
import SettingsThemeItem from "../SettingsThemeItem";
import SettingsBackgroundItem from "../SettingsBackgroundItem";
import Loader from "../Loader";
import { useTransition, animated } from "react-spring";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeColor, changeSize, getSettings, saveSettings } from "../../redux-store/settingsSlice";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase/config";
import SettingsFontItem from "../SettingsFontItem";
import localStorageHook from "../../hooks/useLocalStorage";

export default function Settings() {
    const transition = useTransition(true, {
        from: { opacity: 0, y: 50 },
        enter: { opacity: 1, y: 0 },
    });
	const userID = localStorageHook('current-user-id')
    const dispatch = useDispatch();
    const { size, color, fonts, themes, backgroundImages } = useSelector((store) => store.settingsSlice.value);
	const isLoading = useSelector(store => store.settingsSlice.isLoading)

    const sizeChangeHandler = useCallback((e) => {
        dispatch(changeSize(e.target.value));
    }, []);
    const colorChangeHandler = useCallback((e) => {
        dispatch(changeColor(e.target.value));
    }, []);
	const saveSettingsHandler = useCallback(() => {
		dispatch(saveSettings())
	}, [])
    useEffect(() => {
        onValue(ref(db, `global/users/${userID}/settings`), (snapshot) => {
            dispatch(getSettings(snapshot.val()));
        });
    }, []);

    return transition((styles, item) => {
        return item ? (
			<>
				<Loader trigger={isLoading} styles={{
					position: 'absolute',
					width: '50px',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}} />
				<animated.div className={style.settingsWrapper} style={styles}>
					<div className={style.settingsHeader}>
						<h2>Settings</h2>
						<button className={style.saveSettingsButton} onClick={saveSettingsHandler}>Save settings</button>
					</div>
					<div className={style.backgroundBlock}>
						<h3>Background Images</h3>
						<div className={style.images}>
							{backgroundImages?.length > 0 && backgroundImages.map(image => <SettingsBackgroundItem key={image.id} item={image} />)}
						</div>	
					</div>
					<div className={style.themesBlock}>
						<h3>Themes</h3>
						<div className={style.themes}>
							{themes?.length > 0 && themes.map((theme) => <SettingsThemeItem key={theme.id} item={theme} />)}
						</div>
					</div>
					<div className={style.textDecorationBlock}>
						<div className={style.block}>
							<h3><span>Size</span><span>{size}px</span></h3>
							<input type="range" min="16" max="30" step="1" value={size} onChange={sizeChangeHandler} />
						</div>
						<div className={style.block}>
							<h3><span>Color</span><span>{color}</span></h3>
							<input type="color" onChange={colorChangeHandler} value={color} />
						</div>
						<div className={style.block}>
							<h3>Font</h3>
							<label htmlFor="fonts" />
							<select id="fonts">
								{fonts?.length > 0 && fonts.map(font => <SettingsFontItem key={font.id} item={font} />)}
							</select>
						</div>
					</div>
				</animated.div>
			</>
        ) : null;
    });
}
