const mongoose = require('mongoose')
const {Users} = require('./users')

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
    },
    userId :{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Users'
    }
})

taskSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

taskSchema.set('toJSON',{
    virtuals : true
})

exports.Tasks = mongoose.model('Tasks', taskSchema)