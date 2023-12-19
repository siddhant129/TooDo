const mongoose = require('mongoose')
const {Tasks} = require('./Tasks.js')

const workSchema = new mongoose.Schema({
    workName :{
        type : String,
        required : true
    },
    tasks : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Tasks'
    }
})

exports.Works = mongoose.model('Works', workSchema)