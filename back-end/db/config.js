const mongoose = require('mongoose');

try{
    
    // mongoose.connect('mongodb://127.0.0.1:27017/coder-shop');
    mongoose.connect('mongodb+srv://cparesh476:paresh@codershop.bhd6pna.mongodb.net/coderShop?retryWrites=true&w=majority');
    console.log("serever connecting")
}catch(error){
   
}

