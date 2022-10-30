require("dotenv").config()
const mongoose = require("mongoose")
const uri = `mongodb+srv://node_user:${process.env.MONGOOSE_KEY}@tododatabase.mxi3zj5.mongodb.net/?retryWrites=true&w=majority`

const mongooseConnect = (async () => {
  const res = mongoose.connect(uri, { useNewUrlParser: true })
  res
    .then(() => console.log("DB Connected! 🥳"))
    .catch((err) => console.error(err))
})()

const {
  getTodos,
  createTodo,
  getUncompleted,
  deleteTodos,
  deleteSingleTodo,
  findTodoByID,
  editTodoStatus,
  editTodo,
} = require("./functions/ServerTodoFunctions")

const {
  getCategoriesByID,
  getTodosByCategory,
  createCategory,
  deleteCategory,
  UpdateCategory,
} = require("./functions/ServerCategoryFunctions")

const express = require("express")
const bodyparser = require("body-parser")
const app = express()
const port = 3000

app.use(express.static("client"))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

//! TODO ENPOINTS
//? Get Todos
app.get("/todos", async (req, res) => res.send(await getTodos()))
app.get("/resetTodo", async (req, res) => res.send(await deleteTodos()))
app.get("/completeTodos", async (req, res) => res.send(await getUncompleted()))
app.get("/todo/:todoID", async (req, res) =>
  res.send(await findTodoByID(req.params.todoID))
)

//? Add Todo
app.post("/todos", async (req, res) => res.send(await createTodo(req.body)))

//? Update Todo
app.put("/todoStatus", async (req, res) =>
  res.send(await editTodoStatus(req.body.todoID))
)
app.put("/todos", async (req, res) =>
  res.send(await editTodo(req.body.todoID, req.body.input))
)

//? Delete Todo
app.delete("/todos", async (req, res) =>
  res.send(await deleteSingleTodo(req.body.todoID))
)

//! Categories
// TODO: UPDATE TO RELATIONAL DATATABLES
//? Get Categories
app.get("/todoByCategory/:Category", async (req, res) =>
  res.send(await getTodosByCategory(req.params.Category))
)
app.get("/Categories/:todoID", async (req, res) =>
  res.send(await getCategoriesByID(req.params.todoID))
)

//? Create Category
app.post("/Categories", async (req, res) =>
  res.send(await createCategory(req.body.todoID, req.body.category))
)

//? Update Category
//* Not in use for this app but is functioning.
app.put("/Categories", async (req, res) =>
  res.send(
    await UpdateCategory(
      req.body.todoID,
      req.body.categoryIndex,
      req.body.category
    )
  )
)

//? Delete Category
app.delete("/Categories", async (req, res) =>
  res.send(await deleteCategory(req.body.todoID, req.body.categoryID))
)

//! Listening Port
app.listen(port, () => {
  console.log(`App Running On: http://localhost:${port}`)
})

// module.exports = app
