import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import { addLink } from '../../redux-store/mainLinksSlice';
import style from './AddNewLinkMain.module.scss';

export default function AddNewLinkMain() {
	const titleInputRef = useRef()
	const addressInputRef = useRef()
	const dispatch = useDispatch()
	const transition = useTransition(true, {
		from: { opacity: 0, x: 50 },
		enter: { opacity: 1, x: 0 },
	})

	function formButtonClickHandler() {
		dispatch(addLink({
			title: titleInputRef.current.value,
			address: addressInputRef.current.value
		}))
	}

	return (transition((styles, item) => {
		return (item ? 
			<animated.div className={style.formWrapper} style={styles}>
				<input type="text" placeholder='Title' ref={titleInputRef}  />
				<input type="text" placeholder='Address' ref={addressInputRef}  />
				<button onClick={formButtonClickHandler}>Create</button>
			</animated.div> : null
		)})
	)
}