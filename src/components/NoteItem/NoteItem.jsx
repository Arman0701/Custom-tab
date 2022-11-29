import Popup from "reactjs-popup";
import NoteExpandedPopup from "../../components/NoteExpandedPopup";

import eye from "../../assets/icons/eye.svg";

import style from "./NoteItem.module.scss";
import { useState } from "react";

export default function NoteItem({ note }) {
	const [open, setOpen] = useState(false)
	const closeModal = () => setOpen(false);


    return <div className={style.noteWrapper} style={{
		backgroundColor: note.background
	}}>
		<div className={style.noteHeader}>
			<h3>{note.title}</h3>
			<button className={style.option} onClick={() => setOpen(o => !o)}>
				<img src={eye} alt="icon" />
			</button>
			<Popup
				closeOnDocumentClick
				closeOnEscape
				onClose={closeModal}
				open={open}
			>
				<NoteExpandedPopup item={note} setOpen={setOpen} />
			</Popup>
		</div>
		<p>{note.description}</p>
		<span>{note.creationDate}</span>
	</div>;
}
