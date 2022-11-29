import { Link, Outlet, useLocation } from "react-router-dom";
import style from "./NotesPage.module.scss";

const buttonStyles = {
    border: "2px solid aqua",
};

export default function NotesPage() {
    const { pathname } = useLocation();

    return (
        <>
            <div className={style.notesPageWrapper}>
                <div className={style.tabsBlock}>
                    <Link to="/notes/todo-list">
                        <button
                            style={
                                pathname === "/notes/todo-list"
                                    ? { ...buttonStyles }
                                    : {}
                            }
                        >
                            Todos
                        </button>
                    </Link>
                    <Link to="/notes/note-list">
                        <button
                            style={
                                pathname === "/notes/note-list"
                                    ? { ...buttonStyles }
                                    : {}
                            }
                        >
                            Notes
                        </button>
                    </Link>
                </div>

                <Outlet />
            </div>
        </>
    );
}
