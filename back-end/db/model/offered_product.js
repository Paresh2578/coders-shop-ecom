const  mongoose = require('mongoose')

const offered_product_scheam = new mongoose.Schema({
    smallImg :{
        type:String,
    },
    bigImg :{
        type:String,
    },
    type :{
        type:String,
    },
    name :{
        type:String,
    },
    description:{
        type:String
    },
    price:Number,
    disWithPrice:Number
})

module.exports = mongoose.model('offered_product' , offered_product_scheam);