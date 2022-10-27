import { addToDOM, renderCatgorieOptions } from "../../index.js"
import { editTodo } from "../../lib/TodoFunctions.js"
import {
  createCategory,
  deleteCategory,
  getCategories,
  getTodo,
  getTodos,
} from "../../lib/Todos.js"

const main = document.querySelector("main")
const modal = document.querySelector(".modal")
const modalBackground = document.querySelector(".modal-background")

// Child Elements
const Title = document.querySelector(".modal-card-title")
const DueDate = document.querySelector(".dueDate")

const TitleInput = document.querySelector("#titleInput")
const DateInput = document.querySelector("#dateInput")
const CategoriesInput = document.querySelector("#categoriesInput")
CategoriesInput.value = ""
const CategoriesBtn = document.querySelector("#categoriesBtn")
const CategoryList = document.querySelector(".CategoryList")

const closeButton = document.querySelector("#closeBtn")
const submitButton = document.querySelector("#submit")

export const ModalFunction = async (todoID) => {
  //! Displaying Bulma Modal
  modal.classList.add("is-active")

  //? Getting Todo Data
  const input = new Object()
  const myTodo = await getTodo(todoID)
  const categories = await getCategories(todoID)

  //? Updating Modal DOM
  Title.textContent = myTodo.title
  DueDate.textContent = myTodo.due
  TitleInput.placeholder = myTodo.title
  categories.forEach((category, index) => {
    let tagMarkup = `<span class="tag" data-category="${index}">${category}<button id="tagDelete" class="delete" /></span>`
    CategoryList.insertAdjacentHTML("beforeend", tagMarkup)
  })
  CategoryList.addEventListener("click", async (event) => {
    // event.stopImmediatePropagation();
    if (event.target.id === "tagDelete") {
      event.stopPropagation()
      const categoryID = event.target.parentElement.dataset.category * 1
      CategoryList.childNodes.forEach((node, index) => {
        if (index === categoryID) node.remove()
      })
      const categoryRes = await deleteCategory(categoryID, todoID)
    }
  })

  //? Events
  closeButton.addEventListener("click", ModalReset)
  modalBackground.addEventListener("click", ModalReset)
  CategoriesBtn.addEventListener("click", async (event) => {
    event.stopImmediatePropagation()
    if (CategoriesInput.value === "") return
    await createCategory(myTodo.id, CategoriesInput.value)
    await renderCategoryTags(todoID)
    CategoriesInput.value = ""
  })
  submitButton.addEventListener("click", async (event) => {
    event.stopPropagation()
    input.title = TitleInput.value
    input.due = DateInput.value

    await editTodo(myTodo.id, input)

    addToDOM(await getTodos())

    ModalReset()
  })
}

function ModalReset() {
  Title.textContent = ""
  DueDate.textContent = ""
  CategoryList.textContent = ""
  TitleInput.value = ""
  DateInput.value = ""
  CategoriesInput.value = ""
  CategoriesInput.textContent = ""

  modal.classList.remove("is-active")
}

const renderCategoryTags = async (todoID) => {
  CategoryList.textContent = ""
  const cat = await getCategories(todoID)
  cat.forEach((category, index) => {
    let tagMarkup = `<span class="tag" data-category="${index}">${category}<button id="tagDelete" class="delete" /></span>`
    CategoryList.insertAdjacentHTML("beforeend", tagMarkup)
  })
}
