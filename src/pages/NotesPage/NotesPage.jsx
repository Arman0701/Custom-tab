import { useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import style from "./NotesPage.module.scss";

export default function NotesPage() {
	const todoButtonRef = useRef()

	return <>
		<div className={style.notesPageWrapper}>
			<div className={style.tabsBlock}>
				<Link to="/notes/todo-list"><button ref={todoButtonRef}>Todos</button></Link>
				<Link to="/notes/note-list"><button>Notes</button></Link>
			</div>

			<Outlet />
		</div>
	</>
}
