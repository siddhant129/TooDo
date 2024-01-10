const mongoose = require('mongoose')
const {Works} = require('./Work')

const userSchema = new mongoose.Schema(
  {
    userName : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    passwordHash :{
        type : String,
        required : true,
        select : false
    },
    image : {
        type : String
    },
    works :[{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Works'
    }]
  }

)

userSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

userSchema.set('toJSON',{
    virtuals : true
})

exports.Users = mongoose.model('Users',userSchema)

