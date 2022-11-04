import style from "./Header.module.scss";
import userIcon from "../../assets/icons/user.svg";
import plusIcon from "../../assets/icons/plus.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import notebookIcon from "../../assets/icons/notebook.svg";
import folderTreeIcon from "../../assets/icons/folderTree.svg";
import searchIcon from "../../assets/icons/search.svg";
import home from "../../assets/icons/home.svg";
import Clock from "../Clock";
import Popup from "reactjs-popup";
import AddNewLinkMain from "../AddNewLinkMain";
import Settings from "../Settings";
import { memo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default memo(function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const goToRoute = useCallback((route) => {
		if (pathname !== route) navigate(route);
    }, []);

	function keyDownHandler(e) {
		console.log('Log e ::: ', e)
		if (e.ctrlKey && e.shiftKey && e.key === " ") {
			navigate("/search")
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", keyDownHandler)
		return () => window.removeEventListener("keydown", keyDownHandler)
	}, [])
	
    return (
        <div className={style.headerWrapper}>
            <Clock />
            <div className={style.headerButtons}>
                {pathname !== "/" && 
					<Link to='/'>
						<div className={style.buttonWrapper} >
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
				<div
                    className={style.buttonWrapper}
                    onClick={() => goToRoute("search")}
                >
                    <img src={searchIcon} alt="icon" />
                </div>
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
                <div
                    className={style.buttonWrapper}
                    onClick={() => goToRoute("folders")}
                >
                    <img src={folderTreeIcon} alt="icon" />
                </div>
                <div
                    className={style.buttonWrapper}
                    onClick={() => goToRoute("notes")}
                >
                    <img src={notebookIcon} alt="icon" />
                </div>
                <div
                    className={style.buttonWrapper}
                    onClick={() => goToRoute("account")}
                >
                    <img src={userIcon} alt="icon" />
                </div>
            </div>
        </div>
    );
});
