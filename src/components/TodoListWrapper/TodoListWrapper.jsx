import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { initTodos } from "../../redux-store/notesSlice";

import localStorageHook from "../../hooks/useLocalStorage";

import MessageBox from "../MessageBox";
import Popup from "reactjs-popup";
import NewTodoPopup from "../../components/NewTodoPopup";
import TodoTask from "../TodoTask";

import plus from "../../assets/icons/plus.svg";

import style from "./TodoListWrapper.module.scss";

export default function TodoListWrapper() {
	const dispatch = useDispatch()
	const userID = localStorageHook("current-user-id")
	const todos = useSelector(store => store.notesSlice.todos);

	useEffect(() => {
		onValue(ref(db, `global/users/${userID}/notes/todoList`), snapshot => {
			dispatch(initTodos(snapshot.val()))
		})
	}, [])
	
    return <div className={style.todoListWrapper}>
		<Popup
			trigger={
				<button>
					<img src={plus} alt="icon" />
				</button>
			}
			arrow={false}
			position="bottom center"
		>
			<NewTodoPopup />
		</Popup>
		{todos[0] ? 
			<div className={style.list}>
				{todos.map(todo => <TodoTask key={todo.id} todo={todo} />)}
			</div> :
			null
		}
		<MessageBox 
			trigger={!todos[0]} 
			message="No todos yet! You can add them by click on plus button in top left corner."
			customStyles={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				border: "2px solid white"
			}}
		/>
	</div>;
}
