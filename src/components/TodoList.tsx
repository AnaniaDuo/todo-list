import React, {useState} from 'react'
import TodoTypes from '../todo'
import TodoService from '../todoservice'
import { FaCheck, FaEdit } from 'react-icons/fa'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import TodoForm from './TodoForm'
import "../CSS/TodoList.css"

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos())
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null)
  const [editedTodoText, setEditedTodoText] = useState<string>("")

  //function for handling edit actions
  const handleEditStart = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditedTodoText(text)
  }


const handleEditCancel = () => {
  setEditingTodoId(null);
  setEditedTodoText("")
}

const handleEditSave = (id: number) => {
  if (editedTodoText !== ""){
    const updatedTodo = TodoService.updateTodo({
      id,
      text: editedTodoText,
      completed: false
    });
    setTodos(prevTodos => prevTodos.map(t => t.id === id? updatedTodo : t))
    setEditedTodoText("");
    setEditingTodoId(null);
  }
}

// function to handle delete action
const handleDeleteTodo = (id: number) => {
  TodoService.deleteTodo(id);
  setTodos(prevTodos => prevTodos.filter(t => t.id !== id))
}

  return (
    <div className='todoContainer'>
      <div>
        <TodoForm setTodos={setTodos}/>
      </div>
      {todos.map(todo =>
        <div className='items' key={todo.id}>
          {editingTodoId === todo.id ? (
          <div className='editText'>
            <input
              type="text"
              value={editedTodoText}
              onChange={e => setEditedTodoText(e.target.value)}
              autoFocus={true}
            />
            <button onClick={() => handleEditSave(todo.id)}>
              <FaCheck/>
            </button>

            <button className="cancelBtn" onClick={() => handleEditCancel()}>
              <FaEdit/>
            </button>
          </div>
          ):(
          <div className='editBtn'>
              <span>{todo.text}</span>
              <button onClick={() => handleEditStart(todo.id, todo.text)}>
                <FaEdit/>
              </button>
          </div>
          )}
          <button onClick={()=> handleDeleteTodo(todo.id)}>
            <RiDeleteBin5Fill/>
          </button>
        </div>
        )}
    </div>
  )
}

export default TodoList
