import { onValue, ref } from "firebase/database";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";
import localStorageHook from "../../hooks/useLocalStorage";
import {
	deleteCurrentSong,
    initSongs,
    nextSong,
    prevSong,
    selectSongs,
    setCurrentSongDuration,
    setCurrentTime,
    setVolume,
    toggleFavourite,
    toggleMute,
    togglePlaying,
    toggleRepeat,
	toggleShuffle,
} from "../../redux-store/playerSlice";

import play from "../../assets/icons/play.svg";
import pause from "../../assets/icons/pause.svg";
import volumeMute from "../../assets/icons/volumeMute.svg";
import repeat from "../../assets/icons/repeat.svg";
import repeatOnce from "../../assets/icons/repeatOnce.svg";
import rewind from "../../assets/icons/rewind.svg";
import volumeIcon from "../../assets/icons/volume.svg";
import volumeLow from "../../assets/icons/volumeLow.svg";
import forward from "../../assets/icons/forward.svg";
import shuffleIcon from "../../assets/icons/shuffle.svg";
import isShuffleIcon from "../../assets/icons/isShuffle.svg";
import plus from "../../assets/icons/plus.svg";
import trash from "../../assets/icons/trash.svg";
import star from "../../assets/icons/star.svg";
import starColored from "../../assets/icons/starColored.svg";
import download from "../../assets/icons/download.svg";
import list from "../../assets/icons/list.svg";
import burger from "../../assets/icons/burger.svg";
import square from "../../assets/icons/square.svg";
import cross from "../../assets/icons/cross.svg";

import playerScreenDefault from "../../assets/images/playerScreenDefault.png";

import style from "./PlayerPage.module.scss";
import SongItem from "../../components/SongItem/SongItem";
import Popup from "reactjs-popup";
import MessageBox from "../../components/MessageBox";
import UploadSong from "../../components/UploadSong";

