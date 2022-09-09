//? Data Array
const myTodos = [
  {
    id: 0,
    title: "Todo Example #1",
    status: true,
    category: ["Example"],
    startDate: new Date(),
    dueDate: () => {
      const date = new Date();
      return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    },
  },
  {
    id: 1,
    title: "Todo Example #2",
    status: false,
    category: ["Example"],
    startDate: new Date(),
    dueDate: () => {
      const dueDate = new Date();
      const ts = dueDate.getTime() / 1000 + 500000;
      const date = new Date(ts);
      date.setTime
      return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    },
  },
];

export default myTodos;
