import style from "./NoteExpandedPopup.module.scss";

import trash from "../../assets/icons/trash.svg";
import pencil from "../../assets/icons/pencil.svg";
import palette from "../../assets/icons/palette.svg";

import { useDispatch } from "react-redux";
import { deleteNote, editNote } from "../../redux-store/notesSlice";
import { useState } from "react";
import { useRef } from "react";

export default function NoteExpandedPopup({ item, setOpen }) {
	const {id, background, title, description, creationDate} = item;
	
	const dispatch = useDispatch();
	const [editMode, setEditMode] = useState(false);
	const inputRef = useRef();
	const descriptionRef = useRef();
	const colorRef = useRef();

	function editHandler() {
		if (editMode) {
			dispatch(editNote({
				id,
				title: inputRef.current.value,
				description: descriptionRef.current.value,
				background: colorRef.current.value
			}))
		}
		
		setEditMode(m => !m)
	}

	function tabButtonModifyingHandler(e) {
		if (e.key === "Tab") {
			e.preventDefault();
			var start = descriptionRef.current.selectionStart;
			var end = descriptionRef.current.selectionEnd;
		
			descriptionRef.current.value = descriptionRef.current.value.substring(0, start) + "\t" + descriptionRef.current.value.substring(end);
		
			descriptionRef.current.selectionStart = descriptionRef.current.selectionEnd = start + 1;
		}
	}

	function removeHandler() {
		dispatch(deleteNote(id))
		setOpen(false)
	}

	function toggleColor() {
		colorRef.current.click()
	}
	
    return <div className={style.expandedNoteWrapper} style={{
		background,
	}}>
		{!editMode ? <>
			<h3>{title}</h3>	
			<pre>{JSON.parse(description)}</pre>
		</> : <>
			<input type="text" defaultValue={title} ref={inputRef} autoFocus placeholder="Note title here..." />
			<textarea placeholder="Note description here..." onKeyDown={tabButtonModifyingHandler} ref={descriptionRef} defaultValue={JSON.parse(description)}></textarea>
		</>
		}
		<span>{creationDate}</span>
		
		<div className={style.options}>
			<button onClick={editHandler}>
				<div className={style.iconWrapper}>
					<img src={pencil} alt="icon" />
				</div>
				<span>Edit</span>
			</button>
			<button onClick={removeHandler}>
				<div className={style.iconWrapper}>
					<img src={trash} alt="icon" />
				</div>
				<span>Remove</span>
			</button>
			<button disabled={!editMode} onClick={toggleColor}>
				<div className={style.iconWrapper}>
					<img src={palette} alt="icon" />
				</div>
				<span>Change background</span>
				<input type="color" ref={colorRef} defaultValue={background} />
			</button>
		</div>
	</div>
}
