import { useSelector } from "react-redux";
import style from "./SearchOutput.module.scss";
import MainLinkComponent from "../../components/MainLinkComponent";
import FolderItem from "../FolderItem";

export default function SearchOutput() {
	const {output: searchedData, filter, status} = useSelector(store => store.searchSlice)

	function HelperComponent({value}) {
		switch(filter) {
			case 'mainLinks':
				return <MainLinkComponent key={value.id} link={value} />

			case "folders":
				return <FolderItem key={value.id} item={value} />
			default: break;
		}
	}

    return <div className={style.searchOutputWrapper}>
		{searchedData.length ? 
			searchedData.map(value => <HelperComponent key={value.id} value={value} />) : 
			status ? <span className={style.message}>No matches!</span> : null

		}
	</div>
}
