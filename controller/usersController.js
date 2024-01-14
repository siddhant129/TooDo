const mongoose = require('mongoose');
const express = require('express');
const { Users } = require('../Models/users')
const {Works} = require('../Models/Work')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();

// @Get request to get all users
// @Public method
exports.getAllUsers = asyncHandler( async (req, res, next) => {
        let allUsers = await Users.find().populate({
            path : 'works',
            populate :{
                path : 'tasks'
            }
        })
        
        if (allUsers) {
            res.status(200).json({ success: true, Users: allUsers })
        } else {
            return next('No users found', 400)
        }
})
// @Get request to get user by id
// @Public method
exports.getUser = asyncHandler( async (req, res) => {
    const user = await Users.findById(req.params.id).populate('works')
    if (user) {
        res.status(200).json({ success: true, Users: user })
    } else {
        next(new errorResponse('User not found', 400))
    }
}
)

// @Post request to create new user
// @Public Method

exports.createUser = asyncHandler(async (req, res, next) => {
        const newUser = new Users({
            userName: req.body.userName,
            email: req.body.email,
            passwordHash: bcryptjs.hashSync(req.body.password, 10),
            image: req.body.image
        })
            const createdUser = await Users.create(newUser)
            if (createdUser) {
               return res.status(201).json({ success: true, Users: createdUser.userName, message : 'User successfully created' })
            } else {
                return next(new errorResponse('User not created', 400))
            } 
})

// @Post request to log in user and send token
// @Public method
exports.loginUser = asyncHandler( async (req, res, next) => {
    const userLogData = new Users({
        userName: req.body.user,
        passwordHash: req.body.password
    })
        const userData = await Users.findOne().where({ $or: [{ userName: userLogData.userName }, { email: userLogData.userName }] })
        .select('userName passwordHash works')
        .populate({
            path : 'works'
        })
        if (userData) {
            bcryptjs.compare(req.body.password, userData.passwordHash, (err, data) => {
                if (err) {
                    return next(new errorResponse(err.message, 400))
                } else if (data) {
                    const secret = process.env.secret
                    const token = jwt.sign(
                        {
                            userName: userData.userName,
                            userId: userData.id
                        },
                        secret
                    )
                    res.status(200).json({ success: true, token: token, userName : userData.userName, works : userData.works })
                }
                else if (!data) {
                    // return res.status(400).json({ success: false, message: 'Invalid Password' })
                    return next(new errorResponse('Invalid password', 400))
                }
            })
        } else {
            return next(new errorResponse( `${req.body.user} user not found`, 404))
        }  
})