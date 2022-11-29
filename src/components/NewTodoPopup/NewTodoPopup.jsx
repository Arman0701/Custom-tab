import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";

import palette from "../../assets/icons/palette.svg";
import { addTodo } from "../../redux-store/notesSlice";

import style from "./NewTodoPopup.module.scss";

export default function NewTodoPopup() {
	const inputRef = useRef()
	const colorRef = useRef()
	const dispatch = useDispatch();

	const [priority, setPriority] = useState(null);

	function setPriorityHandler(value) {
		return function() {
			setPriority(value)
		}
	}

	function colorTrigger() {
		colorRef.current.click()
	}

	function onSubmitHandler(e) {
		e.preventDefault();

		dispatch(addTodo({
			title: inputRef.current.value,
			background: colorRef.current.value,
			priority,
		}))

		inputRef.current.value = ""
	}
	
    return <form onSubmit={onSubmitHandler} className={style.newTodoPopupWrapper}>
		<input type="text" placeholder="New task here..." ref={inputRef} autoFocus />
		<div className={style.options}>
			<div onClick={colorTrigger}>
				<img src={palette} alt="icon" />
				<input type="color" ref={colorRef} defaultValue="#FFFFFF" />
			</div>
			<div className={style.priorityWrapper}>
				<details>
					<summary>{priority || "Priority :"}</summary>
					<p onClick={setPriorityHandler("None")} className={style.option}>None</p>
					<p onClick={setPriorityHandler("High")} className={style.option}>High</p>
					<p onClick={setPriorityHandler("Medium")} className={style.option}>Medium</p>
					<p onClick={setPriorityHandler("Low")} className={style.option}>Low</p>
				</details>
			</div>
			<button onClick={onSubmitHandler}>Add task</button>
		</div>
	</form>;
}