export default function PlayerPage() {
    const userID = localStorageHook("current-user-id");
    const dispatch = useDispatch();
    const volumeRef = useRef();
    const audioRef = useRef();

    const { songs, current, repeatCurrent, shuffle, isPlaying, volume, muted, checkSongs } =
        useSelector((store) => store.playerSlice);
	const songsValue = useSelector(store => store.playerSlice.songs)

    useEffect(() => {
        onValue(ref(db, `global/users/${userID}/player/songs`), (snapshot) => {
            dispatch(initSongs(snapshot.val()));
        });
    }, []);

	useEffect(() => {
		let interval;
		interval = setInterval(isPlaying ? () => {
			dispatch(setCurrentTime(audioRef.current.currentTime))
		} : () => {}, 1000)
		if (!isPlaying) clearInterval(interval)
	}, [isPlaying, audioRef.current?.currentTime])

    function volumeScrollHandler(e) {
        const unit = 0.003;
		const vol = Number(volume + unit * e.deltaY * 0.5)
		if (vol > 0 && vol < 1) {
			if (e.deltaY > 0) {
				dispatch(setVolume(volume + unit * e.deltaY * 0.5));
			} else if (e.deltaY < 0) {
				dispatch(setVolume(volume + unit * e.deltaY * 0.5));
			}
			audioRef.current.volume = vol
		}
    }

    function setDurationHandler(e) {
		dispatch(setCurrentSongDuration(e.target.duration));
		if (isPlaying) audioRef.current.play()
    }

    function setVolumeHandler(e) {
        dispatch(setVolume(Number(e.target.value)));
        audioRef.current.volume = Number(e.target.value);
    }
	
	function songSeekHandler(e) {
		const time = (audioRef.current.duration * e.target.value) / 100;
		dispatch(setCurrentTime(time));
		audioRef.current.currentTime = time;
	}

	function setPlayingStateHandler() {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		dispatch(togglePlaying());
	}

    function setLoopHandler() {
        dispatch(toggleRepeat());
    }

	function setNextSongHandler() {
		dispatch(nextSong())
	}
	
	function setPrevSongHandler() {
		dispatch(prevSong())
	}

	function toggleShuffleHandler() {
		dispatch(toggleShuffle())
	}

	function songMuteHandler() {
		dispatch(toggleMute())
	}

	function selectSongsHandler() {
		dispatch(selectSongs())
	}

	function deleteSelectedSongsHandler() {
		// dispatch()
	}

	function downloadSongHandler() {
		window.open(current.songURL)
	}

	function toggleSongFavourite() {
		dispatch(toggleFavourite(current.id))
	}

	function removeCurrentSongHandler() {
		dispatch(deleteCurrentSong(current.id))
	}

    return (
        <div className={style.playerWrapper}>
            <div className={style.list}>
				<div className={style.listHeader}>
					<div className={style.menuButton}>
						<img src={burger} alt="icon" />
					</div>
					<div className={style.buttons}>
						{checkSongs.status && 
							<button onClick={deleteSelectedSongsHandler}>
								<div className={style.iconContainer}>
									<img src={trash} alt="icon" />
								</div>
							</button>
						}
						<button onClick={selectSongsHandler}>
							<div className={style.iconContainer}>
								<img src={checkSongs.status ? cross : square} alt="icon" />
							</div>
							<span>{checkSongs.status ? "Hide" : "Select"}</span>
						</button>
					</div>
				</div>
                {songs[0] ?
                    songs.map((item) => <SongItem key={item.id} item={item} />) :
					<MessageBox
						trigger={true}
						message="No songs yet. Please add them by click on 'Upload song'."
						customStyles={{
							position: "absolute",
							top: "15%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							border: "1px solid white",
							zIndex: "9999",
						}}
            />
				}
            </div>
            <div className={style.player}>
                <audio
                    src={current.songURL}
                    loop={repeatCurrent}
                    volume={volume}
					muted={muted}
                    onLoadedMetadata={setDurationHandler}
					onEnded={setNextSongHandler}
                    ref={audioRef}
                ></audio>
                <div className={style.screen}>
                    <img
						className={isPlaying ? style.rotate : style.noop}
                        // src={current.imageURL || playerScreenDefault}
						src={playerScreenDefault}
                        alt="song default"
                    />
                </div>
                <div className={style.controls}>
                    <p>{current.name}</p>
                    <div className={style.durationWrapper}>
                        <span>{current.currentTime || "00:00"}</span>
                        <input
                            type="range"
                            onChange={songSeekHandler}
                            value={
                                (audioRef?.current?.currentTime /
                                    audioRef?.current?.duration) *
                                    100 || 0
                            }
                        />
                        <span>{current.duration || "00:00"}</span>
                    </div>
                    <div className={style.buttons}>
                        <button onClick={toggleShuffleHandler}>
                            <img src={shuffle ? isShuffleIcon : shuffleIcon} alt="icon" />
                        </button>
                        <button onClick={setPrevSongHandler}>
                            <img src={rewind} alt="icon" />
                        </button>
                        <button onClick={setPlayingStateHandler}>
                            <img src={isPlaying ? pause : play} alt="icon" />
                        </button>
                        <button onClick={setNextSongHandler}>
                            <img src={forward} alt="icon" />
                        </button>
                        <button onClick={setLoopHandler}>
                            <img
                                src={repeatCurrent ? repeatOnce : repeat}
                                alt="icon"
                            />
                        </button>
                        <Popup
                            trigger={
                                <button onClick={songMuteHandler}>
                                    <img src={
										muted ? volumeMute : 
										volume < 0.35 ? volumeLow :
														volumeIcon
										} alt="icon" />
                                </button>
                            }
                            arrow={false}
                            position="right bottom"
                            on={["hover"]}
                        >
                            <div
                                className={style.volumeSlicer}
                                onWheel={volumeScrollHandler}
                            >
                                <p>{(volume * 100).toFixed(0)}%</p>
                                <input
                                    type="range"
                                    value={volume}
                                    onChange={setVolumeHandler}
                                    ref={volumeRef}
                                    min="0"
                                    max="1"
                                    step={0.01}
                                />
                            </div>
                        </Popup>
                    </div>
                </div>
                <div className={style.options}>
                    <div className={style.wrapper}>
                        <button onClick={toggleSongFavourite}>
                            <div className={style.iconWrapper}>
                                <img src={current.favourite ? starColored : star} alt="icon" />
                            </div>
                            <span>Favourite</span>
                        </button>
						<button onClick={downloadSongHandler}>
							<div className={style.iconWrapper}>
								<img src={download} alt="icon" />
							</div>
							<span>Download</span>
						</button>
                    </div>
                    <div className={style.wrapper}>
                        <button onClick={removeCurrentSongHandler}>
                            <div className={style.iconWrapper}>
                                <img src={trash} alt="icon" />
                            </div>
                            <span>Remove</span>
                        </button>
                        <Popup
                            trigger={
                                <button>
                                    <div className={style.iconWrapper}>
                                        <img src={plus} alt="icon" />
                                    </div>
                                    <span>Upload song</span>
                                </button>
                            }
                            arrow={false}
                            position="bottom center"
                        >
                            <UploadSong options={{
								accept: "audio/*",
								multiple: true,
								storagePath: "songs/",
								dbPath: "player/songs/",
								sliceValue: songsValue
							}} />
                        </Popup>
                    </div>
                    <button>
                        <div className={style.iconWrapper}>
                            <img src={list} alt="icon" />
                        </div>
                        <span>Add to list</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
