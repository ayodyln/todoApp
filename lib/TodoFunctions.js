//? Functions
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

export const editTodo = async (todo, userInput) => {
  //* Deconstructing User Todo and userInput
  const { title, status, category, startDate, dueDate } = todo;
  const { titleInput, statusInput, categoryInput, dateInput } = userInput;

  //* Editing Todo, userInput Checked.
  const newTitle = !titleInput ? title : titleInput;
  const newStatus = !statusInput ? status : statusInput;

  // LEFT OFF HERE
  const newDueDate = editTodoDate(dateInput, startDate, dueDate);

  if (categoryInput) category.push(...categoryInput);

  //* Updating Todo
  todo.title = newTitle;
  todo.status = newStatus;
  // todo.dueDate = newDueDate;

  // console.log(todo);
};

const editTodoStatus = () => {};

const editTodoCategory = () => {};

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

const completeTodo = () => {};

const deleteTodo = () => {};

const deleteTodoCategory = () => {};
