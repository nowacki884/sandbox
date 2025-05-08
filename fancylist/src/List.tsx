import { ChangeEvent, KeyboardEvent, useState } from "react"

import { Todo, TodoList, addTodo, deleteTodo, updateListName } from "./todoListHandlers"

import TodoItem from "./TodoItem"

interface TodoListProps {
  data: TodoList
  removeFn: (listId: string) => void
}

export default function List(props: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(props.data.todos)
  const [listDisplayName, setListDisplayName] = useState<string>(props.data.listName)

  function checkKeyPress(e: KeyboardEvent<HTMLTextAreaElement>): void {
    if (e.key === "Enter" || e.key === "Escape") {
      e.preventDefault()
      saveListName()
    }
  }

  function handleNameChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    const newName = e.target.value
    setListDisplayName(newName)
  }

  function saveListName(): void {
    updateListName(props.data.id, listDisplayName)
  }

  function addNewTodo(): void {
    const newTodoData = addTodo(props.data.id)
    if (newTodoData) setTodos((prev) => [...prev, newTodoData])
  }

  function deleteTodoFromList(todoId: string): void {
    const newTodoList: Todo[] = deleteTodo(props.data.id, todoId)
    setTodos(newTodoList)
  }

  return (
    <div className="list">
      <div className="list-header">
        <textarea
          className="list-title"
          value={listDisplayName}
          onKeyDown={checkKeyPress}
          onChange={handleNameChange}
          onBlur={saveListName}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        >
          {listDisplayName}
        </textarea>
        <button onClick={() => props.removeFn(props.data.id)}>
          <i className="fa fa-times"></i>
        </button>
      </div>
      <div className="list-body">
        <div className="todo-wrapper">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              data={todo}
              removeFn={deleteTodoFromList}
              listId={props.data.id}
            />
          ))}
        </div>
        <button onClick={addNewTodo}>Add Task</button>
      </div>
    </div>
  )
}
