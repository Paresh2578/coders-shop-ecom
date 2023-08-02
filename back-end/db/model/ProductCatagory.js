const  mongoose = require('mongoose')

const ProductCatagory_Schema = new mongoose.Schema({
    url : String,
    type :{ type:  String }
})

module.exports = mongoose.model('product_catagorys' , ProductCatagory_Schema);