const { Works } = require('../Models/Work');
const { Users } = require('../Models/users');
const asyncHandler = require('../middlewares/asyncHandler');
const errorResponse = require('../utils/errorResponse');

// @Get request to get all works by users
// @Private method (Token required)
exports.getWorks = asyncHandler(async (req, res, next) => {
    const allWorks = await Works.find({ userId: req.userId })
    res.status(200).json({ success: true, message: 'Work by users', allWorks: allWorks })
})

// @Post request to create work
// @Private method (Token required)
exports.createWork = asyncHandler(async (req, res, next) => {
    req.body.userId = req.userId
    req.body.userName = req.userName
    const newWork = await Works.create(req.body)
    if (newWork) {
        const updatedUser =
            await Users.findByIdAndUpdate(req.userId,
                {
                    $push: { works: newWork.id }
                },
                {
                    new: true
                }
            ).populate('works')
        if (updatedUser) {
            return res.status(201).json({ success: true, message: 'Work created successfully', works: updatedUser.works, user: updatedUser })
        }

    }
    return next(new errorResponse("Work not created", 404))
})

// @Get request to delete work
// @Private method (Token required)
exports.deleteWork = asyncHandler(
    async (req, res, next) => {
        const deletedWork = await Works.findByIdAndDelete(req.query.workId,
            { new: true }
        )
        if (deletedWork) {
            const updatedUser = await Users.findByIdAndUpdate(req.userId,
                {
                    $pull: { works: { id: req.query.workId } }
                },
                {
                    new: true
                }
            ).populate('works')
            if (updatedUser) {
                return res.status(200).json({ success: true, message: 'Work deleted successfully', works: updatedUser.works, user: updatedUser })
            }
            return next(new errorResponse("Work not deleted", 400))
        }
        return next(new errorResponse("Work not deleted", 400))
    }
)