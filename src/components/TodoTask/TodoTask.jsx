import style from "./TodoTask.module.scss";

import trash from "../../assets/icons/trash.svg";
import pencil from "../../assets/icons/pencil.svg";

import setTaskBorder from "../../helpers/setTaskBorder";

import { useState } from "react";
import { deleteTask, editTask, toggleTask } from "../../redux-store/notesSlice";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export default function TodoTask({ todo }) {
    const inputRef = useRef();
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);

    function setEditModeHandler(e) {
        e.stopPropagation();
        if (editMode) taskEditHandler();
        if (!editMode) inputRef.current?.focus();
        setEditMode((p) => !p);
    }

    function toggleTaskHandler() {
        dispatch(toggleTask(todo.id));
    }

    function taskEditHandler() {
        dispatch(
            editTask({
                id: todo.id,
                title: inputRef.current.value,
            })
        );
    }

    function deleteTaskHandler() {
        dispatch(deleteTask(todo.id));
    }

    function inputClickHandler(e) {
        e.stopPropagation();
    }

    return (
        <div
            className={style.taskWrapper}
            onClick={toggleTaskHandler}
            style={{
                border: ` 3px solid ${setTaskBorder(todo.priority)}`,
                backgroundColor: todo.background,
            }}
        >
            <input
                type="checkbox"
				checked={todo.checked}
                onChange={toggleTaskHandler}
				onClick={toggleTaskHandler}
            />
            {editMode ? (
                <input
                    type="text"
                    autoFocus
                    defaultValue={todo.title}
                    ref={inputRef}
                    onClick={inputClickHandler}
                />
            ) : (
                <p>{todo.title}</p>
            )}
            <div className={style.options}>
                <button
                    className={style.optionButton}
                    onClick={setEditModeHandler}
                >
                    <img src={pencil} alt="icon" />
                </button>
                <button
                    className={style.optionButton}
                    onClick={deleteTaskHandler}
                >
                    <img src={trash} alt="icon" />
                </button>
            </div>
            <span>
                {todo.priority + " | "}
                {todo.creationDate}
            </span>
        </div>
    );
}
