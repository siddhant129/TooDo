const { folders } = require('../Models/folder');
const { Users } = require('../Models/users');
const asyncHandler = require('../middlewares/asyncHandler');
const errorResponse = require('../utils/errorResponse');

// @Get request to get all folders by users
// @Private method (Token required)
exports.getFolders = asyncHandler(async (req, res, next) => {
    const allfolders = await folders.find({ userId: req.userId })
    res.status(200).json({ success: true, message: 'folder by users', allfolders: allfolders })
})

// @Post request to create folder
// @Private method (Token required)
exports.createFolder = asyncHandler(async (req, res, next) => {
    req.body.userId = req.userId
    req.body.userName = req.userName
    const newfolder = await folders.create(req.body)
    if (newfolder) {
        const updatedUser =
            await Users.findByIdAndUpdate(req.userId,
                {
                    $push: { folders: newfolder.id }
                },
                {
                    new: true
                }
            ).populate('folders')
        if (updatedUser) {
            return res.status(201).json({ success: true, message: 'folder created successfully', folders: updatedUser.folders, user: updatedUser })
        }

    }
    return next(new errorResponse("folder not created", 404))
})

// @Get request to delete folder
// @Private method (Token required)
exports.deleteFolder = asyncHandler(
    async (req, res, next) => {
        const deletedfolder = await folders.findByIdAndDelete(req.query.folderId,
            { new: true }
        )
        if (deletedfolder) {
            const updatedUser = await Users.findByIdAndUpdate(req.userId,
                {
                    $pull: { folders: { id: req.query.folderId } }
                },
                {
                    new: true
                }
            ).populate('folders')
            if (updatedUser) {
                return res.status(200).json({ success: true, message: 'folder deleted successfully', folders: updatedUser.folders, user: updatedUser })
            }
            return next(new errorResponse("folder not deleted", 400))
        }
        return next(new errorResponse("folder not deleted", 400))
    }
)