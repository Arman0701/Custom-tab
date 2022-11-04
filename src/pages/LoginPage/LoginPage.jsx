import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import style from "./LoginPage.module.scss";
import portraitIcon from "../../assets/icons/portrait.svg";
import { useDispatch } from "react-redux";
import { initUser } from "../../redux-store/userSlice";
import { getDataFromDb } from "../../helpers/getDataFromDb";
import localStorageHook from "../../hooks/useLocalStorage";

export default function LoginPage() {
    const loginRef = useRef();
    const passRef = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	const goToRoute = useCallback((route) => {
		if (pathname !== route) navigate(route);
    }, [])

    const loginHandler = useCallback((e) => {
        e.preventDefault();
        signInWithEmailAndPassword(
            auth,
            loginRef.current.value,
            passRef.current.value
        )
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
				localStorageHook("current-user-id", user.uid)
				dispatch(initUser(getDataFromDb(`users/${user.uid}`)))
				navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
		
    }, [])

    return (
        <div className={style.loginPageWrapper}>
            <h2>Login to your account</h2>
            <form className={style.loginForm} onSubmit={loginHandler}>
                <input type="email" autoComplete="username" placeholder="Email" ref={loginRef} />
                <input type="password" autoComplete="current-password" placeholder="Password" ref={passRef} />

                <button onClick={loginHandler}><span>Login</span></button>

				<footer onClick={() => goToRoute('/sign-in')} >
					<div className={style.footerIconWrapper}>
						<img src={portraitIcon} alt="icon" />
					</div>
					<p>Create new account</p>
				</footer>
            </form>
        </div>
    );
}
