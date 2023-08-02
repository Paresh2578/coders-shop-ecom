const  mongoose = require('mongoose')

const Carousel_Product_Schema = new mongoose.Schema({
    bigImg:String,
    smallImg:String
})

module.exports = mongoose.model('Carousel_products' , Carousel_Product_Schema);