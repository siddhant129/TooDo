const mongoose = require('mongoose');
const express = require('express');
const { Users } = require('../Models/users')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorResponse = require('../utils/errorResponse')

const router = express.Router();

// @Get request to get all users
// @Public method
exports.getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await Users.find()
        if (allUsers) {
            res.status(200).json({ success: true, Users: allUsers })
        } else {
            return next('No users found', 400)
        }
    } catch (err) {
        return next(new errorResponse('No users found', 400))
    }

}

// @Post request to create new user
// @Public Method

exports.createUser = async (req, res, next) => {
    try {
        const newUser = new Users({
            userName: req.body.userName,
            email: req.body.email,
            passwordHash: bcryptjs.hashSync(req.body.password, 10),
            image: req.body.image
        })
        const userData = await Users.findOne().where({ $or: [{ userName: newUser.userName }, { userName: newUser.userName }] }).select('userName')

        if (userData != null) {
            return next(new errorResponse('Username or email already exists', 400))
        }
        else {
            const createdUser = await Users.create(newUser)
            console.log(createdUser);
            if (createdUser) {
                res.status(200).json({ success: true, Users: createdUser.userName })
            } else {
                return next(new errorResponse('User not created', 400))
            }
        }
    } catch (err) {
        return next(new errorResponse(err.message, 400))
    }
}

// @Post request to log in user and send token
// @Public method
exports.loginUser = async (req, res, next) => {
    const userLogData = new Users({
        userName: req.body.user,
        passwordHash: req.body.password
    })
    try {
        const userData = await Users.findOne().where({ $or: [{ userName: userLogData.userName }, { email: userLogData.userName }] })
        if (userData) {
            bcryptjs.compare(userLogData.passwordHash, userData.passwordHash, (err, data) => {
                if (err) {
                    return next(new errorResponse('Invalid password', 400))
                } else if (data) {
                    const secret = process.env.secret
                    const token = jwt.sign(
                        {
                            userName: userData.userName,
                            userId: userData.id
                        },
                        secret
                    )
                    res.status(200).json({ success: true, token: token })
                }
                else if (!data) {
                    return res.status(400).json({ success: false, Message: 'Invalid Password' })
                }
            })
        } else {
            return next(new errorResponse( `${req.body.user} user not found`, 404))
        }
    } catch (err) {
        return next(new errorResponse(err.message, 400))
    }
}