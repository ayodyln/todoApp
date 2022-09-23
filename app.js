import myTodos from "./data/todos.js";
import todoModel from "./data/DataModal.js";
import { createTodo, deleteTodo } from "./lib/TodoFunctions.js";

import { TodoComponent } from "./UI/Todo/index.js";
import { ModalFunction } from "./UI/Modal/index.js";

let todoData = [...myTodos];

//! Create New Todo
const createTodoBtn = document.querySelector("#submitTodoBtn");
const titleInput = document.querySelector("#todoTitle");
const dateInput = document.querySelector("#todoDate");

createTodoBtn.addEventListener("click", async () => {
  if (!titleInput.value && !dateInput.value) return;

  await createTodo(todoData, todoModel, {
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
  // array.forEach((el, i, arr) => {
  //   const wrapper = document.createElement("div");
  //   TodoComponent(todosSection, wrapper, el, i, todoData, addToDOM, todoData);
  // });

  array.forEach((todo) => {
    let todoStatus = todo.status
      ? "todoStatus__complete"
      : "todoStatus__default";

    let markup = `<div class="card" data-id="${todo.id}">
      <div class="card-content">
        <div class="content">
          <h3>${todo.title}</h3>
          <p>Due ${todo.due}</p>
        </div>
      </div>
      <div class='card-footer'>
        <button class="delTodoButton"><i class="fa-solid fa-trash"></i></button>
        <div class="${todoStatus}"><i class="fa-solid fa-check"></i></div> 
      </div>
    </div>`;

    todosSection.insertAdjacentHTML("beforeend", markup);
  });
};
addToDOM(todoData);

// //? Button Binding
const resetButton = document.querySelector("#RESET");

//! RESET BUTTON
resetButton.addEventListener("click", () => {
  todoData.length = 0;
  myTodos.forEach((el) => todoData.push(el));
  addToDOM(myTodos);
  titleInput.value = "";
  dateInput.value = "";
});

document.querySelector(".card").addEventListener("click", (event) => {
  const cardID = event.target.dataset.id * 1;
  ModalFunction(todoData[cardID], todoData);
});
