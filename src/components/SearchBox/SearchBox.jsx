import style from "./SearchBox.module.scss";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchByFilter, setFilter } from "../../redux-store/searchSlice";

export default function SearchBox() {
	const inputRef = useRef()
	const selectRef = useRef()
	const dispatch = useDispatch()
	const { filter } = useSelector(store => store.searchSlice)

	function submitHandler(e) {
		e.preventDefault()
		dispatch(searchByFilter(inputRef.current.value))
	}

	function selectFilter() {
		dispatch(setFilter(selectRef.current.value))
		if (inputRef.current.value) {
			dispatch(searchByFilter(inputRef.current.value))
		}
	}

    return <div className={style.searchBoxWrapper}>
		<form onSubmit={submitHandler}>
			<select ref={selectRef} onChange={selectFilter} defaultValue={filter}>
				<option value="mainLinks">Links</option>
				<option value="folders">Folders</option>
				<option value="friends">Friends</option>
				<option value="notes">Notes</option>
			</select>
			<input autoFocus type="text" placeholder="Enter keywords ..." ref={inputRef} />
			<button onClick={submitHandler}>Search</button>
		</form>
	</div>;
}
