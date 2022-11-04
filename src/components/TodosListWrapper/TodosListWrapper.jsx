import { useDispatch, useSelector } from "react-redux";
import TodoListItem from "../../components/TodoListItem";
import MessageBox from "../../components/MessageBox";
import style from "./TodosListWrapper.module.scss";
import { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase/config";
import localStorageHook from "../../hooks/useLocalStorage";
import { initTodos } from "../../redux-store/notesSlice";

export default function TodosListWrapper() {
	const todos = useSelector(store => store.notesSlice.value.todoList)
	const userID = localStorageHook("current-user-id")
	const dispatch = useDispatch()
	
	useEffect(() => {
		onValue(ref(db, `global/users/${userID}/notes/todoList`), snapshot => {
			dispatch(initTodos(snapshot.val()))
		})
	}, [])

    return <div className={style.todoListWrapper}>
		{todos[0] &&
			todos.map(todo => <TodoListItem key={todo.id} item={todo} />)
		}	
		<MessageBox trigger={!todos.length} message="No todos yet! You can add that by click on plus in top left corner." customStyles={{
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)"			
		}} />
	</div>;
}
