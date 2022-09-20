//? Functions

//! Creeation
export const createTodo = async (todoArray, dataModal, userInput) => {
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

export const editTodo = async (todo, userInput, func, arr) => {
  //* Deconstructing User Todo and userInput
  const { title, status, category, startDate, dueDate } = todo;
  const { titleInput, statusInput, categoryInput, dateInput } = userInput;

  //* Editing Todo, userInput Checked.
  const newTitle = !titleInput ? title : titleInput;
  const newStatus = editTodoStatus(statusInput, status);

  // LEFT OFF HERE
  const newDueDate = editTodoDate(dateInput, startDate, dueDate);

  // Checking for new categories and pushing them. If present
  if (categoryInput) editTodoCategory(category, categoryInput);

  //* Updating Todo
  todo.title = newTitle;
  todo.status = newStatus;
  todo.dueDate = newDueDate;

  console.log(todo);

  func(arr);
};

const editTodoStatus = (statusInput, status) =>
  !statusInput ? status : statusInput;

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

export const deleteTodo = (func, array, todo, index) => {
  console.log(todo);
  array.splice(index, 1);
  func(array);
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
