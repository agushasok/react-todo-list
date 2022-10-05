import React, { useState } from 'react';
import './TodoList.css'
import { TodoItem } from "../interfaces";

interface TodoListProps {
    addTodo: (name: string) => void;
    removeTodo: (id: number) => void;
    todos: TodoItem[];
}

export function TodoList({addTodo, todos, removeTodo}: TodoListProps) {
    const [newTodoName, newTodoNameChange] = useState('');

    const addNewTodo = () => {
        addTodo(newTodoName);
        newTodoNameChange('');
    }

    return (
        <div className="TodoList">
            <h1>Todo list</h1>
            <div className="addTodoWrapper">
                <input className="addInput" onChange={e => newTodoNameChange(e.target.value)} value={newTodoName}/>
                <button className="button" onClick={addNewTodo} disabled={!newTodoName}> Add </button>
            </div>
            <div className="todoListWrapper">
                {
                    todos.map(todoItem => <div key={todoItem.id} className="todoItem">
                        <div className="todoName">{todoItem.name}</div>
                        <button className="button" onClick={() => removeTodo(todoItem.id)}>Remove</button>
                    </div>)
                }
            </div>
        </div>
    )
}