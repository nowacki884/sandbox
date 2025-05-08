import { useEffect, useState } from "react"

import { addList, deleteList, getLists, TodoList } from "./todoListHandlers"

import List from "./List"

function App() {
  const [todoLists, setTodoLists] = useState<TodoList[]>([])

  useEffect(() => {
    const savedTodoLists = getLists()
    savedTodoLists.sort((a, b) => a.creationDate - b.creationDate)
    setTodoLists(savedTodoLists)
  }, [])

  function addTodoList(): void {
    const newList = addList()
    setTodoLists((prev) => [...prev, newList])
  }

  function removeTodoList(listId: string): void {
    const updatedTodoLists = deleteList(listId)
    setTodoLists(updatedTodoLists)
  }

  return (
    <>
      <header>
        <h1>✅ FancyList</h1>
      </header>
      <main>
        <div className="list-wrapper">
          {todoLists?.map((list) => (
            <List key={list.id} data={list} removeFn={removeTodoList} />
          ))}
        </div>
        <button onClick={addTodoList}>Add List</button>
      </main>
    </>
  )
}

export default App
