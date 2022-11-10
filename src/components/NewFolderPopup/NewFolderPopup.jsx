import { useDispatch } from "react-redux";
import style from "./NewFolderPopup.module.scss";
import palette from "../../assets/icons/palette.svg";
import { useRef } from "react";
import { addFolder } from "../../redux-store/foldersSlice";

export default function NewFolderPopup() {
	const dispatch = useDispatch()
	const nameInputRef = useRef()
	const descriptionInputRef = useRef()
	const colorInputRef = useRef()

	function submitHandler(e) {
		e.preventDefault()

		dispatch(addFolder({
			name: nameInputRef.current.value,
			description: descriptionInputRef.current.value,
			bgColor: colorInputRef.current.value,
		}))
	}
	function toggleColor() {
		colorInputRef.current.click()
	}
	
    return <div className={style.newFolderPopup}>
		<form onSubmit={submitHandler}>
			<h3>Create new folder</h3>
			<div className={style.container}>
				<input type="text" placeholder="Folder's name" ref={nameInputRef} />
				<button onClick={toggleColor} >
					<span>Choose background</span>
					<div className={style.iconWrapper}>
						<img src={palette} alt="icon" />
					</div>
					<input type="color" ref={colorInputRef} />
				</button>
			</div>
			<input type="text" placeholder="Folder's description" ref={descriptionInputRef} />
			<button className={style.createButton}><span>Create new folder</span></button>
		</form>
	</div>
}
