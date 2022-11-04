import style from "./NotesFormWrapper.module.scss";
import plus from "../../assets/icons/plus.svg";
import picture from "../../assets/icons/picture.svg";
import Popup from "reactjs-popup";
import UploadFile from "../../components/UploadFile"
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../../redux-store/notesSlice";

export default function NotesWrapper() {
	const colorInputRef = useRef()
	const titleRef = useRef()
	const descriptionRef = useRef()
	const dispatch = useDispatch()
	
	function toggleColorHandler() {
		colorInputRef.current.click()
	}
	function submitHandler() {
		dispatch(addNote({
			title: titleRef.current.value,
			description: descriptionRef.current.value,
			imageURL: null,
			bgColor: colorInputRef.current.value,
		}))
	}

    return <div className={style.notesWrapper}>
		<Popup
			trigger={
				<div className={style.addNoteButton}>
					<img src={plus} alt="icon" />
				</div>
			}
			arrow={false}
			position="bottom left"
			nested
		>
			<div onSubmit={submitHandler} className={style.notesPopupContent}>
				<h3>Add new note</h3>
				<div className={style.container}>
					<div className={style.fields}>
						<input type="text" placeholder="Note title" ref={titleRef} autoFocus />
						<textarea type="text" placeholder="Note description" ref={descriptionRef} />
					</div>
					<div className={style.options}>
						<Popup
							trigger={
								<div className={style.noteImageWrapper}>
									<div className={style.iconContainer}>
										<img src={picture} alt="icon" />
									</div>
									<span>Add image</span>
								</div>
							}
							arrow={false}
							position="bottom center"
							nested
						>
							<UploadFile multiple={true} accept={['.gif, .ico, .jpg, .svg, .webp']} />
						</Popup>
						<button className={style.addBackgroundButton} onClick={toggleColorHandler} >
							<span>Add a background color</span>
							<input type="color" ref={colorInputRef} />
						</button>
					</div>
				</div>
				<button className={style.addNoteButton} onClick={submitHandler} ><span>Add new note</span></button>
			</div>
		</Popup>
	</div>;
}
