import { v4 as uuidV4 } from "uuid"

export interface TodoList {
  id: string
  listName: string
  todos: Todo[]
  creationDate: number
}

export interface Todo {
  id: string
  todoName: string
  isDone: boolean
}

let localStorageItems: string[] = Object.keys(localStorage)

function updateLocalStorageItems(): void {
  localStorageItems = Object.keys(localStorage)
}

export function getLists(): TodoList[] {
  const todoLists: TodoList[] = []

  localStorageItems.forEach((item: string) => {
    if (!item.startsWith("todolist/")) return

    // Name structure: todolist/listid/listname
    const itemNameElements: string[] = item.split("/")

    const listId: string = itemNameElements[1]
    const listName: string = itemNameElements[2]
    const listCreationDate: string = itemNameElements[3]
    const listTodos: Todo[] = JSON.parse(localStorage.getItem(item) || "[]")

    const listData: TodoList = {
      id: listId,
      listName,
      todos: listTodos,
      creationDate: parseInt(listCreationDate),
    }

    todoLists.push(listData)
  })

  return todoLists
}

function getListCreationDateById(listId: string): number {
  const listItemName: string | undefined = getListNameById(listId)
  let creationDate: number = 0

  if (listItemName) {
    const listCreationDate: string = listItemName.split("/")[3]
    creationDate = parseInt(listCreationDate)
  }

  return creationDate
}

function getListNameById(listId: string): string | undefined {
  return localStorageItems.find((item) => item.startsWith(`todolist/${listId}`))
}

export function addList(): TodoList {
  const newTodoList: TodoList = {
    id: uuidV4(),
    listName: "New List",
    todos: [],
    creationDate: Date.now(),
  }

  localStorage.setItem(
    `todolist/${newTodoList.id}/${newTodoList.listName}/${newTodoList.creationDate}`,
    "[]"
  )
  updateLocalStorageItems()
  return newTodoList
}

export function deleteList(listId: string): TodoList[] {
  const listItemName: string | undefined = getListNameById(listId)

  if (listItemName) {
    localStorage.removeItem(listItemName)
  }

  updateLocalStorageItems()
  const updatedTodoLists: TodoList[] = getLists().sort((a, b) => a.creationDate - b.creationDate)
  return updatedTodoLists
}

export function updateListName(listId: string, newListName: string): void {
  const listItemName: string | undefined = getListNameById(listId)
  const listCreationDate: number = getListCreationDateById(listId)

  if (listItemName) {
    const itemData: Todo[] = JSON.parse(localStorage.getItem(listItemName) || "[]")
    localStorage.removeItem(listItemName)
    localStorage.setItem(
      `todolist/${listId}/${newListName}/${listCreationDate}`,
      JSON.stringify(itemData)
    )
    updateLocalStorageItems()
  }
}

export function getTodosByListId(listId: string): Todo[] {
  let todosList: Todo[] = []

  const listItemName: string | undefined = getListNameById(listId)

  if (!listItemName) return todosList

  todosList = JSON.parse(localStorage.getItem(listItemName) || "[]")

  return todosList
}

export function addTodo(listId: string): Todo | null {
  const newTodoId: string = uuidV4()
  const newTodoName: string = "New Task"

  let newTodoData: Todo = {
    id: newTodoId,
    todoName: newTodoName,
    isDone: false,
  }

  const savedTodos: Todo[] = getTodosByListId(listId)
  savedTodos.push(newTodoData)

  const listItemName: string | undefined = getListNameById(listId)

  if (listItemName) {
    localStorage.setItem(listItemName, JSON.stringify(savedTodos))
  }

  return newTodoData
}

export function deleteTodo(listId: string, todoId: string): Todo[] {
  const storedTodos: Todo[] = getTodosByListId(listId)

  const updatedTodos: Todo[] = storedTodos.filter((todo) => todo.id !== todoId)

  const listItemName: string | undefined = getListNameById(listId)

  if (listItemName) {
    localStorage.setItem(listItemName, JSON.stringify(updatedTodos))
  }

  return updatedTodos
}

export function updateTodoName(listId: string, todoId: string, newTodoName: string): void {
  const listName: string | undefined = getListNameById(listId)

  if (!listName) return

  const savedTodos: Todo[] = JSON.parse(localStorage.getItem(listName) || "[]")

  if (savedTodos.length === 0) return

  const selectedTodoIndex: number = savedTodos.findIndex((todo) => todo.id === todoId)

  if (selectedTodoIndex === -1) return

  savedTodos[selectedTodoIndex].todoName = newTodoName
  localStorage.setItem(listName, JSON.stringify(savedTodos))
}

export function updateTodoStatus(listId: string, todoId: string, status: boolean): boolean | null {
  const listName: string | undefined = getListNameById(listId)

  if (!listName) return null

  const savedTodos: Todo[] = getTodosByListId(listId)

  const selectedTodoIndex: number = savedTodos.findIndex((todo) => todo.id === todoId)

  if (selectedTodoIndex === -1) return null

  savedTodos[selectedTodoIndex].isDone = status
  localStorage.setItem(listName, JSON.stringify(savedTodos))

  return status
}
