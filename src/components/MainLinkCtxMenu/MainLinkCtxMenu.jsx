import style from "./MainLinkCtxMenu.module.scss";
import starColored from "../../assets/icons/starColored.svg";
import star from "../../assets/icons/star.svg";
import copy from "../../assets/icons/copy.svg";
import pencil from "../../assets/icons/pencil.svg";
import moveTo from "../../assets/icons/moveTo.svg";
import trash from "../../assets/icons/trash.svg";
import hide from "../../assets/icons/hide.svg";
import Popup from "reactjs-popup";
import LinkEditForm from "../LinkEditForm";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { hideLink, removeLink, toggleFavState } from "../../redux-store/mainLinksSlice";

export default function MainLinkCtxMenu({ link }) {
	const dispatch = useDispatch()
	const copyToClipboard = useCallback(() => {
		navigator.clipboard.writeText(link.address)
	}, [])
	const removeLinkHandler = useCallback(() => {
		dispatch(removeLink(link.id))
	}, [])
	const toggleLinkFavour = useCallback(() => {
		dispatch(toggleFavState(link.id))
	}, [])

	
	// const hideLinkHandler = useCallback(() => {
	// 	dispatch(hideLink(link.id))
	// }, [])
	
    return (
        <div className={style.contextMenuWrapper}>
			<Popup
				trigger={
					<div className={style.menuItem}>
						<div className={style.menuItemIcon}>
							<img src={pencil} alt="icon" />
						</div>
						<span>Edit</span>
					</div>
				}
				position="top center"
				keepTooltipInside
				arrow={false}
			>
				<LinkEditForm link={link} />
			</Popup>
			<div className={style.menuItem} onClick={copyToClipboard}>
                <div className={style.menuItemIcon}>
                    <img src={copy} alt="icon" />
                </div>
                <span>Copy Address</span>
            </div>
			<div className={style.menuItem} onClick={toggleLinkFavour}>
                <div className={style.menuItemIcon}>
                    <img src={link.isFavourite ? starColored : star} alt="icon" />
                </div>
                <span>{link.isFavourite ? "Unlike" : "Like"}</span>
            </div>
			<div className={style.menuItem} onClick={removeLinkHandler}>
                <div className={style.menuItemIcon}>
                    <img src={trash} alt="icon" />
                </div>
                <span>Remove</span>
            </div>
			<div className={style.menuItem}>
                <div className={style.menuItemIcon}>
                    <img src={moveTo} alt="icon" />
                </div>
                <span>Move To</span>
            </div>
			{/* <div className={style.menuItem} onClick={hideLinkHandler}>
                <div className={style.menuItemIcon}>
                    <img src={hide} alt="icon" />
                </div>
                <span>Hide</span>
            </div> */}
        </div>
    );
}
