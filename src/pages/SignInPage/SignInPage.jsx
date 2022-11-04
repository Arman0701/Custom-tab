import { createUserWithEmailAndPassword } from "firebase/auth";
import { useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import style from "../LoginPage/LoginPage.module.scss";
import signIn from "../../assets/icons/signIn.svg";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux-store/userSlice";

export default function SignInPage() {
    const emailRef = useRef();
    const passRef = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { pathname } = useLocation()

	const goToRoute = useCallback((route) => {
		if (pathname !== route) navigate(route);
    }, []);

    const createAccountHandler = useCallback((e) => {
		e.preventDefault()
		createUserWithEmailAndPassword(
			auth,
			emailRef.current.value,
			passRef.current.value
		)
			.then((userCredential) => {
				const user = userCredential.user;
				localStorage.setItem('current-user-id', user.uid)
				dispatch(createUser({
					email: emailRef.current.value,
					password: passRef.current.value,
					firstName: nameRef.current.value,
					lastName: surnameRef.current.value,
					uid: user.uid
				}))
				navigate('/login')
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
			});
    }, []);

    return (
        <div className={style.loginPageWrapper}>
            <h2>Create your account with one click!</h2>
            <form className={style.loginForm} onSubmit={createAccountHandler}>
                <input type="text" placeholder="First Name" ref={nameRef} />
                <input type="text" placeholder="Last Name" ref={surnameRef} />
                <input type="email" placeholder="Email" ref={emailRef} />
                <input type="text" placeholder="Password" ref={passRef} />

                <button onClick={createAccountHandler}><span>Create account</span></button>

				<footer onClick={() => goToRoute('/login')}>
					<div className={style.footerIconWrapper}>
						<img src={signIn} alt="icon" />
					</div>
					<p>Already have an account ? Just log in.</p>
				</footer>
            </form>
        </div>
    );
}
