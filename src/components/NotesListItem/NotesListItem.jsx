import { useDispatch } from "react-redux";
import { editNote, removeNote } from "../../redux-store/notesSlice";
import pencil from "../../assets/icons/pencil.svg";
import trash from "../../assets/icons/trash.svg";
import style from "./NotesListItem.module.scss";

export default function NotesListItem({ item }) {
	const { imageURL, title, description, creationDate, bgColor, id } = item;
	const dispatch = useDispatch()

	function remove() {
		dispatch(removeNote(id))
	}
	function edit() {
		dispatch(editNote({}))
	}

    return <div className={style.noteListItemWrapper} style={{
		backgroundColor: bgColor
	}}>
		<div className={style.cardImageWrapper} >
			{imageURL && <img src={imageURL} alt="card image" />}
		</div>
		<p className={style.cardTitle}>{title}</p>
		<p className={style.cartDescription}>{description}</p>
		<div className={style.cardOptions}>
			<div className={style.optionButton} onClick={edit} >
				<div className={style.iconContainer}>
					<img src={pencil} alt="icon" />
				</div>
			</div>
			<div className={style.optionButton} onClick={remove} >
				<div className={style.iconContainer}>
					<img src={trash} alt="icon" />
				</div>
			</div>
		</div>
		<p className={style.cardInfo}>{creationDate}</p>
	</div>;
}
