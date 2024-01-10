const {Tasks} = require('../Models/Tasks')
const express = require('express')
const { createTask } = require('../controller/tasksController')
const router = express.Router()

router.get('/', async (req, res)=>{
    const allTasks = await Tasks.find()
    return res.status(200).json({success : true, tasks : allTasks})
})

router
.post('/createTask',createTask)

module.exports = router