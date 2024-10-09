import TodoTypes from "./todo";

const LOCAL_STORAGE_KEY = 'todos';

const TodoService = {
  //get todos
  getTodos: (): TodoTypes[] => {
    const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY)
    return todoStr? JSON.parse(todoStr) : []
  },

  //add todos
  addTodos: (text: string): TodoTypes => {
    const todos = TodoService.getTodos();
    const newTodo = {id: todos.length + 1, text, completed: false}
    const updatedTodos = [...todos, newTodo]
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    return newTodo;
  },

  //updating the todo
  updateTodo: (todo: TodoTypes): TodoTypes => {
    const todos = TodoService.getTodos();
    const updatedTodos = todos.map(t => t.id === todo.id? todo : t);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))
    return todo
  },

  //deleting the todo
  deleteTodo: (id: number): void => {
    const todos = TodoService.getTodos();
    const updatedTodos = todos.filter(t => t.id !== id)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))

  }
}

export default TodoService
