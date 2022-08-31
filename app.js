import myTodos from "./data/todos.js";

import {
  createNewCategory,
  createTodo,
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

//TODO:

//? Function Calls
// await createTodo(myTodos, todoModel, { title: "Hello World" });
// await createNewCategory(myTodos[2]);
// await editTodo(myTodos[2], {
//   // titleInput: "New Title",
//   statusInput: true,
//   categoryInput: ["general", "school"],
//   // dateInput: 50000,
// });

//! Logging
console.log(myTodos);

//? Section

//? Button Binding
const createTodoButton = document.querySelector("#createTodoBtn");
const createCategoryButton = document.querySelector("#createNewCategory");
const editTodoButton = document.querySelector("#editTodo");

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
  });
  console.log(myTodos);
});
