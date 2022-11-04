import { onValue, ref } from "firebase/database";
import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { initNotes } from "../../redux-store/notesSlice";
import localStorageHook from "../../hooks/useLocalStorage";
import NotesFormWrapper from "../NotesFormWrapper";
import NotesListItem from "../NotesListItem";
import MessageBox from "../MessageBox/";
import style from "./NotesList.module.scss";
import { useEffect } from "react";

export default function NotesList() {
    const notes = useSelector((store) => store.notesSlice.value.noteList);
    const dispatch = useDispatch();
    const userID = localStorageHook("current-user-id");

	useEffect(() => {
		onValue(ref(db, `global/users/${userID}/notes/noteList/`), (snapshot) => {
			dispatch(initNotes(snapshot.val()));
		});
	}, [])

    return (
        <div className={style.notesListWrapper}>
            <NotesFormWrapper />
			<div className={style.list}>
				{notes[0] &&
					notes.map(note => <NotesListItem key={note.id} item={note} />)
				}
			</div>
            <MessageBox
                trigger={!notes.length}
                message="No notes yet! You can add that by click on plus in top left corner."
                customStyles={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />
        </div>
    );
}
