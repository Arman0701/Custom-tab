import style from "./SearchBox.module.scss";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { search, searchByFilter, setFilter } from "../../redux-store/searchSlice";
import { useState } from "react";

export default function SearchBox() {
	const inputRef = useRef()
	const dispatch = useDispatch()
	const [selectedValue, setSelectedValue] = useState('')

	function submitHandler(e) {
		e.preventDefault()

		if (selectedValue) {
			dispatch(setFilter(selectedValue))
			dispatch(searchByFilter(inputRef.current.value))
		} else {
			dispatch(search(inputRef.current.value))
		}
	}

    return <div className={style.searchBoxWrapper}>
		<form onSubmit={submitHandler}>
			<select>
				<option >Global</option>
				<option onClick={() => {setSelectedValue("Links")}} >Links</option>
				<option onClick={() => {setSelectedValue("Folders")}} >Folders</option>
				<option onClick={() => {setSelectedValue("Friends")}} >Friends</option>
				<option onClick={() => {setSelectedValue("Notes")}} >Notes</option>
			</select>
			<input type="text" placeholder="Enter keywords ..." ref={inputRef} />
			<button onClick={submitHandler}>Search</button>
		</form>
	</div>;
}
