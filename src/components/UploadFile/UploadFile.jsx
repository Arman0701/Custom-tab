import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { storage } from "../../firebase/config";
import { v4 as getID } from "uuid";
import FilePreview from "../../components/FilePreview";
import style from "./UploadFile.module.scss";
import addToDb from "../../helpers/addToDb";

export default function UploadFile({multiple, accept=[], }) {
	const inputRef = useRef();
	const { uid, firstName, lastName } = useSelector(store => store.userSlice.value)
	const settings = useSelector(store => store.settingsSlice.value) || []
    const [ progress, setProgress ] = useState(0)
	const [ files, setFiles ] = useState()

	console.log('Log user.settings.backgroundImages ::: ', settings.backgroundImages)
	const removeCb = useCallback((target) => {
		setFiles(files.filter(file => file.name !== target.name))
	}, [files])

	function uploadHandler() {
		const promises = [];
        files && files.forEach((file) => {
            const storageRef = ref(storage, `users/${uid}-${firstName}-${lastName}/background-images/${file.name}`);
            const uploadFile = uploadBytesResumable(storageRef, file);
			promises.push(uploadFile)

            uploadFile.on(
                "state_changed",
                (snapshot) => {
                    const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
                    setProgress(progress);
                },
                (error) => {
					alert("Error ", error.message)
				},
				() => {
                    getDownloadURL(uploadFile.snapshot.ref).then((url) => {
						const imageID = getID();
						const imageData = {
							id: `${imageID}-${file.name.substring(0, file.name.lastIndexOf('.'))}`,
							imageURL: url,
							name: file.name,
							isActive: false
						}
						addToDb(`/settings/backgroundImages`, [...settings.backgroundImages, imageData])
                    })
                }
            );
        });

		Promise.all(promises)
			.then(() => {
				setProgress(0);
				setFiles()
			})
			.catch(error => alert("Error ", error.message));
	}
	function inputTrigger() {
		inputRef.current.click();
	}
	function inputChangeHandler(event) {
		setFiles(Array.from(event.target.files))
	}
	
    return <div className={style.fileUploaderWrapper}>
		<h3>Upload background images</h3>
		<header className={style.fileUploaderHeader}>
			<input 
				type="file" 
				ref={inputRef}
				multiple={multiple}
				accept={accept?.join()}
				onChange={inputChangeHandler}
			/>
			<button className={style.openBtn} onClick={inputTrigger} >Browse</button>
			{files && <button className={style.uploadBtn} onClick={uploadHandler}>Upload</button>}
			{!!progress && <progress value={progress}><span>{progress}</span></progress>}
		</header>
		<section className={style.preview}>
			{files &&
				files.map((file, index) => <FilePreview key={index} file={file} removeCb={removeCb} />)
			}
		</section>
	</div>;
}
