import { createSlice } from "@reduxjs/toolkit";

// Retrieve the initial theme from localStorage or default to "dark"
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme') || "dark";
    // Apply the saved theme to the document
    document.querySelector('html').className = savedTheme;
    return savedTheme;
}

// Create the theme slice with actions and reducers
const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        // Set the initial theme from localStorage or default
        themeMode: getInitialTheme()
    },
    reducers: {
        // Toggle between "dark" and "light" themes
        toggleTheme: (state) => {
            state.themeMode = state.themeMode === "dark" ? "light" : "dark";
        }
    }
})

// Export actions for use in components
export const { toggleTheme } = themeSlice.actions;

// Selector to get the current theme mode from the state
export const selectThemeMode = (state) => state.theme.themeMode;

// Save the theme to localStorage and apply it to the document on store updates
export const saveThemeToLocalStorage = (store) => {
    store.subscribe(() => {
        const themeMode = store.getState().theme.themeMode;
        localStorage.setItem('theme', themeMode);
        // Update the document class with the current theme
        document.querySelector('html').className = themeMode;
    })
}

export default themeSlice.reducer;