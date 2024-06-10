const { Tasks } = require("../Models/Tasks");
const { folders } = require("../Models/folder");
const asyncHandler = require("../middlewares/asyncHandler");
const errorResponse = require("../utils/errorResponse");

// @Post request to create task
// @Private method (Token required)
exports.createTask = asyncHandler(async (req, res, next) => {
  const task = new Tasks({
    name: req.body.name,
    description: req.body.description,
  });
  const updatedfolder = await folders.findByIdAndUpdate(
    req.body.folderId,
    {
      $push: { tasks: task },
    },
    {
      new: true,
    }
  );
  if (updatedfolder) {
    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      tasks: updatedfolder.tasks,
    });
  }
  return next(new errorResponse("Task not created", 404));
});

// @Post request to delete task
// @Private Method (Token reqired)
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const deletedTask = await folders.findByIdAndUpdate(
    req.query.folderId,
    {
      $pull: { tasks: { _id: req.query.taskId } },
    },
    { new: true }
  );

  if (deletedTask) {
    return res.status(200).json({ success: true, tasks: deletedTask.tasks });
  }
  return next(new errorResponse("Task not found", 404));
});

// @Put request to update task
// @Private Method (Token reqired)
exports.updateTask = asyncHandler(async (req, res, next) => {
  const updatedTask = await folders
    .findById(req.params.folderId)
    .then((folder) => {
      const tasks = JSON.stringify(folder.tasks);
      const allTasks = JSON.parse(tasks);
      folder.tasks = allTasks.map((task) => {
        if (task._id === req.body.id) {
          task.name = req.body.name;
          task.description = req.body.description;
          task.status = req.body.status ?? "Not started";
        }
        return task;
      });
      return folder.save({
        new: true,
      });
    });

  if (updatedTask) {
    return res.status(200).json({ success: true, tasks: updatedTask.tasks });
  }
  return next(new errorResponse("Task not found", 404));
});
