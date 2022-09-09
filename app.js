import myTodos from "./data/todos.js";
import { StatusHandler } from "./lib/ButtonFunctions.js";
console.log(myTodos);
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

  console.log(todoData);
  addToDOM(todoData);

  titleInput.value = "";
  dateInput.value = "";
});

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
    const statusSVG = document.createElement("i");
    const title = document.createElement("h3");
    const dueDate = document.createElement("p");
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
    dueDate.textContent = `Due: ${el.dueDate()}`;

    statusSVG.className = el.status
      ? "fa-solid fa-check"
      : "fa-regular fa-circle";
    cardInfo.appendChild(title);
    cardInfo.appendChild(dueDate);

    todoStatus.appendChild(statusSVG);

    //? Card Append
    wrapper.appendChild(cardInfo);
    // wrapper.appendChild(cardActions);
    wrapper.appendChild(todoStatus);

    cardInfo.addEventListener("click", (event) => {
      console.log(el);
      const newTitle = window.prompt("New Todo Title");
      editTodo(el, { titleInput: newTitle }, addToDOM, todoData);
    });

    todoStatus.addEventListener("click", (event) => {
      StatusHandler(event, el, statusSVG);
    });

    //? Section Append
    todosSection.appendChild(wrapper);
  });
};
addToDOM(todoData);

//? Button Binding
const createCategoryButton = document.querySelector("#createNewCategory");
const editTodoButton = document.querySelector("#editTodo");
const deleteTodoButton = document.querySelector("#delTodoButton");
const deleteTodoCategories = document.querySelector("#deleteCategoriesButton");
const resetButton = document.querySelector("#RESET");

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
  todoData.length = 0;
  myTodos.forEach((el) => todoData.push(el));
  addToDOM(myTodos);
});
