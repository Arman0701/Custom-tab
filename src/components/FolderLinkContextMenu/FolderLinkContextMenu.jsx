import style from "./FolderLinkContextMenu.module.scss";
import trash from "../../assets/icons/trash.svg";
import star from "../../assets/icons/star.svg";
import starColored from "../../assets/icons/starColored.svg";
import pencil from "../../assets/icons/pencil.svg";
import moveTo from "../../assets/icons/moveTo.svg";
import copy from "../../assets/icons/copy.svg";
import { useDispatch } from "react-redux";
import { removeLinkFromFolder, toggleFavStateInFolder } from "../../redux-store/foldersSlice";
import Popup from "reactjs-popup";
import FolderLinkEditPopup from "../FolderLinkEditPopup";
import MoveToContextMenu from "../MoveToContextMenu";

export default function FolderLinkContextMenu({ item }) {
	const { id: linkID, isFavourite, address, folderID } = item
	const dispatch = useDispatch()

	function remove() {
		dispatch(removeLinkFromFolder({
			folderID,
			linkID,
		}))
	}
	function toggleFavState() {
		dispatch(toggleFavStateInFolder({
			folderID,
			linkID
		}))
	}
	function copyHref() {
		window.navigator.clipboard.writeText(address)
	}

    return <div className={style.contextWrapper}>
		<Popup
			trigger={
				<button className={style.menuButton} >
					<div className={style.iconWrapper}>
						<img src={pencil} alt="icon" />
					</div>
					<span>Edit</span>
				</button>
			}
			arrow={false}
			position="bottom center"
			nested
		>
			<FolderLinkEditPopup item={item} />
		</Popup>
		<button className={style.menuButton} onClick={copyHref} >
			<div className={style.iconWrapper}>
				<img src={copy} alt="icon" />
			</div>
			<span>Copy address</span>
		</button>
		<button className={style.menuButton} onClick={toggleFavState} >
			<div className={style.iconWrapper}>
				<img src={isFavourite ? starColored : star} alt="icon" />
			</div>
			<span>{isFavourite ? "Unlike" : "Like"} link</span>
		</button>
		<button className={style.menuButton} onClick={remove} >
			<div className={style.iconWrapper}>
				<img src={trash} alt="icon" />
			</div>
			<span>Remove</span>
		</button>
		<Popup
			trigger={
				<button className={style.menuButton}>
					<div className={style.iconWrapper}>
						<img src={moveTo} alt="icon" />
					</div>
					<span>Move To</span>
				</button>
			}
			arrow={false}
			nested
			position="right top"
			on={["hover"]}
		>
			<MoveToContextMenu folderID={folderID} linkID={linkID} />
		</Popup>
	</div>
}
