import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { saveTodosToLocalStorage } from "../features/todo/todoSlice";
import themeReducer, { saveThemeToLocalStorage } from "../features/theme/themeSlice";

// Configure the store with todos and theme reducers
const store = configureStore({
    reducer: {
        todos: todoReducer, // Todos reducer
        theme: themeReducer // Theme reducer
    }
});

// Save todos and theme to localStorage on store updates
saveTodosToLocalStorage(store); // Sync todos with localStorage
saveThemeToLocalStorage(store); // Sync theme with localStorage

export default store;