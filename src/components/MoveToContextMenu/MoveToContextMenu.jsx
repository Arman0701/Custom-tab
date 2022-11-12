import { useDispatch, useSelector } from "react-redux";
import { moveToGeneral } from "../../redux-store/foldersSlice";
import MoveToMenuItem from "../MoveToMenuItem";
import style from "./MoveToContextMenu.module.scss";

export default function MoveToContextMenu({position = "", folderID, linkID}) {
	const folders = useSelector(store => store.foldersSlice.value)
	const dispatch = useDispatch()
	console.log('Log folders ::: ', folders)

	function getLink() {
		const foldersCopy = folders;
		return foldersCopy.map(folder => {
			if (folder.id === folderID) {
				return folder.links.filter(link => link.id === linkID)
			}
		})[0]
	}

	function moveToGeneralHandler() {
		dispatch(moveToGeneral({
			folderID,
			linkID,
			actualLink: getLink()
		}))
	}

    return <div className={style.contextMenuWrapper}>
		{position?.toLowerCase() !== "main" && 
			<div className={style.main}>
				<button onClick={moveToGeneralHandler}>Move to Desktop</button>
			</div>
		}
		<div className={style.folders}>
			{folders[0] && 
				folders.filter(folder => {
					if (folder.id !== folderID) {
						const newFolder = {folderID: folder.id, name: folder.name, fromFolderID: folderID}
						console.log('Log newFolder ::: ', newFolder)
						return <MoveToMenuItem key={folder.id} item={folder} />
					}
					return false;
				})
			}
		</div>
	</div>;
}

