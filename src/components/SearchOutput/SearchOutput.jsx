import { useSelector } from "react-redux";
import style from "./SearchOutput.module.scss";

export default function SearchOutput() {
	const searchedData = useSelector(store => store.searchSlice.output)

    return <div className={style.searchOutputWrapper}>
		{searchedData[0] && 
			searchedData.map()
		}
	</div>
}
