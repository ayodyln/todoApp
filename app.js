import myTodos from "./data/todos.js";
import todoModel from "./data/DataModal.js";
import { StatusHandler } from "./lib/ButtonFunctions.js";
import {
  createNewCategory,
  createTodo,
  deleteTodo,
  deleteTodoCategory,
  editTodo,
} from "./lib/TodoFunctions.js";

let todoData = [...myTodos];

//! Create New Todo
const createTodoBtn = document.querySelector("#submitTodoBtn");
const titleInput = document.querySelector("#todoTitle");
const dateInput = document.querySelector("#todoDate");
const todoCount = document.querySelector(".TodoCount");

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
let wrapper = document.createElement("div");

const addToDOM = (array) => {
  todosSection.innerText = "";
  array.forEach((el, i, arr) => {
    wrapper = document.createElement("div");
    const cardInfo = document.createElement("div");
    const cardDel = document.createElement("button");
    const cardDelText = document.createElement("i");
    const cardActions = document.createElement("div");
    const todoStatus = document.createElement("div");
    const statusSVG = document.createElement("i");
    const title = document.createElement("h3");
    const dueDate = document.createElement("p");
    const delTodo = document.createElement("button");

    wrapper.className = "card";
    cardInfo.className = "cardInfo";
    cardDel.className = "delTodoButton";
    cardActions.className = "cardActions";
    delTodo.className = "button";

    todoStatus.className = el.status
      ? "todoStatus__complete"
      : "todoStatus__default";

    // Card Info
    title.textContent = el.title;
    dueDate.textContent = `Due: ${el.due}`;
    cardDelText.className = "fa-solid fa-trash";

    statusSVG.className = el.status
      ? "fa-solid fa-check"
      : "fa-regular fa-circle";
    cardInfo.appendChild(title);
    cardInfo.appendChild(dueDate);

    todoStatus.appendChild(statusSVG);
    cardDel.appendChild(cardDelText);

    //? Card Append
    wrapper.appendChild(cardInfo);
    wrapper.appendChild(cardDel);
    wrapper.appendChild(todoStatus);

    cardInfo.addEventListener("click", (event) => {
      const newTitle = window.prompt("New Todo Title");
      const newDate = window.prompt("New To Do Date: ");
      editTodo(
        el,
        { titleInput: newTitle, dateInput: newDate },
        addToDOM,
        todoData
      );
    });

    cardDel.addEventListener("click", () => {
      deleteTodo(addToDOM, todoData, el, i);
    });

    todoStatus.addEventListener("click", (event) => {
      StatusHandler(event, el, statusSVG);
    });

    //? Section Append
    todosSection.appendChild(wrapper);

    todoCount.textContent = `Remaining Tasks - ${arr.length}`;
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
