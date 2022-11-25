import { useCallback } from "react";
import convertByteSize from "../../helpers/convertByteSize";
import times from "../../assets/icons/cross.svg";
import style from "./SongPreview.module.scss";
import previewImage from "../../assets/images/songPreviewDefault.png";

export default function FilePreview({ file, removeCb }) {

    const removeHandler = useCallback(() => {
        removeCb(file);
    }, [])

    return (
        <div className={style.songPreviewWrapper}>
            <img src={previewImage} alt="preview" />
            <div className={style.songInfoWrapper}>
                <span>{file.name}</span>
                <span>{convertByteSize(file.size)}</span>
            </div>
            <div className={style.removeBtnWrapper} onClick={removeHandler}>
                <img src={times} alt="icon" />
            </div>
        </div>
    );
}
