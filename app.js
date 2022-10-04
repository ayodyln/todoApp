import myTodos from "./data/todos.js";
import todoModel from "./data/DataModal.js";
import {
  createNewCategory,
  createTodo,
  deleteTodo,
  editStatus,
} from "./lib/TodoFunctions.js";

import { TodoComponent } from "./UI/Todo/index.js";
import { ModalFunction } from "./UI/Modal/index.js";

let todoData = [...myTodos];

//! Create New Todo
const createTodoBtn = document.querySelector("#submitTodoBtn");
const titleInput = document.querySelector("#todoTitle");
const dateInput = document.querySelector("#todoDate");

createTodoBtn.addEventListener("click", () => {
  if (!titleInput.value && !dateInput.value) return;

  createTodo(todoData, todoModel, {
    title: titleInput.value,
    date: dateInput.value,
  });

  addToDOM(todoData);

  titleInput.value = "";
  dateInput.value = "";
});

//? Section
const todosSection = document.querySelector("#todoList");
const todoCount = document.querySelector(".TodoCount");

const addToDOM = (array) => {
  todosSection.textContent = "";

  array.forEach((todo) => {
    const todoStatus = todo.status
      ? "todoStatus__complete"
      : "todoStatus__default";
    const statusFeedback = todo.status
      ? "fa-solid fa-check"
      : "fa-regular fa-circle";

    let markup = `<div data-todoid="${todo.id}" class="card todoItem" >
      <div class="card-content">
        <div class="content">
          <h3>${todo.title}</h3>
          <p>Due ${todo.due}</p>
        </div>
        </div>
        <div class='cardFooter'>
          <button class="delTodoButton"><i class="fa-solid fa-trash"></i></button>
          <div class="status ${todoStatus}"><i class="${statusFeedback}"></i></div> 
        </div>
    </div>`;

    todosSection.insertAdjacentHTML("beforeend", markup);
  });

  //! Add event listner for the todo container
  todosSection.addEventListener("click", async (event) => {
    //! Delete Button
    if (event.target.className === "delTodoButton") {
      const parentNodeID = event.target.offsetParent?.dataset.todoid;
      deleteTodo(addToDOM, array, parentNodeID);
      return;
    }

    //! Status Button
    if (event.target.classList.contains("status")) {
      const parentNodeID = event.target.offsetParent?.dataset.todoid;
      editStatus(addToDOM, array, parentNodeID, event.target);
      return;
    }

    //! Parent Card -> Modal
    if (event.target.classList.contains("card")) {
      console.log(event.target);

      const itemData = array.filter(
        (el) => el.id === event.target.dataset.todoid * 1
      )[0];

      console.log(itemData);
      ModalFunction(itemData);
      return;
    }
  });
};
addToDOM(todoData);

// //? Button Binding
const resetButton = document.querySelector("#RESET");
//! RESET BUTTON
resetButton.addEventListener("click", () => {
  // everyhting i tried doesn't work and freezez the browser.
  titleInput.value = "";
  dateInput.value = "";
});
