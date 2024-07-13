// src/App.jsx
import React, { useState } from 'react';
import { TodoProvider, useTodos } from './TodoContext';

const TodoInput = () => {
  const [text, setText] = useState('');
  const { dispatch } = useTodos();

  const handleAddTodo = () => {
    if (text) {
      dispatch({ type: 'ADD_TODO', payload: text });
      setText('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

const TodoList = () => {
  const { todos, dispatch } = useTodos();

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
          <button onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}>
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  return (
    <TodoProvider>
      <h1>Todo App</h1>
      <TodoInput />
      <TodoList />
    </TodoProvider>
  );
};

export default App;
