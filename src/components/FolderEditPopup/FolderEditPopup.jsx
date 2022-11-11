import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editFolder } from "../../redux-store/foldersSlice";
import style from "../FolderLinkEditPopup/FolderLinkEditPopup.module.scss";

export default function FolderEditPopup({ item }) {
	console.log('Log item ::: ', item)
	const dispatch = useDispatch();
	const [name, setName] = useState(item.name)
	const [description, setDescription] = useState(item.description)
	const [bgColor, setBgColor] = useState(item.bgColor)
	const colorRef = useRef()

	function nameChangeHandler(e) {
		setName(e.target.value)
	}
	function descriptionChangeHandler(e) {
		setDescription(e.target.value)
	}
	function colorChangeHandler(e) {
		setBgColor(e.target.value)
	}
    function submitHandler(e) {
        e.preventDefault();

        dispatch(editFolder({
			folderID: item.id,
			name,
			description,
			bgColor,
		}))
    }
	function toggleColor() {
		colorRef.current.click()
	}

    return (
        <form onSubmit={submitHandler} className={style.editPopupWrapper}>
            <input type="text" placeholder="Name" value={name} onChange={nameChangeHandler} />
            <input type="text" placeholder="Description" value={description} onChange={descriptionChangeHandler} />
			<div onClick={toggleColor}>
				<button>
					<span>Change background</span>
					<input type="color" value={bgColor} onChange={colorChangeHandler} ref={colorRef} />
				</button>
			</div>
            <button onClick={submitHandler}>Edit</button>
        </form>
    );
}