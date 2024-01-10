const {Tasks} = require('../Models/Tasks')
const {Works} = require('../Models/Work')
const asyncHandler = require('../middlewares/asyncHandler')

exports.createTask = asyncHandler( async (req, res, next)=>{
    const task = new Tasks(
        {
            name : req.body.name , 
            description : req.body.description
        }
    )
    const newTask = await Tasks.create(task)
    if (newTask) {
        const updatesWork = await Works.findByIdAndUpdate(req.body.workId, 
            {
                $push : { tasks : newTask.id }
            }
            ).populate({
                path : 'tasks'
            })
            if (updatesWork) {
                return res.status(201).json({success: true, message : 'Task created successfully', user : updatesWork})
            }
    }
    return next(new errorResponse( "Work not created", 404))
}
)