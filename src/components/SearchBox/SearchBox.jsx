import style from "./SearchBox.module.scss";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { search } from "../../redux-store/searchSlice";

export default function SearchBox() {
	const inputRef = useRef()
	const dispatch = useDispatch()

	function submitHandler(e) {
		e.preventDefault()

		dispatch(search(inputRef.current.value))	
	}

    return <div className={style.searchBoxWrapper}>
		<form onSubmit={submitHandler}>
			<select>
				<option value="Links">Links</option>
				<option value="Folders">Folders</option>
				<option value="Friends">Friends</option>
				<option value="Notes">Notes</option>
			</select>
			<input type="text" placeholder="Enter keywords ..." ref={inputRef} />
			<button onClick={submitHandler}>Search</button>
		</form>
	</div>;
}
