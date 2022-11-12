import { useRef } from "react";
import { editLinkInFolder } from "../../redux-store/foldersSlice";
import { useDispatch } from "react-redux";
import style from "./FolderLinkEditPopup.module.scss";

export default function FolderLinkEditPopup({ item }) {
    const { folderID, linkID } = item;
    const dispatch = useDispatch();
    const titleRef = useRef();
    const addressRef = useRef();

    function submitHandler(e) {
        e.preventDefault();

        dispatch(
            editLinkInFolder({
                folderID,
                linkID,
                title: titleRef.current.value,
                address: addressRef.current.value,
            })
        );
    }

    return (
        <form onSubmit={submitHandler} className={style.editPopupWrapper}>
            <input type="text" placeholder="Title" autoFocus defaultValue={item.title} ref={titleRef} />
            <input type="text" placeholder="Address" defaultValue={item.address} ref={addressRef} />
            <button onClick={submitHandler}>Edit</button>
        </form>
    );
}
