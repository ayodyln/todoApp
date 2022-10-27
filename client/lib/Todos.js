//! Fetch all Todos
export const getTodos = async () => {
  try {
    const res = await fetch("/todos")
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

//! Get Single Todo by ID
export const getTodo = async (todoID) => {
  try {
    const res = await fetch(`/todo/${todoID}`)
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

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

export const getTodoByCategory = async (category) => {
  try {
    const res = await fetch(`/todoByCategory/${category}`)
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

export const getCategories = async (id) => {
  try {
    const res = await fetch(`/Categories/${id}`)
    const datum = await res.json()
    return datum
  } catch (error) {
    console.error(error)
  }
}

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
