const { Works } = require('../Models/Work')
const {createWork} = require('../controller/workController')
const express = require('express')
const router = express.Router()

router
    .get('/', async (req, res) => {
        const allWorks = await Works.find()
        res.status(200).json({ success: true, message: 'Work by users', allWorks : allWorks })
    }
    )
    .post('/createWork', createWork)

module.exports = router