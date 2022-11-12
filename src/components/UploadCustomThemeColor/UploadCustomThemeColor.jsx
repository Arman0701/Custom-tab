import { useRef, useState } from "react";
import { v4 as getID } from "uuid";
import addToDb from "../../helpers/addToDb";
import palette from "../../assets/icons/palette.svg";
import style from "./UploadCustomThemeColor.module.scss";
import { useSelector } from "react-redux";

export default function UploadCustomThemeColor() {
    const [ color, setColor ] = useState('#FFFFFF')
	const textRef = useRef()
	const colorRef = useRef()
	const themes = useSelector(store => store.settingsSlice.value.settings?.themes) || []

    function colorChangeHandler(e) {
        setColor(e.target.value);
    }
	function addThemeHandler() {
		if (textRef.current.value) {
			const theme = {
				id: getID(),
				name: textRef.current.value,
				color,
				isActive: false
			}
			addToDb(`settings/themes/`, [ ...themes, theme])
		}
	}
	function toggleColorHandler() {
		colorRef.current.click()
	}

    return (
        <div className={style.customThemeWrapper}>
            <h3>Upload custom color theme</h3>
            <div
                className={style.themeWrapper}
                style={{
                    background: color,
                }}
            ></div>
            <footer className={style.themeControlsFooter}>
				<div className={style.controls}>
					<div className={style.colorButton} onClick={toggleColorHandler} >
						<img src={palette} alt="icon" />
						<input type="color" value={color} onChange={colorChangeHandler} ref={colorRef} />
					</div>
					<input type="text" placeholder="Name your color" className={style.textInput} ref={textRef} />
				</div>
                <button className={style.footerButton} onClick={addThemeHandler} >
                    Add custom color theme
                </button>
            </footer>
        </div>
    );
}
