import React, { useEffect, useReducer } from 'react';
import './App.css';
import { TodoList } from './todoList/TodoList'
import { TodoItem } from "./interfaces";

const reducer = (state: TodoItem[], action: { type: string, [field: string]: any }) => {
    switch (action.type) {
        case 'add':
            const newId = Math.max(...state.map(todo => todo.id), 1) + 1;
            return [{ id: newId, name: action.name, isDone: false }, ...state];
        case 'remove':
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
}

function App() {
    const storagedTodos = localStorage.getItem('todos');
    const initialTodos: TodoItem[] = storagedTodos ? JSON.parse(storagedTodos) : [];

    const [todos, dispatch] = useReducer(reducer, initialTodos);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    return (
        <div className="App">
            <TodoList
                todos={todos}
                addTodo={(name) => dispatch({type: 'add', name})}
                removeTodo={(id) => dispatch({type: 'remove', id})}
            />
        </div>
    );
}

export default App;
