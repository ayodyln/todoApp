import { addToDOM } from "../index.js";
import myTodos from "../data/todos.js";

//! Creeation
export const createTodo = (todoArray, dataModal, userInput) => {
  //* Cloning Data Modal
  const newTodo = { ...dataModal };

  //* Deconstructing User Input
  let title;
  if (userInput) title = userInput.title;
  else title = "";

  const offsetDate = new Date(userInput.date);

  //* Appending new Data
  newTodo.id = todoArray.length;
  newTodo.status = false;
  newTodo.title = title;
  newTodo.due = userInput.date ? genDate(false, offsetDate) : genDate(true);

  //* Adding to Data Array
  todoArray.push(newTodo);
};

export const createNewCategory = async (todo, userInput) => {
  //* Grabbing a Todo's Catagory Array
  const { category } = todo;

  //* Checking for user input, if input => added user created category. Else, add 'general' tag.
  const newCategory = !userInput ? "general" : userInput;

  //* Pushing Category to Todos category data point.
  category.push(...newCategory);
};

//! Editing

export const editTodo = async (todo, { newTitle, newDue, newCategories }) => {
  //* Editing Todo, userInput Checked.
  if (newTitle !== "" || newDue !== "" || newCategories.length !== 0) {
    console.log(
      newTitle === "" ? null : newTitle,
      newDue === "" ? null : newDue
    );

    // Edit Todo is making my object become undefined?
    todo.title = newTitle !== "" ? newTitle : todo.title;
    todo.due = newDue !== "" ? newDue : todo.due;

    todo.category = newCategories.length > 0 ? [...newCategories] : [];
  } else {
    console.log("No Input");
  }

  addToDOM(myTodos);
};

const editTodoStatus = (statusInput, status) =>
  !statusInput ? status : statusInput;

export const editStatus = (id, element) => {
  myTodos.forEach((todo) => {
    if (todo.id === id * 1) {
      todo.status = todo.status ? false : true;
      if (element.classList.contains("todoStatus__complete")) {
        element.classList.remove("todoStatus__complete");
        element.classList.add("todoStatus__default");
      } else if (element.classList.contains("todoStatus__default")) {
        element.classList.remove("todoStatus__default");
        element.classList.add("todoStatus__complete");
      }
    }
  });
  addToDOM(myTodos);
};

//? Create funciton useful
const editTodoCategory = (category, categoryInput) =>
  category.push(...categoryInput);

const editTodoDate = (userInput, startDate, dueDate) => {
  if (userInput) {
    console.log(userInput);
    const date = new Date(dueDate);
    console.log(date);
    const ts = date.getTime();
    //* Thanks MDN Docs <3
    date.setTime(ts + userInput * 60 * 1000);
    console.log(date);
    return date;
  } else return dueDate;
};

//! Complete Todo

export const completeTodo = (todo) => (todo.status = true);

//! Delete

export const deleteTodo = (index) => {
  myTodos.forEach((todo, i) => {
    if (todo.id === index * 1) {
      myTodos.splice(i, 1);
    }
  });

  addToDOM(myTodos);
};

export const deleteTodoCategory = (todo) => {
  const { category } = todo;
  category.splice(0);
  return category;
};

const genDate = (offset, input) => {
  if (!offset) {
    const _ = new Date(input);
    return `${_.getMonth()}-${_.getDate()}-${_.getFullYear()}`;
  }

  const date = new Date();
  // JS Dates are confusing to me. So, this is from Stack Overflow.
  // I'm creating a new Date object and adding 50,000 minutes then times it by 60000 to convert
  // minutes to miliseconds.
  const dueDate = new Date(date.getTime() + offset * 60000);
  return `${dueDate.getMonth()}-${dueDate.getDate()}-${dueDate.getFullYear()}`;
};
