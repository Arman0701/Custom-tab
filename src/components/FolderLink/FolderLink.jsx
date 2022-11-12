import Popup from "reactjs-popup";
import FolderLinkContextMenu from "../FolderLinkContextMenu"
import style from "./FolderLink.module.scss";

export default function FolderLink({ item }) {
	function openLink() {
		window.open(item.address, '_self')
	}
	
    return <div className={style.folderLinkWrapper}>
		<Popup
			trigger={<p className={style.title} onClick={openLink} >{item.title}</p>}
			arrow={false}
			nested
			on={['right-click']}
			position="right top"
		>
			<FolderLinkContextMenu item={item} />
		</Popup>
	</div>;
}
