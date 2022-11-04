import { useCallback, useState } from "react";
import convertByteSize from "../../helpers/convertByteSize";
import times from "../../assets/icons/cross.svg";
import style from "./FilePreview.module.scss";

export default function FilePreview({ file, removeCb }) {
    const reader = new FileReader();
    const [source, setSource] = useState();

    const removeHandler = useCallback(() => {
        removeCb(file);
    }, [])

    reader.onload = (e) => {
        setSource(e.target.result);
    };
    reader.readAsDataURL(file);

    return (
        <div className={style.filePreviewWrapper}>
            <img src={source} alt="preview" />
            <div className={style.fileInfoWrapper}>
                <span>{file.name}</span>
                <span>{convertByteSize(file.size)}</span>
            </div>
            <div className={style.removeBtnWrapper} onClick={removeHandler}>
                <img src={times} alt="icon" />
            </div>
        </div>
    );
}
