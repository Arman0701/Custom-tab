import style from "./UploadCustomFont.module.scss";
import convertFontFileToBase64 from "../../helpers/convertFontFileToBase64";
import addToDb from "../../helpers/addToDb";
import { useRef, useState } from "react";
import { ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import { useSelector } from "react-redux";
import { v4 as getID } from "uuid";
import { uploadBytes } from "firebase/storage";

export default function UploadCustomFont() {
	const { uid, firstName, lastName } = useSelector(store => store.userSlice.value)
	const fonts = useSelector(store => store.settingsSlice.value.fonts) || []
	const [ name, setName ] = useState()
	const [ file, setFile ] = useState()
	const inputRef = useRef()
	
    async function onFileInput(e) {
		const { files } = e.currentTarget;
        if (files && files?.length > 0) {
			setFile(files[0])
			setName(files[0].name.substring(0, files[0].name.lastIndexOf('.')))
        }
    };

	function inputToggleHandler() {
		inputRef.current.click()
	}
	
	async function fontUploadHandler() {
		const storageRef = ref(storage, `users/${uid}-${firstName}-${lastName}/fonts/${name}`)
		uploadBytes(storageRef, file)

		const font = {
			id: getID(),
			name,
			isActive: false
		}
		addToDb(`settings/fonts/`, [ ...fonts, font ])

		const fontConverted = await convertFontFileToBase64(file);		
		const fontFace = new FontFace(`${name}`, `url(${fontConverted})`);
		await fontFace.load().then(() => {
			document.fonts.add(fontFace);
			document.querySelector('body').style.fontFamily = name
			document.querySelectorAll('button').forEach((element) => {
				element.style.fontFamily = name
			})
		});
	}

    return (
        <div className={style.fontUploaderWrapper}>
            <h3>Upload custom font</h3>
			<div className={style.controls}>
				<button className={style.browseButton} onClick={inputToggleHandler} >Browse</button>
				{name && <button className={style.uploadButton} onClick={fontUploadHandler} >Upload</button>}
				<span>{ name }</span>
			</div>
            <input type="file" onInput={onFileInput} accept={".ttf"} ref={inputRef} />
        </div>
    );
}
