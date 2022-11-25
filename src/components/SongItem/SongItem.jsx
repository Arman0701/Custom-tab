import style from "./SongItem.module.scss";
import play from "../../assets/icons/play.svg";
import pause from "../../assets/icons/pause.svg";
import trash from "../../assets/icons/trash.svg";
import star from "../../assets/icons/star.svg";
import starColored from "../../assets/icons/starColored.svg";
import download from "../../assets/icons/download.svg";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSong, selectSingleSong, setSong, toggleFavourite } from "../../redux-store/playerSlice";

export default function SongItem({ item }) {
	const songCheckRef = useRef()
	const selection = useSelector(store => store.playerSlice.checkSongs.status)
	const dispatch = useDispatch()

	function inputClickHandler(e) {
		e.stopPropagation()
	}
	
	function selectSingleSongHandler() {
		dispatch(selectSingleSong(item.number))
	}

	function playCurrentSong() {
		dispatch(setSong(item.number))
	}

	function toggleFavouriteHandler(e) {
		e.stopPropagation()
		dispatch(toggleFavourite(item.id))
	}

	function downloadSongHandler(e) {
		e.stopPropagation()
		window.open(item.songURL)
	}

	function removeSongHandler(e) {
		e.stopPropagation()
		dispatch(deleteSong(item.id))
	}

    return <div className={style.songItemWrapper} onClick={playCurrentSong}>
		{selection && <input type="checkbox" ref={songCheckRef} onClick={inputClickHandler} onChange={selectSingleSongHandler} />}
		<button className={style.songButton}>
			<img src={play} alt="icon" />
		</button>
		<span className={style.title}>{item.name}</span>
		<div className={style.buttons}>
			<button className={style.songButton} onClick={toggleFavouriteHandler}>
				<img src={item.favourite ? starColored : star} alt="icon" />
			</button>
			<button className={style.songButton} onClick={downloadSongHandler}>
				<img src={download} alt="icon" />
			</button>
			<button className={style.songButton} onClick={removeSongHandler}>
				<img src={trash} alt="icon" />
			</button>
		</div>
		{/* <span className={style.duration}>00:00</span> */}
	</div>
}
