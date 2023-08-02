import React, { useState , useEffect } from 'react'



//mui
import { Box, Typography , styled } from "@mui/material";

const Main_Box = styled(Box)(({theme})=>({
    background :' #ffff',
     margin:'10px 5px 0px 10px',
     "@media (max-width:895px)":{
        margin:'10px 2px 10px 2px   '
     }
}))
 


const Price_details_header = styled(Box)`
   border-bottom: 2px solid #f0f0f0;
   & > p{
   font-weight:550;
   font-size : 20px;
   padding:10px;
   color : GrayText;
   }
`
const Price_ditel = styled(Box)`
  padding : 10px 20px 10px 10px ;
  & > p{
    padding : 7px;
    font-size: 16px
  }
`

const Total_Amount = styled(Typography)`
  border-top : 2px solid #f0f0f0;
        padding :5px 20px 10px 10px;
        font-size: 20px
`
const Save_Amount = styled(Typography)`
    padding : 2px 10px 10px 13px;
    font-size : 13px;
    color : green;
    font-weight:550;
`
const Price = styled(Box)`
   float : right;
`


const Price_details = ({cartItem , mood})=>{
  
    const [total_price , SetTotal_price] = useState(0);
    const [total_dis , setTotal_dis] = useState(0);
    const [total_amount ,  setTotal_amount] = useState(0);

     useEffect(()=>{
       try{
        count_all_price();
       }catch(error){
        console.log(error.message);
       }
    }, [cartItem])

    const count_all_price = ()=>{
        let price = 0 , total =0, dis = 0;
        {
            cartItem.map((item)=>(
                price +=  (item.price * item.quantity),
                total += (item.disWithPrice * item.quantity),
                dis += ((item.price-item.disWithPrice)*item.quantity)
            ))
        }
        SetTotal_price(price);
        setTotal_dis(dis);
        setTotal_amount(total);
    }


    return (
        <Main_Box style = {{background :mood === 'ligth' ? '#fff' : '#1C2833', color : mood === 'ligth' ? 'black' : '#E5E8E8'}}>
          <Price_details_header>
            <Typography >PRICE DETAILS</Typography>
          </Price_details_header>
          <Price_ditel>
            <Typography>price ({cartItem.length} item)
                <Price component = "span">₹{total_price}</Price>
            </Typography>
            <Typography>Discount
                 <Price component = "span" style={{color : 'green'}}>-₹{total_dis}</Price>
            </Typography>
            <Typography>Delivery Charges
                  <Price component = "span" style={{color : 'green'}}>FREE</Price>
            </Typography>
          </Price_ditel>
          <Box >
            <Total_Amount>Total Amount
                      <Price component = "span">₹{total_amount}</Price>
            </Total_Amount>          
            <Save_Amount>You will save  ₹{total_dis} on this order</Save_Amount>
          </Box>
        </Main_Box>
    )
}


export default Price_details;