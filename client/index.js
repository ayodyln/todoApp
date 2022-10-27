// import myTodos from "./data/todos.js";
import { getTodoByCategory, getTodos } from "./lib/Todos.js"
import { createTodo, deleteTodo, editStatus } from "./lib/TodoFunctions.js"
import { ModalFunction } from "./UI/Modal/index.js"

export const checkSVG = `<svg class="statusSVG_true"
xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">    <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
<path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
</svg>`
export const circleSVG = `<svg class="statusSVG_false"
xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">    <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
<path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/>
</svg>`

//! DOM Elements
const createTodoBtn = document.querySelector("#submitTodoBtn")
const titleInput = document.querySelector("#todoTitle")
const dateInput = document.querySelector("#todoDate")
const todosSection = document.querySelector("#todoList")
const todoCount = document.querySelector(".TodoCount")
const resetButton = document.querySelector("#RESET")
const clearCompletedBtn = document.querySelector("#CLEAR")
const categoriesSelector = document.querySelector("#categorySelect")

export const addToDOM = async (array, filterCategory) => {
  // Clear Todo' DOM Section
  todosSection.textContent = ""

  // Looping through Todo's array
  // Creating markup and inserting into document.
  array.forEach((todo) => {
    let markup = `<div data-todoid="${
      todo.id
    }" id="card" class="card todoItem" >
      <div class="card-content">
        <div class="CardContent">
          <div>
            <h3>${todo.title}</h3>
            <p>Due ${todo.due}</p>
          </div>
          <p>${todo.category
            .map((el, i) => {
              return `<span class="tag" data-category="${i}">${el}</span>`
            })
            .join(" ")}</p>
        </div>
        </div>
        <div class='cardFooter'>
          <button id="delete" class="delTodoButton"><i class="fa-solid fa-trash"></i></button>

         <div id="status">${todo.status ? checkSVG : circleSVG}</div>
    </div>`

    // Adding markup to DOM
    todosSection.insertAdjacentHTML("beforeend", markup)
  })

  // Displaying Total Todos Remaining.
  todoCount.textContent = `Remaining Todos: ${array.length}`

  // Using event listerner on the parent element. Add checks along the way for UI elements.
  todosSection.addEventListener("click", async (event) => {
    event.stopImmediatePropagation()

    //! Delete Button
    if (event.target.id === "delete") {
      const parentNodeID = event.target.offsetParent.dataset.todoid
      event.stopPropagation()
      deleteTodo(parentNodeID, event.target)
      renderCatgorieOptions(await getTodos())
    }

    // //! Status Button
    if (event.target.id === "status") {
      const parentNodeID = event.target.offsetParent.dataset.todoid
      event.stopPropagation()
      editStatus(parentNodeID, event.target)
    }

    //! Parent Card -> Modal
    if (event.target.id === "card") {
      const parentNodeID = event.target.dataset.todoid * 1
      event.stopPropagation()
      ModalFunction(parentNodeID)
    }
  })

  // Creating Todos
  createTodoBtn.addEventListener("click", async (event) => {
    if (!dateInput.value || !titleInput.value) return

    event.stopPropagation()
    createTodo(titleInput.value, dateInput.value, array)

    titleInput.value = ""
    dateInput.value = ""
  })

  renderCatgorieOptions(array)
}

//? Render To Do's on page Load
const TodoArray = await getTodos()
addToDOM(TodoArray)
renderCatgorieOptions(TodoArray)

//! RESET BUTTON
resetButton.addEventListener("click", async () => {
  //? Resets To Do's Array; Regenerates DOM with addToDom(<array>)
  try {
    const res = await fetch("/resetTodo")
    addToDOM(await res.json())
  } catch (error) {
    console.error(error)
  }

  //? Reset UI Form Inputs
  titleInput.value = ""
  dateInput.value = ""
})

clearCompletedBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("/completeTodos")
    const datum = await res.json()
    addToDOM(datum)
  } catch (error) {
    console.error(error)
  }
})

//
export function renderCatgorieOptions(array) {
  let catgoryOptions = ["All Categories"]
  array.forEach((todo) => {
    catgoryOptions.push(...todo.category)
  })

  categoriesSelector.textContent = ""
  new Set(catgoryOptions).forEach((category) => {
    const optionMarkup = `<option value="${category}">${category}</option>`
    categoriesSelector.insertAdjacentHTML("beforeend", optionMarkup)
  })
}
categoriesSelector.addEventListener("change", async (e) => {
  const optionValue = e.target.value
  console.log(optionValue)

  const todos = await getTodoByCategory(optionValue)
  console.log(todos)

  if (optionValue === "All Categories") {
    addToDOM(await getTodos())
  } else addToDOM(todos)
})
