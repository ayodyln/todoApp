import myTodos from "./data/todos.js";

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
const addToDOM = (array) => {
  todosSection.innerText = "";
  array.forEach((el, i, arr) => {
    const wrapper = document.createElement("div");
    wrapper.className = "card";

    const cardInfo = document.createElement("div");
    cardInfo.className = "cardInfo";

    const cardActions = document.createElement("div");
    cardActions.className = "cardActions";

    // Card Info
    const title = document.createElement("h3");
    title.textContent = el.title;
    const dueDate = document.createElement("p");
    dueDate.textContent = `Due: ${el.dueDate}`;
    cardInfo.appendChild(title).appendChild(dueDate);

    // cardActions
    const editTodo = document.createElement("button");
    const completeTodo = document.createElement("button");
    const delTodo = document.createElement("button");

    // Card Append
    wrapper.appendChild(cardInfo).appendChild(cardActions);

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
