import myTodos from "./data/todos.js";
import todoModel from "./data/DataModal.js";
import {
  createNewCategory,
  createTodo,
  deleteTodo,
  editStatus,
} from "./lib/TodoFunctions.js";

import { ModalFunction } from "./UI/Modal/index.js";

//! Create New Todo
const createTodoBtn = document.querySelector("#submitTodoBtn");
const titleInput = document.querySelector("#todoTitle");
const dateInput = document.querySelector("#todoDate");

//? Section
const todosSection = document.querySelector("#todoList");
const todoCount = document.querySelector(".TodoCount");
const resetButton = document.querySelector("#RESET");

export const addToDOM = (array) => {
  todosSection.textContent = "";

  array.forEach((todo) => {
    const todoStatus = todo.status
      ? "todoStatus__complete"
      : "todoStatus__default";
    const statusFeedback = todo.status
      ? "fa-solid fa-check"
      : "fa-regular fa-circle";

    let markup = `<div data-todoid="${todo.id}" id="card" class="card todoItem" >
      <div class="card-content">
        <div class="content">
          <h3>${todo.title}</h3>
          <p>Due ${todo.due}</p>
        </div>
        </div>
        <div class='cardFooter'>
          <button id="delete" class="delTodoButton"><i class="fa-solid fa-trash"></i></button>
          <div id="status" class="status ${todoStatus}"><i class="${statusFeedback}"></i></div> 
        </div>
    </div>`;

    todosSection.insertAdjacentHTML("beforeend", markup);
  });

  //! Add event listner for the todo container
  todosSection.addEventListener("click", (event) => {
    //! Delete Button
    if (event.target.id === "delete") {
      const parentNodeID = event.target.offsetParent?.dataset.todoid;
      deleteTodo(parentNodeID);
    }

    //! Status Button
    if (event.target.id === "status") {
      const parentNodeID = event.target.offsetParent?.dataset.todoid;
      editStatus(parentNodeID, event.target);
    }

    //! Parent Card -> Modal
    if (event.target.id === "card") {
      const parentNodeID = event.target.dataset.todoid * 1;
      ModalFunction(parentNodeID);
    }
  });

  createTodoBtn.addEventListener("click", () => {
    if (!titleInput.value && !dateInput.value) return;

    createTodo(myTodos, todoModel, {
      title: titleInput.value,
      date: dateInput.value,
    });

    addToDOM(myTodos);

    titleInput.value = "";
    dateInput.value = "";
  });
};

addToDOM(myTodos);

//! RESET BUTTON
resetButton.addEventListener("click", () => {
  myTodos.splice(0, myTodos.length);
  addToDOM(myTodos);

  titleInput.value = "";
  dateInput.value = "";
});

// Fetching Local Server API Data
// const getTodos = async () => {
//   try {
//     const res = await fetch("/todos");
//     return await res.json();
//   } catch (error) {
//     console.error(error);
//   }
// };
// const todos = await getTodos();
