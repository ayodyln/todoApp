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
console.log(myTodos);

//? Section
const todosSection = document.querySelector("#todoList");

//? Button Binding
const createTodoButton = document.querySelector("#createTodoBtn");
const createCategoryButton = document.querySelector("#createNewCategory");
const editTodoButton = document.querySelector("#editTodo");
const deleteTodoButton = document.querySelector("#delTodoButton");
const deleteTodoCategories = document.querySelector("#deleteCategoriesButton");

createTodoButton.addEventListener("click", async () => {
  await createTodo(myTodos, todoModel, {
    title: "Hello JS World",
  });
  console.log(myTodos);
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
});

deleteTodoButton.addEventListener("click", (event) => {
  deleteTodo(myTodos, myTodos[1]);
  console.log(myTodos);
});

deleteTodoCategories.addEventListener("click", () => {
  const data = deleteTodoCategory(myTodos[1]);
  console.log(myTodos);
});
