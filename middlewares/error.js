const errorResponse = require('../utils/errorResponse')
const errorHandler = (error, req, res, next)=>{
    if (error.code === 11000) {
        let message = Object.values(error.keyValue) +' already exists'
        error = new errorResponse(message, 400)
    }

    //Mongoose Validation error
    if (error.name === 'ValidationError') {
        let message = Object.values(error.errors)
        error = new errorResponse(message,400)
    }
    
    if (!error.statusCode) {
        error.statusCode = error.status
    }

    res
    .status(error.statusCode || 500)
    .json({success: false, message: error.message||'Internal server error'})
}
module.exports = errorHandler