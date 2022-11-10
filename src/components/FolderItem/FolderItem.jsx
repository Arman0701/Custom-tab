import style from "./FolderItem.module.scss";
import folder from "../../assets/icons/folder.svg";
import Popup from "reactjs-popup";
import FolderContent from "../FolderContent";

export default function FolderItem({ item }) {
    const { name, links = [], bgColor, description, creationDate } = item;

    return (
        <Popup
            trigger={
                <div
                    className={style.folderItemWrapper}
                    style={{
                        backgroundColor: bgColor,
                    }}
                >
                    <p className={style.folderName}>{name}</p>
                    <div className={style.cardIconWrapper}>
                        <img src={folder} alt="icon" />
                        <p className={style.links}>
                            {Object.values(links)?.length ? Object.values(links)?.length : "Empty"}
                        </p>
                    </div>
                    <p className={style.description}>{description}</p>
                    <p className={style.info}>{creationDate}</p>
                </div>
            }
			position="bottom center"
			arrow={false}
			nested
        >
			<FolderContent item={item} />
		</Popup>
    );
}
