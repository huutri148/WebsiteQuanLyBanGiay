const express = require("express");
const router = express.Router();
const {
  getList,
  getTodoByID,
  registerTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/Todo.controller");

router.route("/").get(getList).post(registerTodo);
router.route("/:id").get(getTodoByID).delete(deleteTodo).patch(updateTodo);
module.exports = router;
