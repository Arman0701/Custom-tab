import style from "./SearchPage.module.scss";
import SearchBox from "../../components/SearchBox";

export default function SearchPage() {
	
    return <div className={style.searchPageWrapper}>
		<SearchBox />
		
	</div>;
}
