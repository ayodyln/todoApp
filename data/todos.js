//? Data Array
const myTodos = [
  {
    id: 0,
    title: "Todo Example #1",
    status: true,
    category: ["Example"],
    due: "9-18-2022",
    genDate: (offset = 60000, input) => {
      if (!offset) {
        const d = new Date(input);
        return `${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`;
      }

      const date = new Date();
      // JS Dates are confusing to me. So, this is from Stack Overflow.
      // I'm creating a new Date object and adding 50,000 minutes then times it by 60000 to convert
      // minutes to miliseconds.
      const dueDate = new Date(date.getTime() + offset * 60000);

      return `${dueDate.getMonth()}-${dueDate.getDate()}-${dueDate.getFullYear()}`;
    },
  },
  {
    id: 1,
    title: "Todo Example #2",
    status: false,
    category: ["Example"],
    due: "9-25-2022",
    genDate: (offset = 50000, input) => {
      if (!offset) {
        const d = new Date(input);
        return `${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`;
      }

      const date = new Date();
      // JS Dates are confusing to me. So, this is from Stack Overflow.
      // I'm creating a new Date object and adding 50,000 minutes then times it by 60000 to convert
      // minutes to miliseconds.
      const dueDate = new Date(date.getTime() + offset * 60000);

      return `${dueDate.getMonth()}-${dueDate.getDate()}-${dueDate.getFullYear()}`;
    },
  },
];

export default myTodos;
