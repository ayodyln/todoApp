import myTodos from "./data/todos.js";
import { StatusHandler } from "./lib/ButtonFunctions.js";

import {
  createNewCategory,
  createTodo,
  deleteTodo,
  deleteTodoCategory,
  editTodo,
} from "./lib/TodoFunctions.js";

//! Data Modal -- DONT EDIT
const todoModel = {
  id: NaN,
  title: "",
  status: false || true,
  category: [],
  startDate: new Date(),
  dueDate: new Date(),
};

//! Logging
// console.log(myTodos);

let todoData = myTodos;
const resetCopy = { ...myTodos };

//? Section
const todosSection = document.querySelector("#todoList");
let wrapper = document.createElement("div");

const addToDOM = (array) => {
  todosSection.innerText = "";
  array.forEach((el, i) => {
    wrapper = document.createElement("div");
    const cardInfo = document.createElement("div");
    const cardActions = document.createElement("div");
    const todoStatus = document.createElement("div");
    const dueDate = document.createElement("p");
    const title = document.createElement("h3");
    const delTodo = document.createElement("button");

    wrapper.className = "card";
    cardInfo.className = "cardInfo";
    cardActions.className = "cardActions";
    delTodo.className = "button";

    todoStatus.className = el.status
      ? "todoStatus__complete"
      : "todoStatus__default";

    // Card Info
    title.textContent = el.title;
    dueDate.textContent = `Due: ${el.dueDate}`;

    cardInfo.appendChild(title);
    cardInfo.appendChild(dueDate);

    //? Card Append
    wrapper.appendChild(cardInfo);
    // wrapper.appendChild(cardActions);
    wrapper.appendChild(todoStatus);

    todoStatus.addEventListener("click", (event) => {
      StatusHandler(event, el);
    });

    //? Section Append
    todosSection.appendChild(wrapper);
  });
};
addToDOM(todoData);

//? Button Binding
const createTodoButton = document.querySelector("#createTodoBtn");
const createCategoryButton = document.querySelector("#createNewCategory");
const editTodoButton = document.querySelector("#editTodo");
const deleteTodoButton = document.querySelector("#delTodoButton");
const deleteTodoCategories = document.querySelector("#deleteCategoriesButton");
const resetButton = document.querySelector("#RESET");

createTodoButton.addEventListener("click", async () => {
  await createTodo(myTodos, todoModel, {
    title: "Hello JS World",
  });
  console.log(myTodos);
  addToDOM(todoData);
});

createCategoryButton.addEventListener("click", async () => {
  await createNewCategory(myTodos[1], ["Test", "Oof"]);
  console.log(myTodos);
});

editTodoButton.addEventListener("click", async () => {
  await editTodo(myTodos[1], {
    titleInput: "foo",
    statusInput: true,
    dateInput: 5000,
    categoryInput: ["general", "school"],
  });
  // console.log(myTodos);
  addToDOM(todoData);
});

deleteTodoButton.addEventListener("click", (event) => {
  deleteTodo(myTodos, myTodos[1]);
  console.log(myTodos);
  addToDOM(todoData);
});

deleteTodoCategories.addEventListener("click", () => {
  const data = deleteTodoCategory(myTodos[1]);
  console.log(myTodos);
});

//! RESET BUTTON
resetButton.addEventListener("click", () => {
  todoData.splice(0);
  addToDOM(todoData);
});

///
