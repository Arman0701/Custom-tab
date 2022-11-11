import { useRef } from "react";
import { useDispatch } from "react-redux";
import { editFolder } from "../../redux-store/foldersSlice";
import style from "../FolderLinkEditPopup/FolderLinkEditPopup.module.scss";

export default function FolderEditPopup({ item }) {
	console.log('Log item ::: ', item)
	const dispatch = useDispatch();
	const colorRef = useRef()
	const nameRef = useRef()
	const descriptionRef = useRef()

    function submitHandler(e) {
        e.preventDefault();

        dispatch(editFolder({
			folderID: item.id,
			name: nameRef.current.value,
			description: descriptionRef.current.value,
			bgColor: colorRef.current.value
		}))
    }
	function toggleColor() {
		colorRef.current.click()
	}

    return (
        <form onSubmit={submitHandler} className={style.editPopupWrapper}>
            <input type="text" placeholder="Name" defaultValue={item.name} ref={nameRef} />
            <input type="text" placeholder="Description" defaultValue={item.description} ref={descriptionRef} />
			<div onClick={toggleColor}>
				<button>
					<span>Change background</span>
					<input type="color" defaultValue={item.bgColor} ref={colorRef} />
				</button>
			</div>
            <button onClick={submitHandler}>Edit</button>
        </form>
    );
}