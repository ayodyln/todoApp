import myTodos from "./data/todos.js";
import { createTodo, deleteTodo, editStatus } from "./lib/TodoFunctions.js";
import { ModalFunction } from "./UI/Modal/index.js";

//! DOM Elements
const createTodoBtn = document.querySelector("#submitTodoBtn");
const titleInput = document.querySelector("#todoTitle");
const dateInput = document.querySelector("#todoDate");
const todosSection = document.querySelector("#todoList");
const todoCount = document.querySelector(".TodoCount");
const resetButton = document.querySelector("#RESET");

// Fetching Local Server API Data
const getTodos = async () => {
  try {
    const res = await fetch("/todos");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
// const todos = await getTodos();

export const addToDOM = (array) => {
  // Clear Todo' DOM Section
  todosSection.textContent = "";

  // Looping through Todo's array
  // Creating markup and inserting into document.
  array.forEach((todo) => {
    const todoStatus = todo.status
      ? "todoStatus__complete"
      : "todoStatus__default";
    const statusFeedback = todo.status
      ? "fa-solid fa-check"
      : "fa-regular fa-circle";

    let markup = `<div data-todoid="${
      todo.id
    }" id="card" class="card todoItem" >
      <div class="card-content">
        <div class="content">
          <h3>${todo.title}</h3>
          <p>Due ${todo.due}</p>
          <p>${todo.category
            .map((el, i) => {
              return `<span class="tag" data-category="${i}">${el}</span>`;
            })
            .join(" ")}</p>
        </div>
        </div>
        <div class='cardFooter'>
          <button id="delete" class="delTodoButton"><i class="fa-solid fa-trash"></i></button>
          <div id="status" class="status ${todoStatus}"><i class="${statusFeedback}"></i></div> 
        </div>
    </div>`;

    // Adding markup to DOM
    todosSection.insertAdjacentHTML("beforeend", markup);
  });

  // Displaying Total Todos Remaining.
  todoCount.textContent = `Remaining Todos: ${array.length}`;

  // Using event listerner on the parent element. Add checks along the way for UI elements.
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

  // Creating Todos
  createTodoBtn.addEventListener("click", () => {
    if (!dateInput.value || !titleInput.value) return;

    createTodo(titleInput.value, dateInput.value);

    addToDOM(myTodos);
    titleInput.value = "";
    dateInput.value = "";
  });
};

//? Render To Do's on page Load
addToDOM(myTodos);

//! RESET BUTTON
resetButton.addEventListener("click", () => {
  //? Resets To Do's Array; Regenerates DOM with addToDom(<array>)
  myTodos.splice(0, myTodos.length);
  addToDOM(myTodos);

  //? Reset UI Form Inputs
  titleInput.value = "";
  dateInput.value = "";
});
