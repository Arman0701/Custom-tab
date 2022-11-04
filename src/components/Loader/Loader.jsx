import style from './Loader.module.scss';
import loaderAnimated from "../../assets/icons/loaderAnimated.svg"

export default function Loader({trigger, styles}) {

	return <>
		{
			trigger ? <div className={style.loaderWrapper} style={styles}>
				<img src={loaderAnimated} alt="loader" />
			</div> : null
		}
	</>
}