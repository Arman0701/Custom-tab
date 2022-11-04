import { getLinks, toggleSearchBox } from "../../redux-store/mainLinksSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase/config";
import Loader from "../../components/Loader";
import MessageBox from "../../components/MessageBox";
import MainLinkComponent from "../../components/MainLinkComponent";
import localStorageHook from "../../hooks/useLocalStorage";
import style from "./MainPage.module.scss";

export default function MainPage() {
    const { value } = useSelector((store) => store.mainLinksSlice);
    const dispatch = useDispatch();
    const userID = localStorageHook('current-user-id')

    useEffect(() => {
		if (userID) {
			onValue(ref(db, `global/users/${userID}/mainLinks`), snapshot => {
				dispatch(getLinks(snapshot.val()))
			})
        }
    }, []);

    return (<>
		<Loader trigger={value[0] == null} styles={{
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		}} />
        <div className={style.mainPageWrapper} >
			<>
				{value.length > 0 &&
					<>
						<div className={style.favouritesWrapper}>
							{value.map(link => link.isFavourite && <MainLinkComponent key={link.id} link={link} /> )}
						</div>
						<div className={style.simpleLinksWrapper}>
							{value.map(link => !link.isFavourite && <MainLinkComponent key={link.id} link={link} /> )}
						</div>
					</> 
				}
				<MessageBox trigger={value[0] == null}
					message="There is no links. You can create one now using plus on the top right corner."
					customStyles={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)"
					}} 
				/>
			</>
        </div>
	</>
    );
}
