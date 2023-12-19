const express = require('express')
const mongoose = require('mongoose')
const {getAllUsers, createUser, loginUser} = require('../controller/usersController')
const { Users } = require('../Models/users')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

// dotenv 

require('dotenv/config')

//To get all users
router
.get('/', getAllUsers)

// TO create new user 
router
.post('/signUp', createUser)

// To login user
router
.post('/logIn',loginUser)

//To get only specific user by id
router.get('/:id', async (req, res) => {
    const user = await Users.findById(req.params.id)
    if (user) {
        res.status(200).json({ success: true, Users: user })
    } else {
        res.status(400).json({ success: false, Message: 'No user found' })
    }
})


module.exports = router