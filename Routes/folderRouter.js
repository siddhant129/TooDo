const { folders } = require('../Models/folder')
const { createFolder, deleteFolder, getFolders } = require('../controller/folderController')
const express = require('express')
const router = express.Router()

router
    //To get all folders
    .get('/', getFolders)

    //To create new folder
    .post('/createFolder', createFolder)

    //To delete folder
    .delete('/deleteFolder', deleteFolder)

module.exports = router