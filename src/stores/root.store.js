import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/taskSlice";
import filterReducer from "../features/filter-task-list/filterSlice";


const saveToLocalStorage = store => next => action => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('tasks', JSON.stringify(state.tasklist));
    return result;
};


export const store = configureStore({
    reducer: {
        tasklist: taskReducer,
        filter: filterReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveToLocalStorage),
});