const  mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        lowercase:true
    },
    email:{
        type:String,
        lowercase:true,
    },
    number:{
        type:String,
    },
    password:{
        type:String
    },
    cart : [
        {
          id: { type: String, required: true },
          quantity: { type: Number, required: true },
          name: { type: String, required: true },
          type: { type: String, required: true },
          smallImg: { type: String, required: true },
          price: { type: String, required: true },
          disWithPrice: { type: String, required: true },
        }
    ], 

})


module.exports = mongoose.model('users' , userSchema);