import style from "./FolderItem.module.scss";
import folder from "../../assets/icons/folder.svg";
import Popup from "reactjs-popup";
import FolderContent from "../FolderContent";
import menuDotsVertical from "../../assets/icons/menuDotsVertical.svg";
import FolderItemOptions from "../FolderItemOptions/FolderItemOptions";

export default function FolderItem({ item }) {
    const { name, links = [], bgColor, description, creationDate } = item;
    return (
        <div
            className={style.folderItemWrapper}
            style={{
                backgroundColor: bgColor,
            }}
        >
            <Popup
                trigger={
                    <div className={style.folderTrigger}>
                        <p className={style.folderName}>{name}</p>
                        <div className={style.cardIconWrapper}>
                            <img src={folder} alt="icon" />
                            <p className={style.links}>
                                {links?.length ? links?.length : "Empty"}
                            </p>
                        </div>
                        <p className={style.description}>{description}</p>
                    </div>
                }
                position="bottom center"
                arrow={false}
                nested
            >
                <FolderContent item={item} />
            </Popup>
            <footer>
                <p className={style.info}>{creationDate}</p>
				<Popup
					trigger={
						<div className={style.iconWrapper}>
							<img src={menuDotsVertical} alt="icon" />
						</div>
					}
					arrow={false}
					position="right top"
					nested
				>
					<FolderItemOptions item={item} />
				</Popup>
            </footer>
        </div>
    );
}
