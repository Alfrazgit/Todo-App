import { useEffect, useState } from 'react'
import Todo from './components/Todo'
import './App.css'

function App () {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem('todos')) || []
  )
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    console.log('todos', todos)
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const clearTodos = () => {
    localStorage.removeItem('todos')
    setTodos([])
  }

  const addItem = () => {
    if (inputValue.trim()) {
      if (todos.some(todo => todo.title === inputValue)) {
        alert('Item with the same title already exists!')
        return
      }

      const newId =
        todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1

      setTodos(prevTodos => [
        ...prevTodos,
        { id: newId, title: inputValue, isCompleted: false }
      ])
      setInputValue('')
    }
  }

  const toggleTodo = id => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    )
    setTodos(updatedTodos)
  }

  const deleteTodo = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
  }

  const deleteCompletedTodos = () => {
    const updatedTodos = todos.filter(todo => !todo.isCompleted)
    setTodos(updatedTodos)
  }

  const hasCompletedTodos = todos.some(todo => todo.isCompleted)

  return (
    <>
      <h1 className='heading'>Vite Todo App</h1>

      <div className='todo-container'>
        <section className='add-todo-section'>
          <input
            className='add-todo-input'
            type='text'
            placeholder='Add an item...'
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
            onKeyDown={event => (event.key === 'Enter' ? addItem() : null)}
          />

          <button className='add-todo-button' onClick={addItem}>
            +
          </button>
        </section>

        {hasCompletedTodos && (
          <button
            className='remove-completed-button'
            onClick={deleteCompletedTodos}
          >
            Remove Completed Todos?
          </button>
        )}

        <div className='item-container'>
          {todos.map(todo => (
            <Todo
              todo={todo}
              key={todo.id}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>

        <button className='clear-todos-button' onClick={() => clearTodos()}>
          Reset Todos
        </button>
      </div>
    </>
  )
}

export default App
