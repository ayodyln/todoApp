# **To Do Application**

After cloning the project, run `npm install` and then `node server.js`.
<br/>

```console
npm install
node server.js
```

## **Techstack** -

- JavaScript
- NodeJS
- ExpressJS
- Bulma (CSS)

<br/>

## **API Endpoints**

---

### [Todos](#get-todos---todos) | [Categories](#get-categories---categoriestodoid)

### **GET Todos** - /todos

Fetch all current Todo's in the database.

```javascript
app.get("/todos", (req, res) => {
  res.send(myTodos)
})
```

<br/>

### **GET Todo** - /todo/:todoID

Fetch single Todo by ID in the database.

```javascript
app.get("/todo/:todoID", (req, res) => {
  const id = req.params.todoID
  const todo = myTodos.find((todo) => todo.id === id * 1)
  res.send(todo)
})
```

<br/>

### **GET CompleteTodos** - /completeTodos

Fetch and update the database based on what is completed. Response is a new array of _uncompleted_ todo's.

```javascript
app.get("/completeTodos", (req, res) => {
  myTodos = myTodos.filter((todo) => !todo.status)
  res.send(myTodos)
})
```

<br/>

### **GET Reset Todos** - /resetTodo

Fetch and update the database to the original state.

```javascript
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
```

<br/>

### **POST Create Todo** - /todos

Create a todo and append to the database, with a response of the new todo array.

```javascript
app.post("/todos", (req, res) => {
  myTodos.push(req.body)
  res.send(myTodos)
})
```

<br/>

### **PUT Update Todo** - /todos

Update Todo Title and Due Date by a todoID.

```javascript
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
```

<br/>

### **PUT Update Todo Status** - /todoStatus

Update a given Todo's status (completed or uncompleted).

```javascript
app.put("/todoStatus", (req, res) => {
  const id = req.body.todoID
  const todo = myTodos.find((todo) => todo.id === id)
  todo.status = !todo.status
  res.send(todo)
})
```

<br/>

### **DELETE Todo** - /todos

Delete a todo by ID.

```javascript
app.delete("/todos", (req, res) => {
  const index = req.body.todoID
  if (myTodos.length === 1) {
    myTodos.length = 0
  } else myTodos.splice(index, 1)

  res.send(myTodos)
})
```

<br>

### **GET Categories** - /Categories/:todoID

Get a given Todo's categories array.

```javascript
app.get("/Categories/:todoID", (req, res) => {
  const id = req.params.todoID * 1
  const todo = myTodos.find((todo) => todo.id === id)
  res.send(todo.category)
})
```

<br/>

### **Get Todo by Category** - /todoByCategory/:Category

Get an array of todos filtered by a category.

```javascript
app.get("/todoByCategory/:Category", (req, res) => {
  const category = req.params.Category
  const filteredCategories = myTodos.filter((todo) =>
    todo.category.includes(category)
  )

  res.send(filteredCategories)
})
```

<br/>

### **POST Categories** - /Categories

Create a new category for a todo.

```javascript
app.post("/Categories", (req, res) => {
  const id = req.body.todoID
  const categories = req.body.category
  const todo = myTodos.find((todo) => todo.id === id)
  todo.category.push(categories)
  res.send(todo.category)
})
```

<br/>

### **PUT Categories** - /Categores

Update a Todo's category list.

```javascript
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
```

<br/>

### **DELETE Categories** - /Categories

Delete Todo category(s).

```javascript
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
```

<br/>

---

#### Class Assignment DGM 3760 | Utah Valley University
