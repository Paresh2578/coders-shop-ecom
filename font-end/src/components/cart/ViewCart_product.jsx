import React, {useContext} from 'react';
import { useCartContext } from "../../redux/context/cart_context";

//mui
import {Box, Button, Typography} from '@mui/material'
import styled from '@emotion/styled';

//conponets
import Button_Group from './Button_Group';
// import cart_contex from '../../redux/context/cart_context '

const MainBox = styled(Box)`
   display : flex;
   background:#ffff;
   padding:10px;
   border-top : 2px solid #f0f0f0;
`

 const Product_name = styled(Box)`
 font-size:20px;
 font-weight:500;
 margin-bottom:10px
`
const Product_price = styled(Box)`
display : flex;
margin-top:12px
`

const ViewCart_product = ({product , mood})=>{
    const {removeItem} = useCartContext();

    const remover_cart_item = ()=>{
        removeItem(product.id);
        // window.location.reload(false);
    }

    return(
        <>
        <MainBox  style = {{background :mood === 'ligth' ? '#fff' : '#1C2833', color : mood === 'ligth' ? 'black' : '#E5E8E8'}}>
            <Box>
                <Box >
                    <img src={product.smallImg} height={110} width={110} alt="img"></img>
                </Box>
                <Box>
                    <Button_Group product={product}/>
                </Box>
            </Box>
            <Box style={{marginLeft:'10px'}}>
                <Product_name style={{}}>{product.name}</Product_name>
                <Box>{product.type}</Box>
                <Product_price>
                    <Typography style={{marginRight:'10px', fontSize:'20px' }}> ₹  {product.disWithPrice}</Typography>
                    <Typography style={{fontSize:'15px' ,textAlign:'baseline' , paddingTop:'7px' , color:'GrayText' , textDecoration: 'line-through'}}> ₹  {product.price}</Typography>
                    <Typography style={{fontSize:'15px' ,textAlign:'baseline' , paddingTop:'7px' , color:'#FE46A5' ,paddingLeft:'10px'}}>{Math.floor(((product.price-product.disWithPrice)*100)/product.price)} % off</Typography>
                </Product_price>
                <Button size="small" onClick={remover_cart_item}>Remove</Button>
            </Box>
        </MainBox>
        </>
    )
}


export default ViewCart_product;