import { useState, useRef, useEffect } from 'react';
import { MdCheckBoxOutlineBlank, MdDelete } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";
import { FaEdit, FaSave } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { updateTodo, toggleCompleted, deleteTodo } from '../features/todo/todoSlice';

const Todo = ({ todo }) => {
    // State to hold the text of the todo item, initialized with the current todo text.
    const [todoText, setTodoText] = useState(todo.todo)
    // Ref to directly access the input element for editing the todo item.
    const editTodoRef = useRef(null);
    // State to manage whether the input field is in edit mode (false) or view mode (true).
    const [isDisabled, setIsDisabled] = useState(true);
    // Hook to access Redux dispatch function
    const dispatch = useDispatch();
    // Ref to access the todo item container DOM element
    const todoRef = useRef(null);

    // Toggle between edit and view modes
    const handleEdit = () => {
        setIsDisabled(prev => !prev);
    }

    // Update the todo item with new text
    const updateTodoItem = (id) => {
        if (editTodoRef.current?.value !== '') {
            dispatch(updateTodo({ id: id, updatedTodoText: editTodoRef.current.value.trim() }));
            setTodoText(editTodoRef.current.value.trim())
        } else {
            setTodoText(todo.todo)
        }
        setIsDisabled(prev => !prev);
    }

    // Focus the input field when entering edit mode
    useEffect(() => {
        if (!isDisabled) {
            editTodoRef.current?.focus();
        }
    }, [isDisabled])

    // Close edit mode on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (todoRef.current && !todoRef.current.contains(e.target)) {
                if (!isDisabled) {
                    setIsDisabled(true);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDisabled]);


    return (
        <div
            ref={todoRef}
            className="flex flex-wrap flex-row items-center w-full h-full bg-white p-2 border-2 border-purple-500 my-2">
            <div
                className='flex flex-row items-center w-4/5'>
                <div>
                    {/* Checkbox for toggling completion status */}
                    {todo.isCompleted ? (
                        <IoIosCheckbox
                            onClick={() => isDisabled && dispatch(toggleCompleted(todo.id))}
                            className={`text-2xl text-purple-500 ${isDisabled ? "hover: cursor-pointer" : ""}`} />
                    ) : (
                        <MdCheckBoxOutlineBlank
                            className={`text-2xl text-purple-500 ${isDisabled ? "hover: cursor-pointer" : ""}`}
                            onClick={() => isDisabled && dispatch(toggleCompleted(todo.id))} />
                    )}
                </div>
                <div
                    className='flex flex-col flex-wrap w-11/12'>
                    <input
                        onChange={(e) => setTodoText(e.current?.value)}
                        ref={editTodoRef}
                        className={`px-3 py-2 disabled:bg-white disabled:py-0 ${todo.isCompleted ? "line-through text-gray-500" : ""}`}
                        type="text"
                        value={todoText}
                        disabled={isDisabled} />
                    <p
                        className="px-3 text-xs text-gray-500">{todo.time}</p>

                </div>
            </div>

            <div
                className='flex flex-wrap flex-row gap-2 text-white text-2xl w-1/5 justify-end'>
                {/* Edit or save button based on edit mode */}
                {!todo.isCompleted && (
                    <>
                        {isDisabled ? (
                            <div
                                className='bg-purple-500 p-1 rounded-lg hover:bg-purple-300 hover:cursor-pointer'>
                                <FaEdit
                                    onClick={handleEdit}
                                />
                            </div>
                        ) : (
                            <div
                                className='bg-purple-500 p-1 rounded-lg hover:bg-purple-300 hover:cursor-pointer'>
                                <FaSave
                                    onClick={() => updateTodoItem(todo.id)}
                                />
                            </div>
                        )}
                    </>
                )}
                {/* Delete button */}
                <div
                    className={`bg-purple-500 p-1 rounded-lg ${isDisabled ? "hover:cursor-pointer hover:bg-purple-300" : ""}`}>
                    <MdDelete
                        onClick={() => isDisabled && dispatch(deleteTodo(todo.id))}
                    />
                </div>
            </div>
        </div>
    );
}

export default Todo;