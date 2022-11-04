import { useCallback } from "react";
import { toggleTodoState, removeTodo, editTodo } from "../../redux-store/notesSlice";
import pencil from "../../assets/icons/pencil.svg";
import trash from "../../assets/icons/trash.svg";
import style from "./TodoListItem.module.scss";
import { useDispatch } from "react-redux";

export default function TodoListItem({ item }) {
	const dispatch = useDispatch()
    const { title, creationDate, color, priority, checked, id } = item;

	function setPriority() {
		switch(priority) {
			case "High":
				return "red"
			case "Medium":
				return "blue"
			case "Low": 
				return "green"
			case "None":
				return "rgba(255, 255, 255, 0.4)"
		}
	}

	function changeStateHandler() {
		dispatch(toggleTodoState(id))
	}
	function edit() {
		dispatch(editTodo(id))
	}
	function remove() {
		dispatch(removeTodo(id))
	}

    return (
        <div className={style.todoItemWrapper} onClick={changeStateHandler} style={{border: `2px solid ${setPriority()}`}} >
            <div className={style.itemBack} style={{backgroundColor: color === "#000000" ? "whihte" : color}} >
                <div className={style.mainSection}>
					<input type="checkbox" value={checked} onChange={changeStateHandler} />
					<span>{title}</span>
					<div className={style.controls}>
						<div className={style.controlButton} onClick={edit} >
							<img src={pencil} alt="icon" />
						</div>
						<div className={style.controlButton} onClick={remove} >
							<img src={trash} alt="icon" />
						</div>
					</div>
				</div>
				<p className={style.itemInfo}>{creationDate}</p>
            </div>
        </div>
    );
}
