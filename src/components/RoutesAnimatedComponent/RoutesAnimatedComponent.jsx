import { Route, Routes, useLocation } from "react-router-dom";
import { animated, useTransition } from "react-spring";
import PrivateRoute from "../PrivateRoute";
import AccountPage from "../../pages/AccountPage";
import LoginPage from "../../pages/LoginPage";
import MainPage from "../../pages/MainPage";
import SignInPage from "../../pages/SignInPage";
import SearchPage from "../../pages/SearchPage";
import style from "./RoutesAnimatedComponent.module.scss";
import NotesPage from "../../pages/NotesPage";
import FoldersPage from "../../pages/FoldersPage";
import AudioPlayerPage from "../../pages/AudioPlayerPage";
import NotesList from "../NotesList";
import TodosList from "../TodosList";

export default function RotesAnimatedComponent() {
    const location = useLocation();
    const transitions = useTransition(location, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    return transitions((props, item) => (
        <animated.div
            style={{
                ...props,
                position: "absolute",
                width: "100%",
                height: "100%",
            }}
        >
            <Routes location={item}>
                <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
                <Route path="/player" element={{}} />
                <Route path="/notes" element={<PrivateRoute><NotesPage /></PrivateRoute>} >
					<Route path="todo-list" element={<PrivateRoute><TodosList /></PrivateRoute>} />
					<Route path="note-list" element={<PrivateRoute><NotesList /></PrivateRoute>} />
				</Route>
                <Route path="/folders" element={<PrivateRoute><FoldersPage /></PrivateRoute>} />
                <Route path="/account" element={<PrivateRoute><AccountPage /></PrivateRoute>} />
                <Route path="/login" element={<PrivateRoute><LoginPage /></PrivateRoute>} />
                {/* <Route path="/player" element={<PrivateRoute><AudioPlayerPage /></PrivateRoute>} /> */}
                <Route path="/sign-in" element={<SignInPage />} /> 
				
                <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
            </Routes>
            <p className={style.footer}>Made by Arman Tadevosyan</p>
        </animated.div>
    ));
}
