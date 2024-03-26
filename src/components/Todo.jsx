import React from 'react'
import './Todo.css'

const Todo = ({ todo, toggleTodo, deleteTodo }) => {
  const handleToggle = () => {
    toggleTodo(todo.id)
  }

  const handleDeleteTodo = () => {
    deleteTodo(todo.id)
  }

  return (
    <div className='todo-item'>
      <label
        className={`todo-label ${todo.isCompleted ? 'completed' : ''}`}
        htmlFor={`todo-checkbox-${todo.id}`}
        onClick={handleToggle}
      >
        <h4>
          {todo.id}. {todo.title}
        </h4>
      </label>
      <button
        className='todo-delete-btn'
        id={`todo-delete-button-${todo.id}`}
        onClick={handleDeleteTodo}
      >
        X
      </button>
    </div>
  )
}

export default Todo
