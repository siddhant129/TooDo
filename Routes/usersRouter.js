const express = require('express')
const mongoose = require('mongoose')
const {getAllUsers, createUser, loginUser, getUser} = require('../controller/usersController')
const { Users } = require('../Models/users')
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
.get('/:id', getUser)


module.exports = router