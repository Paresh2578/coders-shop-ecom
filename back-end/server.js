const express = require('express');
const mongoose = require ('mongoose');
const cors  = require ('cors');
require('./db/config')
const dotenv = require ('dotenv');
const User  = require ('./db/model/user');
const ProductCatagory = require ('./db/model/ProductCatagory');
const Carousel_Product = require('./db/model/Carousel_Product');
const Product = require ('./db/model/product');


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 4500;


app.get('/getUser' , async(req, resp)=>{
        const result = await User.find();
        resp.send(result);
        console.log(result);
})

app.post('/register' , async(req , resp)=>{
         const data = new User(req.body);
        const result = await data.save();
        console.log(result);
        resp.send(result);
})

app.get('/login/:email/:password' , async(req , resp)=>{
        const result = await User.find({email:req.params.email , password :req.params.password});
        resp.send(result);
})

app.get('/userFind/:email', async(req , resp)=>{
  const result = await User.find({email: req.params.email});
  resp.send(result);
})

app.put('/forgerPassword/:emailId' , async(req , resp)=>{
        let result = await User.updateOne(
                {email : req.params.emailId},
                {$set : req.body}
        )

        resp.send(result);
})




app.get('/get-carousel_product' , async(req , resp)=>{
        const result = await Carousel_Product.find();
        resp.send(result);
})



app.get('/getProduct' , async(req , resp)=>{
        const result = await Product.find();
        resp.send(result);
})

app.get('/price_sort_ascending' , async(req, resp)=>{
  const result = await Product.find().sort({disWithPrice : 1})
  resp.send(result);
})

app.get('/price_sort_dscending' , async(req, resp)=>{
  const result = await Product.find().sort({disWithPrice : -1})
  resp.send(result);
})



app.get('/Bye_offered_procuct/:id' , async(req , resp)=>{
        const result = await Product.findOne({id : req.params.id});
        resp.send(result);
})

app.get('/catagory_product/:type' , async(req , resp)=>{
        const result = await Product.find({type : req.params.type});
        resp.send(result);
})


app.get('/user/:userId' , async(req, resp)=>{
  let result = await User.findOne({_id : req.params.userId})
  resp.send(result);
})


app.get('/getOne_product/:id' , async (req , resp)=>{
        let result = await Product.findOne({id : req.params.id});
        resp.send(result);
})

app.put('/cart/:useId' , async(req , resp)=>{
  const result = await User.updateOne(
    {_id : req.params.useId},
    {$set : req.body}
  )
  resp.send(result);
})






app.listen(PORT);








// export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
// export let paytmParams = {};
// paytmParams['MID'] = process.env.PAYTM_MID,
// paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
// paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
// paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
// paytmParams['ORDER_ID'] = uuid(),
// paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
// paytmParams['TXN_AMOUNT'] = '100',
// paytmParams['CALLBACK_URL'] = 'http://localhost:4500/callback'
// paytmParams['EMAIL'] = 'kunaltyagi@gmail.com'
// paytmParams['MOBILE_NO'] = '1234567852'