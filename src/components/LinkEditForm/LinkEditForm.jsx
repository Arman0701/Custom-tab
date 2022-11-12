import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { editLink } from "../../redux-store/mainLinksSlice";
import style from "./LinkEditForm.module.scss";

export default function LinkEditForm({ link }) {
    const titleRef = useRef(link.title);
    const addressRef = useRef(link.address);
    const dispatch = useDispatch();

    const formSubmitHandler = useCallback((e) => {
		if (e.key === "Enter") {
			dispatch(editLink({
				id: link.id,
				title: titleRef.current.value,
				address: addressRef.current.value,
			}));
		}
    }, []);

    return (
        <div className={style.linkEditForm} onKeyDown={formSubmitHandler}>
            <input type="text" placeholder="Link title" ref={titleRef} />
            <input type="text" placeholder="Link address" ref={addressRef} />
        </div>
    );
}
