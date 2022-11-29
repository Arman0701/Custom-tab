import { onValue, ref } from "firebase/database";
import { db } from "../../firebase/config";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import localStorageHook from "../../hooks/useLocalStorage";
import { initNotes } from "../../redux-store/notesSlice";

import plus from "../../assets/icons/plus.svg";

import Popup from "reactjs-popup";
import NewNotePopup from "../../components/NewNotePopup";
import NoteItem from "../../components/NoteItem";
import MessageBox from "../../components/MessageBox";

import style from "./NoteListWrapper.module.scss";

export default function TodoListWrapper() {
	const dispatch = useDispatch()
	const userID = localStorageHook("current-user-id")
	const notes = useSelector(store => store.notesSlice.notes);

	useEffect(() => {
		onValue(ref(db, `global/users/${userID}/notes/noteList`), snapshot => {
			dispatch(initNotes(snapshot.val()))
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
			<NewNotePopup />
		</Popup>
		{notes[0] ? 
			<div className={style.list}>
				{notes.map(note => <NoteItem key={note.id} note={note} />)}
			</div> :
			null
		}
		<MessageBox 
			trigger={!notes[0]} 
			message="No notes yet! You can add them by click on plus button in top left corner."
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
