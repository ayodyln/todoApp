const { model, Schema } = require("mongoose")

const TodoModel = new Schema({
  title: String,
  status: Boolean,
  category: [],
  due: String,
})

module.exports = model("todo", TodoModel)
