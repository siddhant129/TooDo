const express = require('express')
const mongoose = require('mongoose')
const { Users } = require('../Models/users')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

// dotenv 

require('dotenv/config')

//To get all users
router.get('/', async (req, res) => {
    const allUsers = await Users.find()
    if (allUsers) {
        res.status(200).json({ success: true, Users: allUsers })
    } else {
        res.status(400).json({ success: false, Message: 'No users found' })
    }
})

//To get only specific user by id
router.get('/:id', async (req, res) => {
    const user = await Users.findById(req.params.id)
    if (user) {
        res.status(200).json({ success: true, Users: user })
    } else {
        res.status(400).json({ success: false, Message: 'No user found' })
    }
})

// User sign up route
router.post('/signUp', async (req, res) => {
    const newUser = new Users({
        userName: req.body.userName,
        email: req.body.email,
        passwordHash: bcryptjs.hashSync(req.body.password, 10),
        image: req.body.image
    })
    const userData = await Users.findOne().where({ userName: newUser.userName }).select('userName')
    const userDataByMail = await Users.findOne().where({ email: newUser.email }).select('email')

    if (userData != null) {
        res.status(200).json({ message: "Username already exists" })
    }
    else if (userDataByMail != null) {
        res.status(200).json({ message: "Email already exists" })
    }
    else {
        const createdUser = await Users.create(newUser)
        console.log(createdUser);
        if (createdUser) {
            res.status(200).json({ success: true, Users: createdUser.userName })
        } else {
            res.status(400).json({ success: false, Message: 'No user created' })
        }
    }
})

// User log in route
router.post('/logIn', async (req, res) => {
    const userLogData = new Users({
        userName: req.body.user,
        passwordHash: req.body.password
    })

    const userData = await Users.findOne().where({ $or: [{ userName: userLogData.userName }, { email: userLogData.userName }] })
    if (userData) {
        if (bcryptjs.compare(userLogData.passwordHash, userData.passwordHash)) {
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
    } else {
        res.status(400).json({ success: false, Message: 'No user found' })
    }
})

module.exports = router