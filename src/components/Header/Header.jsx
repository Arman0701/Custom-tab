import style from "./Header.module.scss";
import userIcon from "../../assets/icons/user.svg";
import plusIcon from "../../assets/icons/plus.svg";
import noteIcon from "../../assets/icons/music.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import notebookIcon from "../../assets/icons/notebook.svg";
import folderTreeIcon from "../../assets/icons/folderTree.svg";
import searchIcon from "../../assets/icons/search.svg";
import home from "../../assets/icons/home.svg";
import Clock from "../Clock";
import Popup from "reactjs-popup";
import AddNewLinkMain from "../AddNewLinkMain";
import Settings from "../Settings";
import { memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default memo(function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    function keyDownHandler(e) {
        if (e.ctrlKey && e.shiftKey && e.key === " ") {
            navigate("/search");
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler);
        return () => window.removeEventListener("keydown", keyDownHandler);
    }, []);

    return (
        <div className={style.headerWrapper}>
            <Clock />
            <div className={style.headerButtons}>
				{pathname !== '/' &&
					<Link to="/">
						<div className={style.buttonWrapper}>
							<img src={home} alt="icon" />
						</div>
					</Link>
				}
                <Popup
                    trigger={
                        <div className={style.buttonWrapper}>
                            <img src={plusIcon} alt="icon" />
                        </div>
                    }
                    arrow={false}
                    position="left center"
                >
                    <AddNewLinkMain />
                </Popup>
                <Link to="/search">
                    <div className={style.buttonWrapper}>
                        <img src={searchIcon} alt="icon" />
                    </div>
                </Link>
                <Link to="/player">
                    <div className={style.buttonWrapper}>
                        <img src={noteIcon} alt="icon" />
                    </div>
                </Link>
                <Popup
                    trigger={
                        <div className={style.buttonWrapper}>
                            <img src={settingsIcon} alt="icon" />
                        </div>
                    }
                    arrow={false}
                    contentStyle={{
                        position: "absolute",
                        bottom: "0px",
                        right: "0px",
                    }}
                >
                    <Settings />
                </Popup>
                <Link to="/folders">
                    <div className={style.buttonWrapper}>
                        <img src={folderTreeIcon} alt="icon" />
                    </div>
                </Link>
                <Link to="/notes/todo-list">
                    <div className={style.buttonWrapper}>
                        <img src={notebookIcon} alt="icon" />
                    </div>
                </Link>
                <Link to="/account">
                    <div className={style.buttonWrapper}>
                        <img src={userIcon} alt="icon" />
                    </div>
                </Link>
            </div>
        </div>
    );
});
