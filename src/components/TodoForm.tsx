import React, {useState, Dispatch, SetStateAction} from 'react'
import TodoService from '../todoservice';
import TodoTypes from '../todo';
import "../CSS/TodoForm.css"

interface PropTypes {
  setTodos : Dispatch<SetStateAction<TodoTypes[]>>
}

const TodoForm:React.FC<PropTypes> = ({setTodos}) => {
  const [newTodoText, setNewTodoText] = useState<string>("");
  const handleAddTodo = () => {
    if (newTodoText.trim() !== "") {
      const newTodo = TodoService.addTodos(newTodoText);
      setTodos((prevTodo) => [...prevTodo, newTodo]);
      setNewTodoText("");
    }
  }

  console.log("what is new todo text", newTodoText)


  return (
    <div className='inputForm'>
      <input
        type="text"
        value={newTodoText}
        onChange={(e)=> setNewTodoText(e.target.value)}
        autoFocus={true}
        placeholder='Add a Task'
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  )
}

export default TodoForm
