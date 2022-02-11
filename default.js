const Schema = require(__dirname + "/schema.js");
const mongoose = require("mongoose");

const ToDoItem = mongoose.model("Item", Schema.todoitem);

const todo1 = new ToDoItem({
  name: "Welcome to our todolist!"
})

const todo2 = new ToDoItem({
  name: "Hit the + button to add a new item."
})

const todo3 = new ToDoItem({
  name: "<--- Hit this to delete the item."
})

module.exports.items = [todo1, todo2, todo3]
