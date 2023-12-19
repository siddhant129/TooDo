const {Works} = require('../Models/Work')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()



router.get('/',async(req,res)=>{
    const token = req.headers.authorization.substring(7)
    userName = jwt.decode(token)
    console.log(userName);
    res.status(200).json({success : true, message : 'Work by users'} )
})

module.exports = router