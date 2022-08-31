//? Functions

//! Creeation
export const createTodo = async (todoArray, dataModal, userInput) => {
  //* Cloning Data Modal
  const newTodo = { ...dataModal };

  //* Deconstructing User Input
  let title;
  if (userInput) title = userInput.title;
  else title = "";

  //* Appending new Data
  newTodo.id = todoArray.length;
  newTodo.status = false;
  newTodo.title = title;

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

export const editTodo = async (todo, userInput) => {
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
};

const editTodoStatus = (statusInput, status) =>
  !statusInput ? status : statusInput;


//? Create funciton useful
const editTodoCategory = (category, categoryInput) =>
  category.push(...categoryInput);

const editTodoDate = (userInput, startDate, dueDate) => {
  if (userInput) {
    const date = new Date(dueDate);
    const ts = date.getTime();
    //* Thanks MDN Docs <3
    date.setTime(ts + userInput * 60 * 1000);
    return date;
  }

  return dueDate;
};

//! Complete Todo

export const completeTodo = (todo) => (todo.status = true);

//! Delete

export const deleteTodo = (todoArray, todo) => {
  todoArray.splice(1);
};

export const deleteTodoCategory = (todo) => {
  const { category } = todo;
  category.splice(0);

  return category;
};
