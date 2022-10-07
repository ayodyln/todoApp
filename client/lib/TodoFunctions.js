import { addToDOM } from "../index.js";
import myTodos from "../data/todos.js";

const todoModel = {
  id: NaN,
  title: "",
  status: false || true,
  category: ["General"],
  due: "",
};

//! Creeation
export const createTodo = (title, date) => {
  const todo = { ...todoModel };

  todo.id = myTodos.length;
  todo.title = title;
  todo.status = false;
  todo.due = date;

  myTodos.push(todo);
  addToDOM(myTodos);
};

//! Editing
export const editTodo = (todo, { newTitle, newDue }, categories) => {
  todo.title = newTitle === "" ? todo.title : newTitle;
  todo.due = newDue === "" ? todo.due : newDue;
  addToDOM(myTodos);
};

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
