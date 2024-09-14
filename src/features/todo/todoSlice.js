import { createSlice } from "@reduxjs/toolkit";

// Retrieve initial todos from localStorage or return an empty array
const getInitialTodos = () => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
};

// Create the todo slice with actions and reducers
const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: getInitialTodos(), // Initialize todos from localStorage
        filter: 'All' // Default filter is 'All'
    },
    reducers: {
        // Add a new todo item
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },

        // Delete a todo item by its ID
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },

        // Update the text of an existing todo item
        updateTodo: (state, action) => {
            const { id, updatedTodoText } = action.payload;
            console.log(action.payload);
            const todoUpdate = state.todos.find(todo => todo.id === id)
            if (todoUpdate) {
                todoUpdate.todo = updatedTodoText;
            }
        },

        // Toggle the completion status of a todo item
        toggleCompleted: (state, action) => {
            const toggleTodo = state.todos.find(todo => todo.id === action.payload);
            if (toggleTodo) {
                toggleTodo.isCompleted = !toggleTodo.isCompleted;
            }
        },

        // Set the filter for displaying todos
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
});

// Export actions for use in components
export const { addTodo, deleteTodo, updateTodo, toggleCompleted, setFilter } = todoSlice.actions;

// Selector to filter todos based on the current filter state
export const selectFilteredTodos = (state) => {
    const { todos, filter } = state.todos;
    if (filter === "Completed") {
        return todos.filter(todo => todo.isCompleted);
    }
    if (filter === "Pending") {
        return todos.filter(todo => !todo.isCompleted);
    }
    // Return all todos if filter is 'All'
    return todos;
}

// Save todos to localStorage whenever the store updates
export const saveTodosToLocalStorage = (store) => {
    store.subscribe(() => {
        const todos = store.getState().todos.todos;
        localStorage.setItem('todos', JSON.stringify(todos));
    })
}

export default todoSlice.reducer;