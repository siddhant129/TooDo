const mongoose = require('mongoose')
const { Users } = require('../Models/users')

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

const workSchema = new mongoose.Schema({
    workName: {
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

workSchema.index({ workName: 1, userId: 1 }, { unique: true })

workSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

workSchema.set('toJSON',{
    virtuals :true
})

exports.Works = mongoose.model('Works', workSchema)