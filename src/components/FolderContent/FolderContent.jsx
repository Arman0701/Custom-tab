import MessageBox from "../MessageBox";
import FolderLink from "../FolderLink";
import style from "./FolderContent.module.scss";
import plus from "../../assets/icons/plus.svg";
import Popup from "reactjs-popup";
import AddNewLinkFolder from "../AddNewLinkFolder/AddNewLinkFolder";

export default function FolderContent({ item }) {
	const { name, description, creationDate, bgColor, links, id } = item

    return <div className={style.folderContentWrapper} style={{
		backgroundColor: bgColor
	}}>
		<div className={style.folderInfo}>
			<Popup
				trigger={
					<div className={style.iconWrapper}>
						<img src={plus} alt="icon" />
					</div>
				}
				arrow={false}
				position="right top"
				nested
			>
				<AddNewLinkFolder folderID={id} />
			</Popup>
			<p className={style.name}>{name}</p>
		</div>
		<div className={style.folderLinks}>
			{links?.length &&
				links.map(item => {
					item = { ...item, folderID: id }
					return <FolderLink key={item.id} item={item} />
				})
			}
		</div>
		<div className={style.info}>
			<p>{description}</p>
			<span>{creationDate}</span>
		</div>
		<MessageBox
			trigger={!(links?.length)}
			message="No links in folder"
			customStyles={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)"
			}}
		/>
	</div>
}
