import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";

import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSingleSong } from "../../redux-store/playerSlice";
import { v4 as getID } from "uuid";

import SongPreview from "../../components/SongPreview";

import style from "./UploadSong.module.scss";

export default function UploadFile({ options }) {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { multiple, accept, storagePath, dbPath, sliceValue = null } = options;
  const { uid, firstName, lastName } = useSelector(
    (store) => store.userSlice.value
  );
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState();

  const removeCb = useCallback(
    (target) => {
      setFiles(files.filter((file) => file.name !== target.name));
    },
    [files]
  );

  function uploadHandler() {
    console.log("files : ", files);
    files &&
      files.forEach((file) => {
        const storageRef = ref(
          storage,
          `users/${uid}-${firstName}-${lastName}/${storagePath}/${file.name}`
        );
        const uploadFile = uploadBytesResumable(storageRef, file);

        uploadFile.on(
          "state_changed",
          (snapshot) => {
            const progress = (
              (snapshot.bytesTransferred / snapshot.totalBytes) *
              100
            ).toFixed(0);
            setProgress(progress);
          },
          (error) => {
            alert("Error ", error.message);
          },
          () => {
            getDownloadURL(uploadFile.snapshot.ref).then((url) => {
              const songData = {
                id: `${getID()}-${file.name.substring(
                  0,
                  file.name.lastIndexOf(".")
                )}`,
                name: file.name,
                songURL: url,
                favourite: false,
                selected: false,
              };
				dispatch(addSingleSong([songData]))
            });
          }
        );
      });
  }
  function inputTrigger() {
    inputRef.current.click();
  }
  function inputChangeHandler(event) {
    setFiles(Array.from(event.target.files));
  }

  return (
    <div className={style.songUploaderWrapper}>
      <h3>Upload your favourite songs</h3>
      <header className={style.songUploaderHeader}>
        <input
          type="file"
          ref={inputRef}
          multiple={multiple}
          accept={accept}
          onChange={inputChangeHandler}
        />
        <button className={style.openBtn} onClick={inputTrigger}>
          Browse
        </button>
        {files && (
          <button className={style.uploadBtn} onClick={uploadHandler}>
            Upload
          </button>
        )}
        {!!progress && (
          <progress value={progress}>
            <span>{progress}</span>
          </progress>
        )}
      </header>
      <section className={style.preview}>
        {files &&
          files.map((file, index) => (
            <SongPreview key={index} file={file} removeCb={removeCb} />
          ))}
      </section>
    </div>
  );
}
