const { Tasks } = require('../Models/Tasks')
const { Works } = require('../Models/Work')
const asyncHandler = require('../middlewares/asyncHandler')
const errorResponse = require('../utils/errorResponse')

// @Post request to create task
// @Private method (Token required)
exports.createTask = asyncHandler(async (req, res, next) => {
    const task = new Tasks(
        {
            name: req.body.name,
            description: req.body.description
        }
    )
    const updatedWork = await Works.findByIdAndUpdate(req.body.workId,
        {
            $push: { tasks: task }
        },
        {
            new :true
        }
    )
    if (updatedWork) {
        return res.status(201).json({ success: true, message: 'Task created successfully', tasks: updatedWork.tasks })
    }
    return next(new errorResponse("Task not created", 404))
}
)

// @Post request to delete task
// @Private Method (Token reqired)
exports.deleteTask = asyncHandler(
    async (req, res, next) => {
        const deletedTask = await Works.findByIdAndUpdate(req.query.workId, {
            $pull: { tasks: { _id: req.query.taskId } }
        },
            { new: true })

        if (deletedTask) {
            return res.status(200).json({ success: true, tasks: deletedTask.tasks })
        }
        return next(new errorResponse('Task not found', 404))
    }
)