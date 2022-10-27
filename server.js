const express = require("express")
const bodyparser = require("body-parser")
const app = express()
const port = 3000

app.use(express.static("client"))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

let myTodos = [
  {
    id: 0,
    title: "Todo Example #1",
    status: true,
    category: ["General", "Latest"],
    due: "2022-10-2",
  },
  {
    id: 1,
    title: "Todo Example #2",
    status: false,
    category: ["Example"],
    due: "2022-10-3",
  },
]

// TODO ENPOINTS
//? Get Todos
app.get("/todos", (req, res) => {
  res.send(myTodos)
})

app.get("/resetTodo", (req, res) => {
  myTodos = [
    {
      id: 0,
      title: "Todo Example #1",
      status: true,
      category: ["General", "Latest"],
      due: "2022-10-2",
    },
    {
      id: 1,
      title: "Todo Example #2",
      status: false,
      category: ["Example"],
      due: "2022-10-3",
    },
  ]
  res.send(myTodos)
})

app.get("/completeTodos", (req, res) => {
  myTodos = myTodos.filter((todo) => !todo.status)
  res.send(myTodos)
})

app.get("/todo/:todoID", (req, res) => {
  const id = req.params.todoID
  const todo = myTodos.find((todo) => todo.id === id * 1)
  res.send(todo)
})

//? Add Todo
app.post("/todos", (req, res) => {
  myTodos.push(req.body)
  res.send(myTodos)
})

//? Update Todo
app.put("/todoStatus", (req, res) => {
  const id = req.body.todoID
  const todo = myTodos.find((todo) => todo.id === id)
  todo.status = !todo.status
  res.send(todo)
})

app.put("/todos", (req, res) => {
  const todoID = req.body.todoID
  const input = req.body.input

  const todo = myTodos.find((todo) => todo.id === todoID)

  if (input.title !== "" || input.due !== "") {
    todo.due = input.due
    todo.title = input.title
    res.send(todo)
    return
  }

  res.send(todo)
})

app.delete("/todos", (req, res) => {
  const index = req.body.todoID
  if (myTodos.length === 1) {
    myTodos.length = 0
  } else myTodos.splice(index, 1)

  res.send(myTodos)
})

// Categories
app.get("/todoByCategory/:Category", (req, res) => {
  const category = req.params.Category
  const filteredCategories = myTodos.filter((todo) =>
    todo.category.includes(category)
  )

  res.send(filteredCategories)
})

app.get("/Categories/:todoID", (req, res) => {
  const id = req.params.todoID * 1
  const todo = myTodos.find((todo) => todo.id === id)
  res.send(todo.category)
})

app.post("/Categories", (req, res) => {
  const id = req.body.todoID
  const categories = req.body.category
  const todo = myTodos.find((todo) => todo.id === id)
  todo.category.push(categories)
  res.send(todo.category)
})

app.put("/Categories", (req, res) => {
  const todoID = req.body.todoID
  const oldCategory = req.body.oldCategory
  const category = req.body.category

  const todo = myTodos.find((todo) => todo.id === todoID)
  todo.category.forEach((cat, i) => {
    if (cat === oldCategory) {
      todo.category.splice(i, 1)
      todo.category.push(category)
    }
  })

  res.send(todo)
})

app.delete("/Categories", (req, res) => {
  const todoID = req.body.todoID
  const categoryIndex = req.body.categoryID

  const todo = myTodos.find((todo) => todo.id === todoID)
  todo.category.forEach((cat, i) => {
    if (i === categoryIndex) {
      todo.category.splice(i, 1)
    }
  })
  res.send(todo.category)
})

// ! Listening Port
app.listen(port, () => {
  console.log(`App Running On: http://localhost:${port}`)
})
