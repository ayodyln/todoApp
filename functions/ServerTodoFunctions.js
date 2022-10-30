const Todo = require("../schema/Todo")

const getTodos = async () => {
  try {
    return await Todo.find()
  } catch (error) {
    console.error(error)
  }
}

// Create ToDo
const createTodo = async (todo) => {
  const newTodo = new Todo(todo)

  await newTodo
    .save()
    .then((doc) => {
      // console.log(doc)
      console.log("Todo Saved to Database")
    })
    .catch((err) => console.log(err))

  const todos = await getTodos()
  return todos
}

const deleteSingleTodo = async (id) => {
  try {
    await Todo.deleteOne({ _id: id })
    return await getTodos()
  } catch (error) {
    console.error(error)
  }
}

const deleteTodos = async () => {
  try {
    const res = await Todo.deleteMany()
    console.log(res)
    // return empty array for DOM
    return []
  } catch (error) {
    console.error(error)
  }
}

const editTodo = async (id, userInput) => {
  const { title, due } = await findTodoByID(id)

  try {
    await Todo.updateOne(
      { _id: id },
      {
        title: userInput.title === "" ? title : userInput.title,
        due: userInput.due === "" ? due : userInput.due,
      }
    )

    return await getTodos()
  } catch (error) {
    console.error(error)
  }
}

const editTodoStatus = async (id) => {
  try {
    const todo = await findTodoByID(id)

    if (todo.status) {
      await Todo.updateOne({ _id: id }, { status: false })
      return false
    }

    if (!todo.status) {
      await Todo.updateOne({ _id: id }, { status: true })
      return true
    }
  } catch (error) {
    console.error(error)
  }
}

const findTodoByID = async (id) => {
  try {
    const todo = await Todo.findById(id).exec()
    return todo
  } catch (error) {
    console.error(error)
  }
}

const getUncompleted = async () => {
  try {
    await Todo.deleteMany({ status: true })
    return await getTodos()
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  createTodo,
  deleteSingleTodo,
  deleteTodos,
  editTodo,
  editTodoStatus,
  findTodoByID,
  getTodos,
  getUncompleted,
}
