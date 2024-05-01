const express = require("express");
const {
  createTask,
  deleteTask,
  updateTask,
} = require("../controller/tasksController");
const router = express.Router();

router
  //route to create task
  .post("/createTask", createTask)

  // route to delete task
  .delete("/deleteTask", deleteTask)

  // Route to update task
  .put("/updateTask/:folderId", updateTask);

module.exports = router;
