import { deleteTodo, editTodo } from "../../lib/TodoFunctions.js";
import { StatusHandler } from "../../lib/ButtonFunctions.js";
import { ModalFunction } from "../Modal/index.js";

const todoCount = document.querySelector(".TodoCount");

export const TodoComponent = (
  section,
  wrapper,
  item,
  i,
  arr,
  addToDOM,
  todoData
) => {
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

  todoStatus.className = item.status
    ? "todoStatus__complete"
    : "todoStatus__default";

  // Card Info
  title.textContent = item.title;
  dueDate.textContent = `Due: ${item.due}`;
  cardDelText.className = "fa-solid fa-trash";

  statusSVG.className = item.status
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

  cardInfo.addEventListener("click", () => {
    ModalFunction(item, todoData, wrapper);
  });

  cardDel.addEventListener("click", () => {
    deleteTodo(addToDOM, todoData, item, i);
    todoCount.textContent = `Remaining Tasks - ${arr.length}`;
  });

  todoStatus.addEventListener("click", (event) => {
    StatusHandler(event, item, statusSVG);
  });

  //? Section Append
  section.appendChild(wrapper);

  todoCount.textContent = `Remaining Tasks - ${arr.length}`;
};
