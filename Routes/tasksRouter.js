const express = require('express')
const { createTask ,deleteTask } = require('../controller/tasksController')
const router = express.Router()

router
//route to create task
.post('/createTask',createTask)

// route to delete task
.get('/deleteTask',deleteTask)

module.exports = router