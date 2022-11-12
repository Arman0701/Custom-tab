import { useDispatch } from "react-redux";
import { moveToFolder } from "../../redux-store/foldersSlice";

export default function MoveToMenuItem({item}) {
	console.log('Log item ::: ', item)
	const dispatch = useDispatch()

	function moveToFolderHandler() {
		dispatch(moveToFolder({

		}))
	}

	return <button onClick={moveToFolderHandler}>{item.name}</button>
}