const  mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    smallImg:{
       type: String,
    },
    bigImg:{
        type: String,
     },
    type :{
        type: String,
     },
     name: {
        type: String,
     },
     price:{
        type:Number
     },
      disWithPrice :{
        type:Number
      },
      description:{
         type : String,
      },
      content:{
         type:String
      },
      id :{
         type : String
      }
})

module.exports = mongoose.model('products' , productSchema);