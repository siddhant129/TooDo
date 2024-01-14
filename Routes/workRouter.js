const { Works } = require('../Models/Work')
const { createWork, deleteWork, getWorks } = require('../controller/workController')
const express = require('express')
const router = express.Router()

router
    //To get all works
    .get('/', getWorks)

    //To create new work
    .post('/createWork', createWork)

    //To delete work
    .get('/deleteWork', deleteWork)

module.exports = router