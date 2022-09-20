import myTodos from "./data/todos.js";
import todoModel from "./data/DataModal.js";
import { createTodo } from "./lib/TodoFunctions.js";

import { TodoComponent } from "./UI/Todo/index.js";

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

const addToDOM = (array) => {
  todosSection.textContent = "";
  array.forEach((el, i, arr) => {
    const wrapper = document.createElement("div");
    TodoComponent(todosSection, wrapper, el, i, todoData, addToDOM, todoData);
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
