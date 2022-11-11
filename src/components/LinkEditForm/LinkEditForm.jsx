import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { editLink } from "../../redux-store/mainLinksSlice";
import style from "./LinkEditForm.module.scss";

export default function LinkEditForm({ link }) {
    const titleRef = useRef(link.title);
    const addressRef = useRef(link.address);
    const dispatch = useDispatch();

    function formSubmitHandler(e) {
		e.preventDefault(e)

		dispatch(editLink({
			id: link.id,
			title: titleRef.current.value,
			address: addressRef.current.value,
		}))
	}

    return (
        <form className={style.linkEditForm} onSubmit={formSubmitHandler}>
            <input type="text" placeholder="Link title" defaultValue={link.title} ref={titleRef} />
            <input type="text" placeholder="Link address" defaultValue={link.address} ref={addressRef} />
			<button onClick={formSubmitHandler}>Create</button>
        </form>
    );
}
