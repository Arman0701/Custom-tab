import localStorageHook from "../../hooks/useLocalStorage";
import LoginPage from "../../pages/LoginPage";

export default function PrivateRoute({ children }) {
	let userID = localStorageHook('current-user-id')
	if (!userID) return <LoginPage />;
	return children;

}
