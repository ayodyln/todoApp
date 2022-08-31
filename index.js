//? Data Array
const myTodos = [
  {
    id: "0",
    title: "First Todo",
    status: false,
    category: ["Example"],
    startDate: new Date(),
    dueDate: (dateOffset) => {
      const date = new Date();
      return date;
    },
  },
];

//? Data Modal
const todoModel = {
  id: "",
  title: "",
  status: false || true,
  category: [],
  dueDate: () => {
    return new Date();
  },
};

//? Functions
const createTodo = () => {};

const createNewCategory = () => {};

const editTodo = () => {};

const editTodoStatus = () => {};

const editTodoCategory = () => {};

const editTodoDate = () => {};

const completeTodo = () => {};

const deleteTodo = () => {};

const deleteTodoCategory = () => {};

//? Function Calls
console.log(myTodos);
