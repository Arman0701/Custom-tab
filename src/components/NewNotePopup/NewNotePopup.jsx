import { useRef } from "react";
import { useDispatch } from "react-redux";
import palette from "../../assets/icons/palette.svg";
import { addNote } from "../../redux-store/notesSlice";

import style from "./NewNotePopup.module.scss";

export default function NewNotePopup() {
	const inputRef = useRef();
	const colorRef = useRef();
	const descriptionRef = useRef();

	const dispatch = useDispatch()

	function toggleColor() {
		colorRef.current.click()
	}

	function onSubmitHandler(e) {
		e.preventDefault();

		dispatch(addNote({
			title: inputRef.current.value,
			description: descriptionRef.current.value,
			background: colorRef.current.value,
		}))

		inputRef.current.value = ""
		descriptionRef.current.value = ""
	}

	function keyDownHandler(e) {
		if (e.key === "Enter") {
			onSubmitHandler(e)
		}
	}
	
    return <form className={style.notePopupWrapper} onSubmit={onSubmitHandler}>
		<div className={style.header}>
			<input type="text" ref={inputRef} placeholder="Note title here..." />
			<div onClick={toggleColor}>
				<img src={palette} alt="icon" />
				<input type="color" ref={colorRef} defaultValue="#FFFFFF" />
			</div>
		</div>
		<textarea ref={descriptionRef} placeholder="Note description here..." onKeyDown={keyDownHandler}></textarea>
		<button>Add note</button>
	</form>
}