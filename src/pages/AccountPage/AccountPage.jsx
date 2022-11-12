import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initUser } from "../../redux-store/userSlice";
import { db } from "../../firebase/config";
import style from "./AccountPage.module.scss";
import pageFavIcon from "../../assets/icons/pageFavIcon.ico";
import userIcon from "../../assets/icons/user.svg";
import plus from "../../assets/icons/plus.svg";
import Loader from "../../components/Loader";
import Popup from "reactjs-popup";
import UploadFile from "../../components/UploadFile";
import UploadCustomThemeColor from "../../components/UploadCustomThemeColor";
import UploadCustomFont from "../../components/UploadCustomFont/";
import localStorageHook from "../../hooks/useLocalStorage";

export default function AccountPage() {
	const user = useSelector(store => store.userSlice.value)
	const userID = localStorage.getItem('current-user-id')
	const dispatch = useDispatch()
	const navigate = useNavigate()

	// this code nedde to refactoring .................... //////////////
	// use ExtraReducers for each slice
	function logoutHandler() {
		localStorageHook("current-user-id", null, "remove")
		navigate('/login')

		setTimeout(() => {
			window.location.reload()
		}, 100);
	}

	function profileImageErrorHandler() {
		
	}
	
	useEffect(() => {
		onValue(ref(db, `global/users/${userID}`), snapshot => {
			dispatch(initUser(snapshot.val()))
		})
	}, [])
	
    return user && <div className={style.accountPageWrapper}>
		<Loader trigger={!user.firstName} styles={{
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		}} />
		<header className={style.accountPageHeader}>
			<div className={style.headerTitle}>
				<img src={pageFavIcon} alt="favicon" />
				{user.firstName && <h3>{user.firstName} {user.lastName}'s Profile</h3>}
			</div>
			<nav className={style.accountNavbar}>
				<Popup
					trigger={<button>Account Settings</button>}
					arrow={false}
					position="bottom right"
					nested
				>
					<div className={style.accountSttingButtonsWrapper}>
						<Popup
							trigger={<p className={style.accountSettingButton}>Upload background images</p>}
							arrow={false}
							position="bottom center"
						>
							<UploadFile options={{
								accept: ['.gif, .ico, .jpg, .jpeg, .svg, .webp'],
								multiple: false,
								storagePath: "background-images/",
								dbPath: "settings/backgroundImages/",
								sliceValue: user.settings.backgroundImages
							}} />
						</Popup>
						<Popup
							trigger={<p className={style.accountSettingButton}>Add custom theme colors</p>}
							arrow={false}
							position="bottom center"
						>
							<UploadCustomThemeColor />
						</Popup>
						<Popup
							trigger={<p className={style.accountSettingButton}>Add custom fonts</p>}
							arrow={false}
							position="bottom center"
						>
							<UploadCustomFont />
						</Popup>
					</div>
				</Popup>
				<button onClick={logoutHandler}>Log out</button>
			</nav>
		</header>
		<main>
			<div className={style.userBlock}>
				<Popup
					trigger={
						<div className={style.userImage}>
							<img src={user.profileImage?.imageURL || userIcon} alt="user" onError={profileImageErrorHandler} />
							<div className={style.imageEffect}>
								<div className={style.iconWrapper}>
									<img src={plus} alt="icon" />
								</div>
								<span>Add profile image</span>
							</div>
						</div>
					}
					arrow={false}
					position="bottom center"
				>
					<UploadFile options={{
						accept: ['.gif, .ico, .jpg, .jpeg, .svg, .webp'],
						multiple: false,
						sotragePath: "profile-images/",
						dbPath: "profileImage/",
					}} />
				</Popup>
				<div className={style.userAbout}>
					<p>{user.firstName}</p>
					<p>{user.lastName}</p>
					<p>{user.email}</p>
				</div>
			</div>
			<div className={style.content}>
				<p>links count: { user.mainLinks.length }</p><br/><br/>
				Add functionality for hiding / showing links, notes, folders, etc...<br/>
				Toggling password modal show / hide state using redux and middleware for that <br />
				Handle Home icon showing state in Login and account pages <br />
			</div>
		</main>
	</div>
}
