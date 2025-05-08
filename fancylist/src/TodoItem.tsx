import { ChangeEvent, KeyboardEvent, useState } from "react"

import { Todo, updateTodoName, updateTodoStatus } from "./todoListHandlers"

interface TodoProps {
  data: Todo
  listId: string
  removeFn: (todoId: string) => void
}

export default function TodoItem(props: TodoProps) {
  const [todoDisplayName, setTodoDisplayName] = useState<string>(props.data.todoName)
  const [isTodoDone, setIsTodoDone] = useState<boolean>(props.data.isDone)

  function checkKeyPress(e: KeyboardEvent<HTMLTextAreaElement>): void {
    if (e.key === "Enter" || e.key === "Escape") {
      e.preventDefault()
      saveTodoName()
    }
  }

  function handleNameChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    const newName = e.target.value
    setTodoDisplayName(newName)
  }

  function saveTodoName(): void {
    updateTodoName(props.listId, props.data.id, todoDisplayName)
  }

  function updateStatus(): void {
    const newTodoStatus: boolean = !isTodoDone
    setIsTodoDone(newTodoStatus)
    updateTodoStatus(props.listId, props.data.id, newTodoStatus)
  }

  return (
    <div className="todo">
      <button onClick={updateStatus}>
        {isTodoDone ? <i className="fa fa-check-circle-o"></i> : <i className="fa fa-circle-o"></i>}
      </button>
      <textarea
        value={todoDisplayName}
        onKeyDown={checkKeyPress}
        onChange={handleNameChange}
        onBlur={saveTodoName}
        className="todo-title"
        style={isTodoDone ? { color: "var(--clr-textarea-bg)" } : {}}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      >
        {todoDisplayName}
      </textarea>
      <button onClick={() => props.removeFn(props.data.id)}>
        <i className="fa fa-times"></i>
      </button>
    </div>
  )
}
