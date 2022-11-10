import { createSlice } from "@reduxjs/toolkit";
import { v4 as getID } from "uuid";
import addToDb from "../helpers/addToDb";
import { logout } from "./userSlice";

const initialState =  {
	value: {
		todoList: [],
		noteList: []
	}
}

export const notesSlice = createSlice({
	name: "notesSlice",
	initialState,
	reducers: {
		initNotes(state, {payload}) {
			if (payload) state.value.noteList = payload
		},
		addNote(state, {payload}) {
			if (payload.title && payload.description) {
				const newNote = {
					id: getID(),
					title: payload.title,
					description: payload.description,
					imageURL: payload.imageURL || "",
					bgColor: payload.bgColor === "#000000" ? "rgba(white, 0.4)" : payload.bgColor,
					creationDate: new Date().toLocaleDateString("en-US", {
						weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric"
					})
				}
				state.value.noteList.push(newNote)
				addToDb("/notes/noteList/", [...state.value.noteList])
			}
		},
		removeNote(state, {payload}) {
			state.value.noteList.filter(note => note.id !== payload)
			addToDb("/notes/noteList/", [...state.value.noteList])
		},
		editNote(state, {payload}) {
			if (payload.title && payload.description) {
				state.value.noteList.map(item => {
					if (item.id === payload.id) {
						return {...payload}
					}
					return item
				})
				addToDb("/notes/noteList/", [...state.value.noteList])
			}
		},
		removeAllNotes(state) {
			state.value.noteList = []
		},

// ========================================================================================
// ========================================================================================

		initTodos(state, {payload}) {
			if (payload) state.value.todoList = payload || []
		},
		addTodo(state, {payload}) {
			if (payload.title) {
				const newTodo = {
					id: getID(),
					title: payload.title,
					checked: false,
					color: payload.color || "transparent",
					priority: payload.priority || "None",
					creationDate: new Date().toLocaleDateString("en-US", {
						weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: "2-digit"
					})
				}
				state.value.todoList.push(newTodo)
				addToDb("/notes/todoList", [ ...state.value.todoList])
			}
		},
		removeTodo(state, {payload}) {
			state.value.todoList.filter(todo => todo.id !== payload)
			addToDb("/notes/todoList", [ ...state.value.todoList])
		},
		toggleTodoState(state, {payload}) {
			console.log('asdfasdf');
			state.value.todoList = [...state.value.todoList.map(todo => {
				if (todo.id === payload) {
					return {
						...todo,
						checked: !todo.checked,
					}
				}
				return todo;
			})]
			addToDb("/notes/todoList", [ ...state.value.todoList])
		},
		editTodo(state, {payload}) {
			if (payload.title) {
				state.value.todoList.map(item => {
					if (item.id === payload.id) {
						return {...payload}
					}
					return item
				})
			}
		},
		removeCompletedTodos(state) {
			state.value.todoList.filter(item => !item.checked)
			addToDb("/notes/todoList", [ ...state.value.todoList])
		},
		removeAllTodos(state) {
			state.value.todoList = []
			addToDb("/notes/todoList", [ ...state.value.todoList])
		}
	},
	extraReducers: builder => {
		builder.addCase(logout, state => {
			console.log("notes");
			state = initialState
		})
	}
});

export const {
	initNotes,
	addNote,
	editNote,
	removeNote,
	removeAllNotes,

	initTodos,
	addTodo,
	editTodo,
	removeTodo,
	removeAllTodos,
	toggleTodoState,
	removeCompletedTodos,

} = notesSlice.actions;
export default notesSlice.reducer;