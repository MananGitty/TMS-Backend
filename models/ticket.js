const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  todos: [todoSchema],
});

ticketSchema.virtual("completion").get(function () {
  const completedTodos = this.todos.filter((todo) => todo.completed);
  return completedTodos.length / this.todos.length;
});

module.exports = mongoose.model("Ticket", ticketSchema);
