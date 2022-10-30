import {
  addToDOM,
  checkSVG,
  circleSVG,
  renderCatgorieOptions,
} from "../index.js"
import {
  getTodos,
  newTodo,
  updateTodoStatus,
  delTodo,
  updateTodo,
} from "./Todos.js"

//! Creeation
export const createTodo = async (title, date, array) => {
  const todoModel = new Object({
    title: title,
    status: false,
    due: date,
    category: ["General"],
  })

  const todoData = await newTodo(todoModel)

  addToDOM(todoData)
}

//! Editing
export const editTodo = async (todo, input) => {
  await updateTodo(todo, input)
  const todos = await getTodos()
  renderCatgorieOptions(todos)
  addToDOM(todos)
  return todos
}

export const editStatus = async (id, element) => {
  const todo = await updateTodoStatus(id)
  element.textContent = ""
  const text = todo ? checkSVG : circleSVG
  element.insertAdjacentHTML("afterbegin", text)
}

//! Delete
export const deleteTodo = async (index) => {
  const res = await delTodo(index)
  await addToDOM(res)
}
