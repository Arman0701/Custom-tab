import style from "./FolderItemOptions.module.scss";
import pencil from "../../assets/icons/pencil.svg";
import trash from "../../assets/icons/trash.svg";
import redo from "../../assets/icons/redo.svg";
import Popup from "reactjs-popup";
import FolderEditPopup from "../FolderEditPopup/FolderEditPopup";
import { useDispatch } from "react-redux";
import { removeFolder } from "../../redux-store/foldersSlice";

export default function FolderItemOptions({ item }) {
	const dispatch = useDispatch()

	function remove() {
		dispatch(removeFolder(item.id))
	}
	
    return (
        <div className={style.folderOptionsWrapper}>
			<Popup
				trigger={
					<div className={style.optButton}>
						<div className={style.iconWrapper}>
							<img src={pencil} alt="icon" />
						</div>
						<span>Edit</span>
					</div>
				}
				arrow={false}
				nested
				position="right center"
			>
				<FolderEditPopup item={item} />
			</Popup>
            <div className={style.optButton} onClick={remove}>
                <div className={style.iconWrapper}>
                    <img src={trash} alt="icon" />
                </div>
				<span>Remove</span>
            </div>
			<div className={style.optButton}>
                <div className={style.iconWrapper}>
                    <img src={redo} alt="icon" />
                </div>
				<span>Share</span>
            </div>
        </div>
    );
}
