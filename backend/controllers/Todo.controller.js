const Todo = require("../models/Todo.model");

// @desc Fetch all todos
// @route Get/api/todos
// @access Public
const getList = async (req, res) => {
  await Todo.Get((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Color not found ");
    }
  });
};

// @desc Fetch todo by id
// @route Get/api/todos/id
// @access Public
const getTodoByID = async (req, res) => {
  const todoID = req.params.id;
  await Todo.GetByID(todoID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

// @desc    Register a todo
// @route   Post /api/todos
// @access  Public
const registerTodo = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const todo = {
    NoiDung: req.body.NoiDung,
  };

  await Todo.Create(todo, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};

// @desc    Update  branch
// @route   PATCH /api/todos/id
// @access  Public
const updateTodo = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const todo = {
    MaTODO: req.body.MaTODO,
    NoiDung: req.body.NoiDung,
    isDone: req.body.isDone,
  };

  await Todo.Edit(todo, (result) => {
    res.status(200).send({ message: "Updated successfully" });
  });
};

// @desc delete supplier by id
// @route DELETE/api/todos/id
// @access Public
const deleteTodo = async (req, res) => {
  const maTodo = req.params.id;
  await Todo.Delete(maTodo, (result) => {
    if (result) {
      res.status(200).send({ message: "Deleted successfully" });
    } else {
      res.status(404);
    }
  });
};
module.exports = {
  getList,
  getTodoByID,
  registerTodo,
  updateTodo,
  deleteTodo,
};
