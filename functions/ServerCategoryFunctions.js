const Todo = require("../schema/Todo")
const { findTodoByID } = require("./ServerTodoFunctions")

const getCategoriesByID = async (id) => {
  try {
    const todo = await findTodoByID(id)
    return todo.category
  } catch (error) {
    console.error(error)
  }
}

const getTodosByCategory = async (category) => {
  try {
    const todos = await Todo.find()
    return todos.filter((todo) => todo.category.includes(category))
  } catch (error) {
    console.error(error)
  }
}

const createCategory = async (id, categories) => {
  try {
    await Todo.updateOne({ _id: id }, { $push: { category: categories } })
    const todo = await findTodoByID(id)
    return todo.category
  } catch (error) {
    console.error(error)
  }
}

const deleteCategory = async (id, categoryIndex) => {
  try {
    const todo = await findTodoByID(id)
    const newCategories = todo.category.filter((cat, i) => i !== categoryIndex)
    await Todo.updateOne({ _id: id }, { category: newCategories })
    const returnTodo = await findTodoByID(id)

    return returnTodo.category
  } catch (error) {
    console.error(error)
  }
}

const UpdateCategory = async (id, categoryIndex, category) => {
  const todo = await findTodoByID(id)
  const old = [...todo.category]
  try {
    todo.category[categoryIndex] = category
    const status = await Todo.updateOne(
      { _id: id },
      { category: todo.category }
    )

    return {
      oldCategories: old,
      categories: todo.category,
      UpdateStatus: status.acknowledged,
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getCategoriesByID,
  getTodosByCategory,
  createCategory,
  deleteCategory,
  UpdateCategory,
}
