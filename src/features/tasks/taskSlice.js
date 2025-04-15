import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const savedTasks = JSON.parse(localStorage.getItem("tasks")) || {};

const initialState = {
    tasks: savedTasks.tasks || [],
    categories: savedTasks.categories || ["All Tasks", "Work", "Personal", "Completed", "Pending"],
};

const taskSlice = createSlice({
    name: 'tasklist',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({
                id: nanoid(),
                text: action.payload.text,
                completed: false,
                category: action.payload.category,
            });
        },
        toggleTask: (state, action) => {
            state.tasks = state.tasks.map(task =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        },
        updateTask: (state, action) => {
            state.tasks = state.tasks.map(task =>
                task.id === action.payload.id ? { ...task, ...action.payload } : task
            );
        },
        clearAllTasks: (state) => {
            state.tasks = [];
        },
        addCategory: (state, action) => {
            const newCategory = action.payload;
            if (["All Tasks", "Completed", "Pending"].includes(newCategory)) return;

            if (!state.categories.includes(newCategory)) {
                state.categories = [...state.categories.slice(0, -2), newCategory, ...state.categories.slice(-2)];
            }
        },
        removeCategory: (state, action) => {
            const categoryToRemove = action.payload;
            if (["All Tasks", "Completed", "Pending"].includes(categoryToRemove)) return;

            state.categories = state.categories.filter(cat => cat !== categoryToRemove);
            state.tasks = state.tasks.filter(task => task.category !== categoryToRemove);
        }
    }
});

export default taskSlice.reducer;
export const { addTask, toggleTask, removeTask, updateTask, addCategory, clearAllTasks, removeCategory } = taskSlice.actions;
