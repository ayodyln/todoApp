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

//? Function Calls
await createTodo(myTodos, todoModel, { title: "Hello World" });
await createNewCategory(myTodos[2]);
await editTodo(myTodos[2], {
  titleInput: "New Title",
  statusInput: true,
  categoryInput: ["general", "school"],
});

//! Logging
// console.log(myTodos);
