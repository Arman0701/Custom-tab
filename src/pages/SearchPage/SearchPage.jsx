import style from "./SearchPage.module.scss";
import SearchBox from "../../components/SearchBox";
import SearchOutput from "../../components/SearchOutput/SearchOutput";

export default function SearchPage() {
	
    return <div className={style.searchPageWrapper}>
		<SearchBox />
		<SearchOutput />
	</div>;
}
