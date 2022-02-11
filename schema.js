const mongoose = require("mongoose");

const todoItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [todoItemSchema]
})

module.exports.todoitem = todoItemSchema
module.exports.list = listSchema
