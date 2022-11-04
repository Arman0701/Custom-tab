import { useRef } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux-store/notesSlice";
import TodosListWrapper from "../../components/TodosListWrapper";
import Popup from "reactjs-popup";
import plus from "../../assets/icons/plus.svg";
import style from "./TodosList.module.scss";
import priority from "../../assets/icons/priority.svg";
import palette from "../../assets/icons/palette.svg";
import { useState } from "react";
import { useEffect } from "react";

export default function TodosList() {
	const inputRef = useRef()
	const colorInputRef = useRef()
	const dispatch = useDispatch()
	const [pr, setPr] = useState('None');

	const submitHandler = useCallback((e) => {
		e.preventDefault()

		dispatch(addTodo({
			title: inputRef.current.value,
			color: colorInputRef.current.value,
			priority: pr
		}))
	}, [pr])

	const toggleColorHandler = useCallback(() => {
		colorInputRef.current.click()
	}, [])

    return <div className={style.todosWrapper}>
		<Popup
			trigger={
				<div className={style.newTodoButton}>
					<img src={plus} alt="icon" />
				</div>
			}
			arrow={false}
			nested
			position="bottom left"
		>
			<div className={style.todoFormWrapper}>
				<h3>Add new todo</h3>
				<form className={style.formContainer} onSubmit={submitHandler} >
					<input type="text" placeholder="Add todo here" ref={inputRef} />
					<div className={style.options}>
						<div className={style.optionButton} onClick={toggleColorHandler} >
							<img src={palette} alt="icon" />
							<input type="color" defaultValue="white" ref={colorInputRef} />
						</div>
						<Popup
							trigger={
								<div className={style.optionButton}>
									<img src={priority} alt="icon" />
								</div>
							}
							arrow={false}
							position="bottom left"
							nested
						>
							<div className={style.priorityPopupWrapper}>
								<p className={style.popupItem} onClick={() => setPr("High")} >High</p>
								<p className={style.popupItem} onClick={() => setPr("Medium")} >Medium</p>
								<p className={style.popupItem} onClick={() => setPr("Low")} >Low</p>
								<p className={style.popupItem} onClick={() => setPr("None")} >None</p>
							</div>
						</Popup>
					</div>
					<button onClick={submitHandler}>Add</button>
				</form>
			</div>
		</Popup>
		<TodosListWrapper />
	</div>;
}
