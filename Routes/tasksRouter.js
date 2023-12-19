const {Tasks} = require('../Models/Tasks')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res)=>{
    return res.status(200).json({success : true, message : 'Tasks by user'})
})

module.exports = router