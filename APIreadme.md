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
- MongoDB/Mongoose
- Bulma (CSS)

<br/>

## **API Endpoints**

---

### [Todos](#get-todos---todos) | [Categories](#get-categories---categoriestodoid)

<br/>

### **GET Todos** - /todos

Fetch all current Todo's in the Database

```javascript
export const getTodos = async () => {
  try {
    const res = await fetch("/todos")
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}
```

<br/>

### **GET Todo** - /todo/:todoID

Fetch single Todo by ID in the database.

```javascript
// todoID: String
export const getTodo = async (todoID) => {
  try {
    const res = await fetch(`/todo/${todoID}`)
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}
```

<br/>

### **GET CompleteTodos** - /completeTodos

Fetch and update the database based on what is completed. Response is a new array of remaining _uncompleted_ todo's.

```javascript
try {
  const res = await fetch("/completeTodos")
  const data = await res.json()

  // DOM update function.
  addToDOM(data)
} catch (error) {
  console.error(error)
}
```

<br/>

### **GET Reset Todos** - /resetTodo

Fetch and update the database to the original state.

```javascript
try {
  const res = await fetch("/resetTodo")

  // DOM update function.
  addToDOM(await res.json())
} catch (error) {
  console.error(error)
}
```

<br/>

### **POST Create Todo** - /todos

Create a todo and append to the database, with a response of the new todo array.

```javascript
// newTodo is a Object containing a Title and a Due Date for a todo.
export const newTodo = async (newTodo) => {
  try {
    const res = await fetch("/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}
```

<br/>

### **PUT Update Todo** - /todos

Update Todo Title and Due Date by a todoID.

```javascript
export const updateTodo = async (todoID, input) => {
  try {
    const res = await fetch("/todos", {
      method: "PUT",
      body: JSON.stringify({ todoID, input }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}
```

<br/>

### **PUT Update Todo Status** - /todoStatus

Update a given Todo's status (completed or uncompleted).

```javascript
export const updateTodoStatus = async (todoID) => {
  try {
    const res = await fetch(`/todoStatus`, {
      method: "PUT",
      body: JSON.stringify({ todoID }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}
```

<br/>

### **DELETE Todo** - /todos

Delete a todo by ID.

```javascript
export const delTodo = async (todoID) => {
  try {
    const res = await fetch(`/todos`, {
      method: "DELETE",
      body: JSON.stringify({ todoID }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    return await res.json()
  } catch (error) {
    console.error(error)
  }
}
```

<br>

### **GET Categories** - /Categories/:todoID

Get a given Todo's categories array.

```javascript
export const getCategories = async (id) => {
  try {
    const res = await fetch(`/Categories/${id}`)
    const datum = await res.json()
    return datum
  } catch (error) {
    console.error(error)
  }
}
```

<br/>

### **Get Todo by Category** - /todoByCategory/:Category

Get an array of todos filtered by a category.

```javascript
export const getTodoByCategory = async (category) => {
  try {
    const res = await fetch(`/todoByCategory/${category}`)
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}
```

<br/>

### **POST Categories** - /Categories

Create a new category for a todo.

```javascript
export const createCategory = async (todoID, category) => {
  try {
    const res = await fetch("/Categories", {
      method: "POST",
      body: JSON.stringify({ todoID, category }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}
```

<br/>

### **PUT Categories** - /Categores

Update a Todo's category list.

```javascript
export const updateCategory = async (todoID, oldCategory, category) => {
  try {
    const res = await fetch("/Categories", {
      method: "PUT",
      body: JSON.stringify({ todoID, oldCategory, category }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}
```

<br/>

### **DELETE Categories** - /Categories

Delete Todo category(s).

```javascript
export const deleteCategory = async (categoryID, todoID) => {
  try {
    const res = await fetch("/Categories", {
      method: "DELETE",
      body: JSON.stringify({ categoryID, todoID }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}
```

<br/>

---

#### Class Assignment DGM 3760 | Utah Valley University
