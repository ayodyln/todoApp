//! Data Modal -- DONT EDIT
const todoModel = {
  id: NaN,
  title: "",
  status: false || true,
  category: [],
  due: "",
  genDate: (offset, input) => {
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
  },
};

export default todoModel