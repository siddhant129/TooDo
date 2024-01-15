const mongoose = require('mongoose')
const { Users } = require('./users')

const taskSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    }
})

const folderSchema = new mongoose.Schema({
    folderName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users'
    },
    userName: {
        type: String
    },
    tasks:[
    {
        type : taskSchema
    }
    ]
})

folderSchema.index({ folderName: 1, userId: 1 }, { unique: true })

folderSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

folderSchema.set('toJSON',{
    virtuals :true
})

exports.folders = mongoose.model('folders', folderSchema)