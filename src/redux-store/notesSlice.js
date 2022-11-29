import { createSlice } from "@reduxjs/toolkit";
import addToDb from "../helpers/addToDb";
import { v4 as getID } from "uuid";
import hex2rgb from "../helpers/hex2rgb";

const initialState = {
    notes: [],
    todos: [],
};

export const notesSlice = createSlice({
    name: "notesSlice",
    initialState,
    reducers: {
        initTodos(state, { payload }) {
            if (payload) state.todos = payload;
        },
        addTodo(state, { payload }) {
            if (payload.title) {
                state.todos = [
                    ...state.todos,
                    {
                        id: getID(),
                        checked: false,
                        creationDate: new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                        ...payload,
                        priority: payload.priority || "None",
                        background: `rgba(${hex2rgb(
                            payload.background
                        )}, 0.73)`,
                    },
                ];
                addToDb("notes/todoList", state.todos);
            }
        },
        toggleTask(state, { payload }) {
            state.todos = state.todos.map((task) => {
                if (task.id === payload) {
                    return {
                        ...task,
                        checked: !task.checked,
                    };
                }
                return task;
            });
            addToDb("notes/todoList", state.todos);
        },
        editTask(state, { payload }) {
            if (payload.title) {
                state.todos = state.todos.map((task) => {
                    if (task.id === payload.id) {
                        return {
                            ...task,
                            title: payload.title,
                        };
                    }
                    return task;
                });
                addToDb("notes/todoList", state.todos);
            }
        },
        deleteTask(state, { payload }) {
            state.todos = state.todos.filter((task) => task.id !== payload);
            addToDb("notes/todoList", state.todos);
        },

        // ===================================================================
        // ===================================================================

        initNotes(state, { payload }) {
            if (payload) state.notes = payload;
        },
        addNote(state, { payload }) {
            if (payload.title && payload.description) {
                state.notes = [
                    ...state.notes,
                    {
                        id: getID(),
                        creationDate: new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                        ...payload,
						background: `rgba(${hex2rgb(
                            payload.background
                        )}, 0.21)`,
						description: JSON.stringify(payload.description)
                    },
                ];
				addToDb("notes/noteList", state.notes)
            }
        },
		editNote(state, {payload}) {
			if (payload.title && payload.description) {
				state.notes = state.notes.map(note => {
					if (note.id === payload.id) {
						return {
							...note,
							...payload,
							background: `rgba(${hex2rgb(
								payload.background
							)}, 0.21)`,
							description: JSON.stringify(payload.description)
						}
					}
					return note;
				})
				addToDb("notes/noteList", state.notes)
			}
		},
		deleteNote(state, {payload}) {
			state.notes = state.notes.filter(note => note.id !== payload)
			addToDb("notes/noteList", state.notes)
		}
    },
});

export const {
    initTodos,
    addTodo,
    toggleTask,
    editTask,
    deleteTask,

    initNotes,
    addNote,
	editNote,
	deleteNote,
} = notesSlice.actions;
export default notesSlice.reducer;
