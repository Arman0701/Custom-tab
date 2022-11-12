import Popup from "reactjs-popup";
import plus from "../../assets/icons/plus.svg";
import NewFolderPopup from "../../components/NewFolderPopup";
import style from "./FoldersPage.module.scss";
import Loader from "../../components/Loader";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { initFolders } from "../../redux-store/foldersSlice";
import localStorageHook from "../../hooks/useLocalStorage";
import MessageBox from "../../components/MessageBox";
import FolderItem from "../../components/FolderItem";

export default function FoldersPage() {
    const dispatch = useDispatch();
    const folders = useSelector((store) => store.foldersSlice.value);
    const userID = localStorageHook("current-user-id");

    useEffect(() => {
        onValue(ref(db, `global/users/${userID}/folders/`), (snapshot) => {
            dispatch(initFolders(snapshot.val()));
        });
    }, []);

    return (
        <>
            <div className={style.foldersPageWrapper}>
                <Popup
                    trigger={
                        <div className={style.folderAddButton}>
                            <img src={plus} alt="icon" />
                        </div>
                    }
                    arrow={false}
                    position="bottom center"
                >
                    <NewFolderPopup />
                </Popup>
				{/* <Loader
					trigger={!(folders[0])}
					customStyles={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						zIndex: 11111
					}}
				/> */}
                <div className={style.foldersWrapper}>
                    {folders.length &&
                        folders.map((folder) => <FolderItem key={folder.id} item={folder} />)
					}
                    <MessageBox
                        trigger={!folders.length}
                        message="No folders yet! You can add that by click on plus in top left corner."
                        customStyles={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                </div>
            </div>
        </>
    );
}
