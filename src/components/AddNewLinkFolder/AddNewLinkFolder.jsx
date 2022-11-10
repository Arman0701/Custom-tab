import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addLinkInFolder } from "../../redux-store/foldersSlice";
import style from "./AddNewLinkFolder.module.scss";

export default function AddNewLinkFolder({ folderID }) {
	const titleRef = useRef()
	const addressRef = useRef()
	const dispatch = useDispatch()
	
	function submitHandler(e) {
		e.preventDefault()

		dispatch(addLinkInFolder({
			folderID,
			title: titleRef.current.value,
			address: addressRef.current.value
		}))
	}
	
    return <div className={style.newFolderLinkWrapper}>
		<h3>Add new link to folder</h3>
		<form onSubmit={submitHandler}>
			<input type="text" placeholder="Title" ref={titleRef} />
			<input type="text" placeholder="Address" ref={addressRef} />
			<button onClick={submitHandler}>Create</button>
		</form>
	</div>
}
