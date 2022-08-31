//? Functions
export const createTodo = async (todoArray, dataModal, userInput) => {
  //* Cloning Data Modal
  const newTodo = { ...dataModal };

  //* Deconstructing User Input
  const { title } = userInput;

  //* Appending new Data
  newTodo.id = 2;
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
  category.push(newCategory);
};

export const editTodo = async (todo, userInput) => {
  //* Deconstructing User Todo and userInput
  const { title, status, category, startDate, dueDate } = todo;
  const {
    titleInput,
    statusInput,
    categoryInput,
    dateInput = 50000,
  } = userInput;

  //* Editing Todo, userInput Checked.
  const newTitle = !titleInput ? title : titleInput;
  const newStatus = !statusInput ? status : statusInput;

  // LEFT OFF HERE>
  const newDueDate = editTodoDate(dateInput, startDate, dueDate);
  console.log(newDueDate);
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
  const date = new Date(dueDate);
  const t = date.getTime();
  // THANKS MDN DOCS <3
  date.setTime(t + userInput * 60 * 1000);
  return date;
};

const completeTodo = () => {};

const deleteTodo = () => {};

const deleteTodoCategory = () => {};
