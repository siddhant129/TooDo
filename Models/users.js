const mongoose = require('mongoose')

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
        required : true
    },
    image : {
        type : String
    }
  }

)

userSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

userSchema.set('toJSON',{
    virtuals : true
})

exports.Users = mongoose.model('Users',userSchema)

