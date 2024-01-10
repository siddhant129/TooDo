const {Works} = require('../Models/Work');
const { Users } = require('../Models/users');
const asyncHandler = require('../middlewares/asyncHandler');
const errorResponse = require('../utils/errorResponse');

exports.createWork = asyncHandler( async (req,res, next)=>{
    req.body.userId = req.userId
    req.body.userName = req.userName
    const newWork = await Works.create(req.body)
    if (newWork) {
        const updatedUser = 
        await Users.findByIdAndUpdate(req.userId,  
            {
                $push:{works : newWork.id}
            }
            )
            if (updatedUser) {
                return res.status(201).json({success: true, message : 'Work created successfully', work : newWork, user : updatedUser})
            }

    }
    return next(new errorResponse( "Work not created", 404))
})

// exports.createTask = asyncHandler(
//     async(req,res,next)=>{

//     }
// )